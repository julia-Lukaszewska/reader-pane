/**
 * @file shouldPreload.js
 * @description Determines whether to preload additional PDF pages when the user approaches cached boundaries.
 */

const BUFFER = 4

//-----------------------------------------------------------------------------
// Function: shouldPreload
//-----------------------------------------------------------------------------

/**
 * Checks if new pages should be loaded based on the current page
 * and existing cached ranges.
 *
 * @param {number} currentPage - Current visible page number
 * @param {Array<[number,number]>} renderedRanges - Cached page ranges as [start, end]
 * @param {number} totalPages - Total number of pages in the document
 * @returns {boolean} True if preload should occur forward or backward
 */
export default function shouldPreload(currentPage, renderedRanges, totalPages) {
  console.log('[shouldPreload] currentPage', currentPage)

  // Guard: invalid inputs
  if (!Array.isArray(renderedRanges) || typeof currentPage !== 'number') {
    return false
  }

  // No ranges yet → preload initial range
  if (renderedRanges.length === 0) return true

  // Sort ranges by their start value
  const sorted = [...renderedRanges].sort((a, b) => a[0] - b[0])
  const [firstStart] = sorted[0]
  const [, lastEnd] = sorted[sorted.length - 1]

  // Check forward preload (near the last cached end)
  const shouldForward = 
    currentPage >= lastEnd - BUFFER &&
    lastEnd < totalPages

  // Check backward preload (near the first cached start)
  const shouldBackward = 
    currentPage <= firstStart + BUFFER &&
    firstStart > 1

  return shouldForward || shouldBackward
}
