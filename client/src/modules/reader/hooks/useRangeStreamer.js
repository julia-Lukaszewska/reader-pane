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
      console.warn('useRangeStreamer: missing filename', { fileUrl, start, end })
      dispatch(setError('File URL missing'))
      return
    }
    try {
      dispatch(setStreamStatus('streaming'))
      dispatch(setCurrentRange([start, end]))

      const blob = await fetchRange({ filename, start, end }).unwrap()

      // 2) Render pages to bitmaps
      const pages = await pdfjsRenderToBitmaps(blob, { scale, start, end })
      // pages: [{ pageNumber, bitmap }]

      // 3) Cache bitmap and store metadata in Redux
      pages.forEach(({ pageNumber, bitmap }) => {
        const bitmapId = uuid()
        BitmapCache.put(bitmapId, bitmap) // store binary in cache
        dispatch(addRenderedPage({ scale, pageNumber, bitmapId })) // store reference in state
      })

      dispatch(addPreloadedRange([start, end]))
      dispatch(setLastLoadedAt(Date.now()))
      dispatch(setStreamStatus('idle'))
    } catch (err) {
      dispatch(setError(err.message || 'stream error'))
      dispatch(setStreamStatus('error'))
    }
  }
}
