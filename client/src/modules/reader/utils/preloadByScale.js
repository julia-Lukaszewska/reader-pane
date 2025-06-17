/**
 * @file preloadByScale.js
 * @description
 * Preloads a range of PDF pages at the given scale:
 * - Computes a sliding window around the current page
 * - Skips if pages already cached
 * - Uses `renderPages` to fetch and render images
 * - Calls back with new pages and range
 */

import renderPages from './renderPages'

//-----------------------------------------------------
//------ preloadByScale Function
//-----------------------------------------------------

/**
 * @async
 * @function preloadByScale
 * @description
 * Preloads PDF pages around the current page, caching results and notifying
 * via callbacks when pages and ranges are ready.
 *
 * @param {Object} params
 * @param {Object} params.pdf               - pdfjs document instance
 * @param {number} params.scale             - scale factor for rendering
 * @param {number} params.currentPage       - current page number
 * @param {Object} [params.renderedPages]   - map of already rendered pages
 * @param {Array<[number,number]>} [params.renderedRanges] - existing rendered ranges
 * @param {function(Object<string,object>)} [params.onPages] - callback with new pages
 * @param {function([number,number])} [params.onRange]       - callback with new range
 * @param {React.MutableRefObject<boolean>} params.loadingRef - ref flag to prevent concurrent loads
 * @param {number} [params.concurrency=2]  - number of concurrent page render tasks
 * @returns {Promise<function()>|void} Returns an abort function on success, or void if skipped
 */
export default async function preloadByScale({
  pdf,
  scale,
  currentPage,
  renderedPages = {},
  renderedRanges = [],
  onPages,
  onRange,
  loadingRef,
  concurrency = 2,
}) {
  //-----------------------------------------------------
  //------ Early Exit if Invalid
  //-----------------------------------------------------
  if (
    !pdf ||
    !loadingRef ||
    loadingRef.current ||
    !Number.isInteger(currentPage)
  ) {
    return
  }

  const total = pdf.numPages
  const RANGE_SIZE = 15
  const half = Math.floor(RANGE_SIZE / 2)
  const start = Math.max(1, currentPage - half)
  const end = Math.min(total, currentPage + half)

  //-----------------------------------------------------
  //------ Validate Range
  //-----------------------------------------------------
  if (
    !Number.isInteger(start) ||
    !Number.isInteger(end) ||
    start < 1 ||
    end < 1
  ) {
    console.warn('[preloadByScale] Invalid range', { start, end })
    return
  }

  //-----------------------------------------------------
  //------ Skip if Already Cached
  //-----------------------------------------------------
  const isCached = renderedRanges.some(
    ([a, b]) => start >= a && end <= b
  )
  if (isCached) return

  //-----------------------------------------------------
  //------ Begin Loading
  //-----------------------------------------------------
  loadingRef.current = true
  const controller = new AbortController()

  try {
    console.log('[preloadByScale] rendering pages', { start, end, scale })
    const newPages = await renderPages({
      pdf,
      scale,
      from: start,
      to: end,
      renderedPages,
      signal: controller.signal,
      concurrency,
    })

    //---------------------------------------------------
    //------ Notify Callbacks
    //---------------------------------------------------
    if (onPages && Object.keys(newPages).length) {
      onPages(newPages)
    }
    if (onRange) {
      onRange([start, end])
    }
  } catch (err) {
    console.error('[preloadByScale] error', err)
  } finally {
    loadingRef.current = false
  }

  //-----------------------------------------------------
  //------ Return Abort Function
  //-----------------------------------------------------
  return () => {
    controller.abort()
  }
}
