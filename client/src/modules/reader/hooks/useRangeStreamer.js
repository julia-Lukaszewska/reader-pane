/**
 * @file src/hooks/useRangeStreamer.js
 * @description
 * Streams a specific range of PDF pages:
 * 1. Fetches the partial PDF (RTK Query)
 * 2. Renders pages to ImageBitmaps (using pdf.js)
 * 3. Stores bitmaps in BitmapCache, and metadata in Redux
 */

import { useLazyFetchPageRangeQuery } from '@/api/pdfStreamApi'
import { useDispatch, useSelector } from 'react-redux'
import {
  setStreamStatus,
  setCurrentRange,
  addRenderedPage,
  addPreloadedRange,
  setLastLoadedAt,
  setError,
} from '@/store/reader/streamSlice'
import { BitmapCache } from '@/utils/BitmapCache'
import pdfjsRenderToBitmaps from '@/utils/pdfjsRenderToBitmaps'
import { v4 as uuid } from 'uuid'

/**
 * Custom hook for streaming and rendering a specific page range from a remote PDF.
 *
 * @param {string} docId - The PDF document ID
 * @returns {(range: [number, number]) => Promise<void>} 
 *   An async function that triggers streaming and rendering of the given page range.
 */
export default function useRangeStreamer(docId) {
  const dispatch = useDispatch()
  const scale = useSelector(s => s.stream.scale)
  const [fetchRange] = useLazyFetchPageRangeQuery()

  /**
   * Triggers the streaming and rendering process for the given page range.
   *
   * @param {[number, number]} range - The page range to stream (inclusive)
   */
  return async ([start, end]) => {
    try {
      dispatch(setStreamStatus('streaming'))
      dispatch(setCurrentRange([start, end]))

      // 1) Fetch partial PDF blob from server
      const blob = await fetchRange({ id: docId, start, end }).unwrap()

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
