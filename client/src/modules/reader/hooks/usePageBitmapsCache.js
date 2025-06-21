import { useRef } from 'react'

/**
 * usePageBitmapsCache
 *
 * Provides an in-memory cache for PDF page bitmaps (per book and zoom level).
 * Stores pages in a Map keyed by `${bookId}-${scale}-${pageNum}`.
 * Tracks cached ranges to support memory trimming (only keep the latest N).
 *
 * @returns {{
 *   pageBitmapsRef: React.MutableRefObject<{
 *     pages: Map<string, any>,
 *     ranges: Map<string, boolean>
 *   }>,
 *   clear: () => void,
 *   update: (params: {
 *     bookId: string,
 *     scale: number,
 *     pages: Record<number, any>,
 *     rangeKey: string,
 *     maxRanges?: number
 *   }) => void
 * }}
 */
export default function usePageBitmapsCache() {
  const pageBitmapsRef = useRef({
    pages: new Map(),
    ranges: new Map()
  })

  /**
   * Clears all cached pages and ranges.
   */
  const clear = () => {
    pageBitmapsRef.current.pages.clear()
    pageBitmapsRef.current.ranges.clear()
  }

  /**
   * Updates the cache with new page bitmaps and their range.
   * Keeps only the latest `maxRanges` in memory.
   *
   * @param {Object} params
   * @param {string} params.bookId
   * @param {number} params.scale
   * @param {Object} params.pages - A map of page numbers to bitmap data
   * @param {string} params.rangeKey - e.g. "1-10"
   * @param {number} [params.maxRanges=3]
   */
  const update = ({ bookId, scale, pages, rangeKey, maxRanges = 3 }) => {
    Object.entries(pages).forEach(([pageNum, data]) => {
      const key = `${bookId}-${scale}-${pageNum}`
      pageBitmapsRef.current.pages.set(key, data)
      pageBitmapsRef.current.ranges.set(rangeKey, true)
    })

    // Trim oldest ranges if exceeding max
    const rangeKeys = Array.from(pageBitmapsRef.current.ranges.keys())
    if (rangeKeys.length > maxRanges) {
      const toDelete = rangeKeys.slice(0, rangeKeys.length - maxRanges)
      toDelete.forEach(rangeKey => {
        const [start, end] = rangeKey.split('-').map(Number)
        for (let p = start; p <= end; p++) {
          const key = `${bookId}-${scale}-${p}`
          pageBitmapsRef.current.pages.delete(key)
        }
        pageBitmapsRef.current.ranges.delete(rangeKey)
      })
    }
  }

  return { pageBitmapsRef, clear, update }
}
