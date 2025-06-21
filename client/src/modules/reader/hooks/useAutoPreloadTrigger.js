// src/modules/reader/hooks/useAutoPreloadTrigger.js

import { useEffect } from 'react'
import { getVisiblePages } from '@reader/utils/pdfPageNavigation'

/**
 * Automatically triggers preloading when visible pages are missing from cache.
 *
 * @param {Object} params
 * @param {string} params.bookId               - Unique identifier for the current book
 * @param {number} params.scale                - Current zoom level
 * @param {number} params.currentPage          - Currently active page number
 * @param {number} params.totalPages           - Total number of pages in the document
 * @param {Array<[number, number]>} params.renderedRanges
 *        - Array of [startPage, endPage] ranges that have already been rendered
 * @param {React.MutableRefObject<{ pages: Map<string, { bitmap: ImageBitmap; width: number; height: number }> }>}
 *        params.pageBitmapsRef
 *        - Ref object holding a Map of cached page bitmaps
 * @param {() => void} params.preload          - Function to call to preload missing pages
 */
export default function useAutoPreloadTrigger({
  bookId,
  scale,
  currentPage,
  totalPages,
  renderedRanges,
  pageBitmapsRef,
  preload
}) {
  useEffect(() => {
    // If the cache ref or its pages map isn't ready yet, do nothing
    if (!pageBitmapsRef?.current?.pages) {
      return
    }

    // Build a Set of all pages that have already been rendered
    const renderedPages = new Set()
    renderedRanges.forEach(([start, end]) => {
      for (let page = start; page <= end; page++) {
        renderedPages.add(page)
      }
    })

    // Determine which pages should currently be visible
    const visiblePages = getVisiblePages({
      currentPage,
      totalPages,
      viewMode: undefined
    })

    // Filter out pages that neither exist in cache nor have been rendered
    const missingPages = visiblePages.filter(page => {
      const cacheKey = `${bookId}-${scale}-${page}`
      return (
        !pageBitmapsRef.current.pages.has(cacheKey) &&
        !renderedPages.has(page)
      )
    })

    if (missingPages.length > 0) {
      preload()
    }
  }, [
    bookId,
    scale,
    currentPage,
    totalPages,
    renderedRanges,
    pageBitmapsRef,
    preload
  ])
}
