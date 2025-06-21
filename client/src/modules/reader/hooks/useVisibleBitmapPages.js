// src/modules/reader/hooks/useVisibleBitmapPages.js

import { useMemo } from 'react'

/**
 * Returns a memoized list of visible pages (with bitmap data) based on the current
 * visible page numbers and the in-memory cache.
 *
 * @param {Object} params
 * @param {number[]} params.visiblePageNumbers - Pages currently visible in the viewport
 * @param {string} params.bookId               - Unique book ID used in cache keys
 * @param {number} params.scale                - Current zoom level
 * @param {React.MutableRefObject} params.pageBitmapsRef
 *        - Ref to the bitmap cache { pages: Map<string, { bitmap, width, height }> }
 * @param {number} params.version              - Used to re-trigger memoization when cache updates
 *
 * @returns {Array<{ pageNumber: number, bitmap: ImageBitmap, width: number, height: number }>}
 */
export default function useVisibleBitmapPages({
  visiblePageNumbers,
  bookId,
  scale,
  pageBitmapsRef,
  version
}) {
  // Note: version is included to force re-run when cache updates,
  // so we disable the exhaustive-deps warning for version.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => {
    const pagesMap = pageBitmapsRef?.current?.pages
    if (!pagesMap) {
      return []
    }

    return visiblePageNumbers
      .map(num => {
        const key = `${bookId}-${scale}-${num}`
        const data = pagesMap.get(key)
        return data ? { pageNumber: num, ...data } : null
      })
      .filter(Boolean)
  }, [visiblePageNumbers, bookId, scale, pageBitmapsRef, version])
}
