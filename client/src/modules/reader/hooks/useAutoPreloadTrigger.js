// src/modules/reader/hooks/useAutoPreloadTrigger.js

import { useEffect } from "react"
import {
  getVisiblePages,
  getPageRangeKey,
} from "@reader/utils/pdfPageNavigation"
import { DEFAULT_RANGE_SIZE } from "@reader/utils/pdfConstants"

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
 * @param {React.MutableRefObject<{ pages: Map<string, { bitmap: ImageBitmap; width: number; height: number }> }>
 *        params.pageBitmapsRef                - Ref object holding a Map of cached page bitmaps
 */
export default function useAutoPreloadTrigger({
  bookId,
  scale,
  currentPage,
  totalPages,
  renderedRanges,
  pageBitmapsRef,
  preload,
  pdfRef,
   pdfReady = false,
  viewMode = "single",
}) {
  useEffect(() => {
    if (!pdfReady || !pdfRef?.current || !pageBitmapsRef?.current?.pages) return

    const renderedPages = new Set()
    renderedRanges.forEach(([start, end]) => {
      for (let page = start; page <= end; page++) {
        renderedPages.add(page)
      }
    })

    const visiblePages = getVisiblePages({
      currentPage,
      totalPages,
      viewMode,
    })

    const missingPages = visiblePages.filter((page) => {
      const cacheKey = `${bookId}-${scale}-${page}`
      return (
        !pageBitmapsRef.current.pages.has(cacheKey) &&
        !renderedPages.has(page)
      )
    })

    if (missingPages.length > 0) {
      preload()
    }

    const { rangeEnd } = getPageRangeKey(currentPage, DEFAULT_RANGE_SIZE)
    if (currentPage === rangeEnd && rangeEnd < totalPages) {
      const nextStart = rangeEnd + 1
      const nextEnd = Math.min(totalPages, nextStart + DEFAULT_RANGE_SIZE - 1)
      let needNext = false
      for (let p = nextStart; p <= nextEnd; p++) {
        const key = `${bookId}-${scale}-${p}`
        if (!pageBitmapsRef.current.pages.has(key) && !renderedPages.has(p)) {
          needNext = true
          break
        }
      }
      if (needNext) {
        preload(nextStart)
      }
    }
  }, [
    bookId,
    scale,
    currentPage,
    totalPages,
    renderedRanges,
    pageBitmapsRef,
    preload,
    pdfRef,
     pdfReady,
    viewMode,
  ])
}
