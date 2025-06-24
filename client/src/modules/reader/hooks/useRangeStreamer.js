/**
 * @file src/modules/reader/hooks/useRangeStreamer.js
 * @description
 * Hook that returns a function for fetching, rendering, and caching a range of PDF pages.
 *
 * Responsibilities:
 * 1. Fetch a PDF fragment via RTK Query (`fetchPageRange`)
 * 2. Render selected pages into ImageBitmaps using `pdfjsRenderToBitmaps`
 * 3. Store rendered bitmaps in BitmapCache and metadata in Redux
 * 4. Register the chunk in the streamSlice and manage a 3-chunk memory limit
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { useLazyFetchPageRangeQuery } from '@/store/api/pdfStreamApi'
import { useCallback, useRef } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'

import {
  setStreamStatus,
  setCurrentRange,
  addRenderedPage,
  addPreloadedRange,
  registerChunk,
  setLastLoadedAt,
  setError,
} from '@/store/slices/streamSlice'

import { BitmapCache } from '@reader/utils/bitmapCache'
import pdfjsRenderToBitmaps from '@reader/utils/pdfjsRenderToBitmaps'
import { v4 as uuid } from 'uuid'
import { selectFileUrl } from '@/store/selectors/readerSelectors'

//-----------------------------------------------------------------------------
// Hook: useRangeStreamer
//-----------------------------------------------------------------------------
/**
 * Returns a function that streams, renders, and registers a PDF page range.
 *
 * @returns {(range: [number, number]) => Promise<void>}
 */
export default function useRangeStreamer() {
  const dispatch  = useDispatch()
  const store     = useStore()
  const scale     = useSelector(s => s.stream.scale)
  const fileUrl   = useSelector(selectFileUrl)
  const filename  = fileUrl ? fileUrl.split('/').pop() : null

  const [fetch] = useLazyFetchPageRangeQuery()

  // Prevents duplicate concurrent requests
  const inFlightRef = useRef(new Set())

  return useCallback(
    async ([start, end]) => {
      if (!filename) { dispatch(setError('File URL missing')); return }

      const scaleKey   = scale.toFixed(2)
      const chunkKey   = `${scaleKey}-${start}`
      const preloaded  =
        store.getState().stream.preloadedRanges[scaleKey] ?? []

      if (preloaded.some(([s, e]) => s === start && e === end) ||
          inFlightRef.current.has(chunkKey)) return

      inFlightRef.current.add(chunkKey)

      try {
        dispatch(setStreamStatus('streaming'))
        // **REMOVED**: dispatch(setCurrentRange([start, end]))

        // 1) Fetch the page range
        const { data: blob } = await fetch({ filename, start, end })
        if (!(blob instanceof Blob)) throw new Error('Invalid blob received')

        // 2) Render to bitmaps
        const pages = await pdfjsRenderToBitmaps(blob, { scale, start, end })
        pages.forEach(({ pageNumber, bitmap }) => {
          const id = uuid()
          BitmapCache.put(id, bitmap)
          dispatch(addRenderedPage({ scale: scaleKey, pageNumber, bitmapId: id }))
        })

        // 3) Register in LRU
        dispatch(addPreloadedRange({ scale: scaleKey, range: [start, end] }))
        dispatch(registerChunk   ({ scale: scaleKey, range: [start, end] }))

        dispatch(setLastLoadedAt(Date.now()))
        dispatch(setStreamStatus('idle'))
      } catch (err) {
        console.error('[Streamer] error', err)
        dispatch(setError(err.message || 'stream error'))
        dispatch(setStreamStatus('error'))
      } finally {
        inFlightRef.current.delete(chunkKey)
      }
    },
    [filename, scale, dispatch, store, fetch]
  )
}
