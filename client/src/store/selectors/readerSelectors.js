/**
 * @file readerSelectors.js
 * @description
 * Contains selectors for accessing reader slice state, including current page,
 * scale, rendered pages, and page view mode.
 */

import { createSelector } from '@reduxjs/toolkit'

//-----------------------------------------------------------------------------
// Constants
//-----------------------------------------------------------------------------

const SCALE_LEVELS = [0.5, 0.75, 1, 1.25, 1.5, 2]

//-----------------------------------------------------------------------------
// Root selector
//-----------------------------------------------------------------------------

/**
 * Returns the whole reader slice.
 */
export const selectReader = (state) => state.reader

//-----------------------------------------------------------------------------
// Memoized selectors (createSelector)
//-----------------------------------------------------------------------------

/**
 * Returns the scale index (integer).
 */
export const selectScaleIndex = (state) => selectReader(state).scaleIndex

/**
 * Returns the current scale value (e.g. 1.25) based on index.
 */
export const selectCurrentScale = createSelector(
  [selectScaleIndex],
  (index) => SCALE_LEVELS[index] ?? 1
)

/**
 * Returns a memoized map of rendered pages for given book and scale.
 */
export const makeSelectRenderedPages = (bookId, scale) =>
  createSelector(
    selectReader,
    reader => reader.renderedPages?.[bookId]?.[scale] ?? {}
  )

/**
 * Returns a memoized array of rendered ranges for given book and scale.
 */
export const makeSelectRenderedRanges = (bookId, scale) =>
  createSelector(
    selectReader,
    reader => reader.renderedRanges?.[bookId]?.[scale] ?? []
  )

//-----------------------------------------------------------------------------
// Direct selectors (primitive values)
//-----------------------------------------------------------------------------

export const selectBookId = (state) => selectReader(state).bookId
export const selectCurrentPage = (state) => selectReader(state).currentPage
export const selectTotalPages = (state) => selectReader(state).totalPages
export const selectFileUrl = (state) => selectReader(state).fileUrl
export const selectFitScaleFactor = (state) => selectReader(state).fitScaleFactor
export const selectFullPageFitScale = (state) => selectReader(state).fullPageFitScale
export const selectPageViewMode = (state) => selectReader(state).pageViewMode
export const selectPageTurnRate = (state) => selectReader(state).pageTurnRate

//-----------------------------------------------------------------------------
// Optional: Non-memoized fallback selectors (if needed elsewhere)
//-----------------------------------------------------------------------------

/**
 * Returns the rendered pages map for a given book and scale.
 */
export const selectRenderedPages = (bookId, scale) => (state) =>
  selectReader(state).renderedPages?.[bookId]?.[scale] ?? {}

/**
 * Returns the rendered page ranges for a given book and scale.
 */
export const selectRenderedRanges = (bookId, scale) => (state) =>
  selectReader(state).renderedRanges?.[bookId]?.[scale] ?? []
