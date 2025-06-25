//-----------------------------------------------------------------------------
// src/modules/reader/hooks/useRangeStreamer.js – optimized
//-----------------------------------------------------------------------------
/**
 * React hook that returns a stable `streamRange([start, end])` function.
 *
 * Responsibilities
 * 1. Download a partial PDF (pages start–end) via RTK Query
 * 2. Render each page into an ImageBitmap (pdf.js helper)
 * 3. Store bitmaps in the in-memory LRU `BitmapCache`
 * 4. Register the pre-loaded chunk in `streamSlice` (max 3 chunks kept)
 * 5. Skip duplicate downloads (already cached or in-flight)
 * 6. Mark failed ranges and avoid retrying them
 * 7. Throttle stream bursts (e.g. rapid scrolling)
 */

import { useCallback, useRef } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { useLazyFetchPageRangeQuery } from '@/store/api/pdfStreamApi'
import {
  setStreamStatus,
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
import { selectRangesForBook } from '@/store/selectors/singleBookSelectors'
import throttle from 'lodash.throttle'

export default function useRangeStreamer() {
  const dispatch = useDispatch()
  const store = useStore()
  const scale = useSelector(s => s.stream.scale)
  const fileUrl = useSelector(selectFileUrl)
    const bookId = useSelector(s => s.reader.bookId)
  const filename = fileUrl ? fileUrl.split('/').pop() : null

    const [fetchRange] = useLazyFetchPageRangeQuery()

  const inFlightRef = useRef(new Set())
  const failedRef = useRef(new Set())

  const streamRange = useCallback(
    throttle(async ([start, end]) => {
      if (!filename) {
        dispatch(setError('File URL missing'))
        return
      }

      const scaleKey = scale.toFixed(2)
      const chunkKey = `${scaleKey}-${start}`
      const preloaded = store.getState().stream.preloadedRanges[scaleKey] ?? []

      if (
        preloaded.some(([s, e]) => s === start && e === end) ||
        inFlightRef.current.has(chunkKey) ||
        failedRef.current.has(chunkKey)
      ) {
        return
      }

      inFlightRef.current.add(chunkKey)

      try {
        dispatch(setStreamStatus('streaming'))

               const state = store.getState()
        const ranges = selectRangesForBook(bookId)(state)
        console.log('[DEBUG] Looking for range in:', ranges, 'Target:', start, end)

        const range = ranges.find(r => r.start <= start && r.end >= end)

        let blob
        if (range?.fileId) {
          console.log('[FRONTEND] Using pre-generated range:', range.fileId)
          const res = await fetch(`${import.meta.env.VITE_API_URL}/books/storage/${range.fileId}`)
          blob = await res.blob()
        } else {
          console.log('[FRONTEND] Falling back to dynamic stream:', { filename, start, end })
          const response = await fetchRange({ filename, start, end })
          blob = response.data
        }

        if (!(blob instanceof Blob)) throw new Error('Invalid Blob received')

        const chunkSize = end - start + 1
        const pages = await pdfjsRenderToBitmaps(blob, {
          scale,
          start: 1,
          end: chunkSize,
        })

        pages.forEach(({ pageNumber, bitmap }) => {
          const globalPage = start + pageNumber - 1
          const id = uuid()
          BitmapCache.put(id, bitmap)
          dispatch(
            addRenderedPage({
              scale: scaleKey,
              pageNumber: globalPage,
              bitmapId: id,
            }),
          )
        })

        dispatch(addPreloadedRange({ scale: scaleKey, range: [start, end] }))
        dispatch(registerChunk({ scale: scaleKey, range: [start, end] }))
        dispatch(setLastLoadedAt(Date.now()))
        dispatch(setStreamStatus('idle'))
      } catch (err) {
        console.error('[Streamer] error:', err)
        failedRef.current.add(chunkKey)
        dispatch(setError(err.message || 'stream error'))
        dispatch(setStreamStatus('error'))
      } finally {
        inFlightRef.current.delete(chunkKey)
      }
    }, 200), // 200ms throttle delay
 [filename, scale, dispatch, store, fetchRange, bookId]
  )

  return streamRange
}
