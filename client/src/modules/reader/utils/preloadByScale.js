/**
 * @file preloadByScale.js
 * @description
 * Preloads and renders a focused range of PDF pages around the current page and scale.
 * Avoids duplicate work using a rendered range cache and allows abortion of rendering.
 */

import renderPages from './renderPages'
import { getPreloadRange } from './pdfPageNavigation'
//-----------------------------------------------------------------------------
// Function: preloadByScale
//-----------------------------------------------------------------------------
/**
 * Preloads a 9-page range around the current page at the given scale.
 * Checks cache before rendering. Can be aborted via AbortController.
 *
 * @async
 * @function preloadByScale
 * @param {Object} params
 * @param {Object} params.pdf – Loaded PDF document (PDFDocumentProxy)
 * @param {number} params.scale – Current zoom level
 * @param {number} params.currentPage – Current page number (1-based)
 * @param {Array<Array<number>>} [params.renderedRanges=[]] – Cached rendered ranges
 * @param {Function} [params.onPages] – Callback to deliver rendered pages
 * @param {Function} [params.onRange] – Callback to notify about new range
 * @param {React.MutableRefObject<boolean>} params.loadingRef – Prevents parallel rendering
 * @param {number} [params.concurrency=2] – Number of parallel rendering jobs
 * @returns {Function|undefined} Abort function if started; undefined if skipped
 */
export default async function preloadByScale({
  pdf,
  scale,
  currentPage,
  renderedRanges = [],
  renderedPages = {},
  onPages,
  onRange,
  loadingRef,
  concurrency = 2,
  viewMode = 'single'
}) {
  //-------------------------------------------------------------------------
  // Validate input and skip if not ready
  //-------------------------------------------------------------------------
  console.log('[preloadByScale] INIT', { scale, currentPage })

  if (!pdf || !loadingRef || loadingRef.current || !Number.isInteger(currentPage)) {
    return
  }

  //-------------------------------------------------------------------------
  // Define target page range around currentPage
  //-------------------------------------------------------------------------
   const total = pdf.numPages
  const dynamicRangeSize = viewMode === 'scroll' ? 15 : viewMode === 'double' ? 10 : 6
  const { start, end } = getPreloadRange({ currentPage, totalPages: total, rangeSize: dynamicRangeSize })

  if (!Number.isInteger(start) || !Number.isInteger(end) || start > end) {
    console.warn('[Invalid calculated range]', { start, end, total })
    return
  }

  //-------------------------------------------------------------------------
  // Check if range already rendered (skip if cached)
  //-------------------------------------------------------------------------
   const isCached = renderedRanges.some(([a, b]) => start >= a && end <= b)
  if (isCached) return

  //-------------------------------------------------------------------------
  // Start rendering the range
  //-------------------------------------------------------------------------


  loadingRef.current = true
  const controller = new AbortController()
  try {
    const rawPages = await renderPages({
      pdf,
      scale,
      from: start,
      to: end,
      signal: controller.signal,
      concurrency,
      renderedPages,
    })

    if (onPages && Object.keys(rawPages).length) {
      onPages(rawPages)
      onRange?.([start, end])
    }


  } catch (err) {
    if (err?.name !== 'AbortError') console.error('[preloadByScale error]', err)
  } finally {
    loadingRef.current = false
  }

  

  //-------------------------------------------------------------------------
  // Return abort function
  //-------------------------------------------------------------------------
  return () => controller.abort()
}
