/**
 * @file useVisiblePageRange.js
 * @description Computes the visible PDF pages based on view mode and current page.
 */

import { useMemo } from 'react'

export default function useVisiblePageRange({ currentPage, totalPages, pageViewMode }) {
  const page = Math.min(Math.max(1, currentPage), totalPages)

  return useMemo(() => {
    switch (pageViewMode) {
      case 'double': {
        if (page === 1) return [1]
        if (page % 2 === 0) {
          const next = Math.min(totalPages, page + 1)
          return [page, next]
        }
        const prev = Math.max(1, page - 1)
        return [prev, page]
      }
      case 'scroll': {
        const prev = Math.max(1, page - 1)
        const next = Math.min(totalPages, page + 1)
        const range = [prev, page, next]
        return Array.from(new Set(range))
      }
      case 'single':
      default:
        return [page]
    }
  }, [page, totalPages, pageViewMode])
}
