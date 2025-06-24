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
  const dispatch = useDispatch()
  const store = useStore()
  const scale = useSelector(s => s.stream.scale)
  const fileUrl = useSelector(selectFileUrl)
  const filename = fileUrl ? fileUrl.split('/').pop() : null
  const [fetch] = useLazyFetchPageRangeQuery()

  /**
   * Streams and renders a page range.
   * - If the chunk is already present in preloadedRanges, does nothing.
   *
   * @param {[number, number]} range - Tuple with start and end page (inclusive)
   */
  return async ([start, end]) => {
    if (!filename) {
      dispatch(setError('File URL missing'))
      return
    }

    const scaleKey = scale.toFixed(2)
    const preloaded = store.getState().stream.preloadedRanges[scaleKey] ?? []

    // Skip if this chunk is already preloaded
    if (preloaded.some(([s, e]) => s === start && e === end)) return

    try {
      dispatch(setStreamStatus('streaming'))
      dispatch(setCurrentRange([start, end]))

      // Step 1: Fetch PDF fragment as Blob
      const { data: blob } = await fetch({ filename, start, end })
      if (!(blob instanceof Blob)) throw new Error('Invalid blob received')

      // Step 2: Render pages to bitmaps
      const pages = await pdfjsRenderToBitmaps(blob, { scale, start, end })

      pages.forEach(({ pageNumber, bitmap }) => {
        const id = uuid()
        BitmapCache.put(id, bitmap)
        dispatch(addRenderedPage({ scale: scaleKey, pageNumber, bitmapId: id }))
      })

      // Step 3: Register the chunk in Redux
      dispatch(addPreloadedRange({ scale: scaleKey, range: [start, end] }))
      dispatch(registerChunk({ scale: scaleKey, range: [start, end] }))

      dispatch(setLastLoadedAt(Date.now()))
      dispatch(setStreamStatus('idle'))
    } catch (err) {
      console.error('[Streamer] error', err)
      dispatch(setError(err.message || 'stream error'))
      dispatch(setStreamStatus('error'))
    }
  }
}
