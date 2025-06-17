/**
 * @file readerSelectors.js
 * @description
 * Contains selectors for accessing reader slice state, including current page,
 * scale, rendered pages, and page view mode.
 */

import { createSelector } from '@reduxjs/toolkit'

//-----------------------------------------------------------------------------
// Memoized selectors (createSelector)
//-----------------------------------------------------------------------------

/**
 * Returns a memoized map of rendered pages for given book and scale.
 */
export const makeSelectRenderedPages = (bookId, scale) =>
  createSelector(
    state => state.reader,
    reader => reader.renderedPages?.[bookId]?.[scale] ?? {}
  )
  
  /**
   * Returns the scale index (integer).
   */
  export const selectScaleIndex = (state) => state.reader.scaleIndex
/**
 * Returns a memoized array of rendered ranges for given book and scale.
 */
export const makeSelectRenderedRanges = (bookId, scale) =>
  createSelector(
    state => state.reader,
    reader => reader.renderedRanges?.[bookId]?.[scale] ?? []
  )

/**
 * Returns the current scale value (e.g. 1.25) based on index.
 */
export const selectCurrentScale = createSelector(
  [selectScaleIndex],
  (index) => {
    const levels = [0.5, 0.75, 1, 1.25, 1.5, 2]
    return levels[index] ?? 1
  }
)

//-----------------------------------------------------------------------------
// Direct selectors (primitive values)
//-----------------------------------------------------------------------------

/**
 * Returns the whole reader slice.
 */
export const selectReader = (state) => state.reader

/**
 * Returns the current book ID in the reader.
 */
export const selectBookId = (state) => state.reader.bookId

/**
 * Returns the current page number.
 */
export const selectCurrentPage = (state) => selectReader(state).currentPage

/**
 * Returns the total number of pages in the document.
 */
export const selectTotalPages = (state) => selectReader(state).totalPages

/**
 * Returns the file URL of the current document.
 */
export const selectFileUrl = (state) => state.reader.fileUrl


/**
 * Returns the fit-to-container scale factor.
 */
export const selectFitScaleFactor = (state) => state.reader.fitScaleFactor

/**
 * Returns the scale factor to fit one full page vertically.
 */
export const selectFullPageFitScale = (state) => state.reader.fullPageFitScale

/**
 * Returns the current page view mode (e.g. single/double).
 */
export const selectPageViewMode = (state) => selectReader(state).pageViewMode

/**
 * Returns the auto page turn rate.
 */
export const selectPageTurnRate = (state) => state.reader.pageTurnRate

//-----------------------------------------------------------------------------
// Non-memoized dynamic selectors
//-----------------------------------------------------------------------------

/**
 * Returns the rendered pages map for a given book and scale.
 */
export const selectRenderedPages = (bookId, scale) => (state) => {
  return selectReader(state).renderedPages?.[bookId]?.[scale] ?? {}
}

/**
 * Returns the rendered page ranges for a given book and scale.
 */
export const selectRenderedRanges = (bookId, scale) => (state) => {
  return selectReader(state).renderedRanges?.[bookId]?.[scale] ?? []
}
