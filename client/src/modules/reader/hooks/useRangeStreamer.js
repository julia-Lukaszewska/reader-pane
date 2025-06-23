/**
 * @file src/hooks/useRangeStreamer.js
 * @description
 * Streams a specific range of PDF pages:
 * 1. Fetches the partial PDF (RTK Query)
 * 2. Renders pages to ImageBitmaps (using pdf.js)
 * 3. Stores bitmaps in BitmapCache, and metadata in Redux
 */

import { useLazyFetchPageRangeQuery } from '@/store/api/pdfStreamApi'
import { useDispatch, useSelector } from 'react-redux'
import {
  setStreamStatus,
  setCurrentRange,
  addRenderedPage,
  addPreloadedRange,
  setLastLoadedAt,
  setError,
} from '@/store/slices/streamSlice'
import { BitmapCache } from '@reader/utils/bitmapCache'
import pdfjsRenderToBitmaps from '@reader/utils/pdfjsRenderToBitmaps'
import { v4 as uuid } from 'uuid'
import { selectFileUrl } from '@/store/selectors/readerSelectors'

export default function useRangeStreamer() {
  const dispatch = useDispatch()
  const scale = useSelector(s => s.stream.scale)
  const fileUrl = useSelector(selectFileUrl)
  const filename = fileUrl ? fileUrl.split('/').pop() : null
  const [fetchRange] = useLazyFetchPageRangeQuery()

  return async ([start, end]) => {
    if (!filename) {
      console.warn('[Streamer] Missing filename', { fileUrl, start, end })
      dispatch(setError('File URL missing'))
      return
    }

    try {
      dispatch(setStreamStatus('streaming'))
      dispatch(setCurrentRange([start, end]))

      console.log('[Streamer] Fetching blob for', { filename, start, end })
      const result = await fetchRange({ filename, start, end })
      const blob = result?.data

      if (!blob || !(blob instanceof Blob)) {
        console.error('[Streamer] Invalid blob received', { blob })
        dispatch(setError('Invalid blob'))
        dispatch(setStreamStatus('error'))
        return
      }

      console.log('[Streamer] Rendering pages to bitmaps', { start, end, scale })
      const pages = await pdfjsRenderToBitmaps(blob, { scale, start, end })

      console.log('[Streamer] Caching rendered bitmaps')
      pages.forEach(({ pageNumber, bitmap }) => {
        const bitmapId = uuid()
        BitmapCache.put(bitmapId, bitmap)
        console.log('[Streamer] Cached bitmap', { pageNumber, bitmapId, scale })
        dispatch(addRenderedPage({ scale, pageNumber, bitmapId }))
      })

      dispatch(addPreloadedRange([start, end]))
      dispatch(setLastLoadedAt(Date.now()))
      dispatch(setStreamStatus('idle'))
      console.log('[Streamer] Done streaming', { range: [start, end] })

    } catch (err) {
      console.error('[Streamer] Streaming error', err)
      dispatch(setError(err.message || 'stream error'))
      dispatch(setStreamStatus('error'))
    }
  }
}
