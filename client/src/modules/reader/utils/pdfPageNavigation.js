// reader/utils/pdfPageNavigation.js

import { ZOOM_LEVELS, PRELOAD_OFFSETS } from './pdfConstants'

/**
 * Generates a numeric range: [start, ..., end]
 * @param {number} start
 * @param {number} end
 * @returns {number[]}
 */
export function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

/**
 * Clamps a page number to a valid range between 1 and totalPages.
 * @param {number} n - Page number
 * @param {number} totalPages - Total number of pages
 * @returns {number}
 */
export function clampPage(n, totalPages) {
  return Math.max(1, Math.min(n, totalPages))
}

/**
 * Returns an array of pages currently visible in the UI, based on the view mode.
 * @param {Object} params
 * @param {number} params.currentPage - Current active page
 * @param {number} params.totalPages - Total number of pages
 * @param {string} params.viewMode - View mode: 'single' | 'double' | 'scroll'
 * @returns {number[]}
 */
export function getVisiblePages({
  currentPage = 1,
  totalPages = 1,
  viewMode = 'single'
}) {
  const page = clampPage(currentPage, totalPages)

  switch (viewMode) {
    case 'double': {
      if (page === 1) {
        return [1]
      }
      if (page % 2 === 0) {
        const next = Math.min(totalPages, page + 1)
        return [page, next]
      }
      const prev = Math.max(1, page - 1)
      return [prev, page]
    }

    case 'scroll': {
      const { before, after } = PRELOAD_OFFSETS.scroll
      const start = Math.max(1, page - before)
      const end = Math.min(totalPages, page + after)
      return range(start, end)
    }

    case 'single':
    default: {
      return [page]
    }
  }
}

/**
 * Returns a set of pages to preload and the associated zoom scale.
 * Used to prepare cache for nearby pages at different zoom levels.
 * @param {Object} params
 * @param {number} params.currentPage
 * @param {string} params.viewMode - 'single' | 'double' | 'scroll'
 * @param {number} params.zoomIndex - Index into ZOOM_LEVELS
 * @param {number} params.pagesCount - Total number of pages
 * @returns {{ pages: number[], scale: number }}
 */
export function getPagesToPreload({
  currentPage = 1,
  viewMode = 'single',
  zoomIndex = 2,
  pagesCount = 1
}) {
  const { before, after } = PRELOAD_OFFSETS[viewMode] || PRELOAD_OFFSETS.single
  const total = Math.max(1, pagesCount)
  const page = clampPage(currentPage, total)
  const start = Math.max(1, page - before)
  const end = Math.min(total, page + after)
  const pages = range(start, end)
  const scale = ZOOM_LEVELS[zoomIndex] ?? ZOOM_LEVELS[2]
  return { pages, scale }
}

/**
 * Returns a [start, end] range of pages for preloading around the current page.
 * @param {Object} params
 * @param {number} params.currentPage
 * @param {number} params.totalPages
 * @param {number} params.rangeSize
 * @returns {{ start: number, end: number }}
 */
export function getPreloadRange({ currentPage, totalPages, rangeSize }) {
  const page = clampPage(currentPage, totalPages)
  const half = Math.floor(rangeSize / 2)
  const start = Math.max(1, page - half)
  const end = Math.min(totalPages, page + half)
  return { start, end }
}

/**
 * Calculates the start and end of a RANGE_SIZE-based segment containing given page.
 * Returns rangeStart, rangeEnd, and string rangeKey.
 * @param {number} pageNum
 * @param {number} rangeSize
 * @returns {{ rangeStart: number, rangeEnd: number, rangeKey: string }}
 */
export function getPageRangeKey(pageNum, rangeSize) {
  const rangeStart = Math.floor((pageNum - 1) / rangeSize) * rangeSize + 1
  const rangeEnd = rangeStart + rangeSize - 1
  return {
    rangeStart,
    rangeEnd,
    rangeKey: `${rangeStart}-${rangeEnd}`
  }
}
