/**
 * @file preloadByScale.js
 * @description
 * Preloads and renders a focused range of PDF pages around the current page and scale.
 * Avoids duplicate work using a rendered range cache and allows abortion of rendering.
 */

import renderPages from './renderPages'

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
  onPages,
  onRange,
  loadingRef,
  concurrency = 2,
}) {
  //-------------------------------------------------------------------------
  // Validate input and skip if not ready
  //-------------------------------------------------------------------------
  console.log('[preloadByScale] INIT', { scale, currentPage })

  if (!pdf || !loadingRef || loadingRef.current || !Number.isInteger(currentPage)) {
    console.warn('[Skipping preloadByScale – invalid state]', {
      hasPDF: !!pdf,
      loading: loadingRef.current,
      currentPage,
    })
    return
  }

  //-------------------------------------------------------------------------
  // Define target page range around currentPage
  //-------------------------------------------------------------------------
  const total = pdf.numPages
  const RANGE_SIZE = 9
  const half = Math.floor(RANGE_SIZE / 2)
  const start = Math.max(1, currentPage - half)
  const end = Math.min(total, currentPage + half)

  if (!Number.isInteger(start) || !Number.isInteger(end) || start > end) {
    console.warn('[Invalid calculated range]', { start, end, total })
    return
  }

  //-------------------------------------------------------------------------
  // Check if range already rendered (skip if cached)
  //-------------------------------------------------------------------------
  const isCached = renderedRanges.some(([a, b]) => start >= a && end <= b)
  if (isCached) {
    console.log('[Skipped – range already cached]', { start, end })
    return
  }

  //-------------------------------------------------------------------------
  // Start rendering the range
  //-------------------------------------------------------------------------
  console.log('[Starting preload/render]', { from: start, to: end, scale })

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
      renderedPages: {},
    })

    console.log('[Pages rendered]', Object.keys(rawPages))

    // Deliver rendered pages and update range
    if (onPages && Object.keys(rawPages).length) {
      onPages(rawPages)
      console.log('[onRange called]', [start, end])
      onRange?.([start, end])
    } else {
      console.log('[Nothing new to cache]')
    }

  } catch (err) {
    //-------------------------------------------------------------------------
    // Handle errors and aborts
    //-------------------------------------------------------------------------
    if (err?.name === 'AbortError') {
      console.warn('[preloadByScale aborted]')
    } else {
      console.error('[preloadByScale error]', err)
    }

  } finally {
    //-------------------------------------------------------------------------
    // Cleanup
    //-------------------------------------------------------------------------
    loadingRef.current = false
    console.log('[preloadByScale finished]')
  }

  //-------------------------------------------------------------------------
  // Return abort function
  //-------------------------------------------------------------------------
  return () => {
    console.log('[Abort controller triggered]')
    controller.abort()
  }
}