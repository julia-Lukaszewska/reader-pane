/**
 * @file preloadByScale.js
 * @description Preloads and caches a range of PDF pages around the current page at a given scale.
 */

import renderPages from './renderPages'
import {
  setRenderedPages,
  setRenderedRanges,   
} from '@/store/slices/pdfCacheSlice'

//-----------------------------------------------------------------------------
// Function: preloadByScale
//-----------------------------------------------------------------------------

/**
 * Preloads pages of a PDF document within a range centered on currentPage.
 * Updates Redux cache with rendered pages and ranges.
 *
 * @param {Object} params
 * @param {Object} params.pdf - PDFJS document instance
 * @param {number} params.scale - Zoom scale for rendering
 * @param {number} params.currentPage - Currently viewed page number
 * @param {Object} params.renderedPages - Previously cached pages
 * @param {Array<[number,number]>} params.renderedRanges - Previously cached ranges
 * @param {string} params.bookId - Book identifier
 * @param {Function} params.dispatch - Redux dispatch function
 * @param {Object} params.loadingRef - Ref object tracking loading state
 */
export default async function preloadByScale({
  pdf,
  scale,
  currentPage,
  renderedPages,
  renderedRanges,
  bookId,
  dispatch,
  loadingRef,
}) {
  console.log('[preloadByScale] start', { currentPage, scale, bookId })

  // Guard against invalid inputs or concurrent loading
  if (!pdf || !bookId || loadingRef.current) {
    console.warn('[preloadByScale] Guard failed → skipping preload', {
      pdf: !!pdf,
      bookId,
      loading: loadingRef.current,
    })
    return
  }

  try {
    // Determine range size and bounds
    const total = pdf.numPages
    const RANGE_SIZE = 15
    const half = Math.floor(RANGE_SIZE / 2)

    const start = Math.max(1, currentPage - half)
    const end = Math.min(total, currentPage + half)

    // Guard invalid range
    if (start > end) {
      console.warn('[preloadByScale] Invalid range → start > end → skipping render', { start, end })
      return
    }

    console.log('[preloadByScale] Calculated range:', { start, end })
    console.log('[preloadByScale] Existing ranges:', renderedRanges)

    // Skip if this range is already cached
    const isCached = (renderedRanges || [])
      .some(([a, b]) => start >= a && end <= b)
    if (isCached) {
      console.log('[preloadByScale] Range already cached → skipping render')
      return
    }

    // Mark as loading
    loadingRef.current = true

    // Render pages in range
    const newPages = await renderPages({
      pdf,
      scale,
      from: start,
      to: end,
      renderedPages,
    })
    console.log('[preloadByScale] Rendered pages:', Object.keys(newPages))

    // Dispatch new pages to cache
    if (Object.keys(newPages).length) {
      dispatch(setRenderedPages({
        bookId,
        scale: String(scale),
        pages: newPages,
      }))
      console.log('[preloadByScale] Dispatched renderedPages ✓')
    }

    // Always extend the cached ranges
    dispatch(setRenderedRanges({
      bookId,
      scale: String(scale),
      range: [start, end],
    }))
    console.log('[preloadByScale] Dispatched renderedRanges ✓')

  } catch (err) {
    console.error('[preloadByScale] Error:', err)
  } finally {
    // Reset loading flag
    loadingRef.current = false
    console.log('[preloadByScale] Done ✓ loadingRef reset')
  }
}
