import { createSelector } from '@reduxjs/toolkit'
import {
  selectProgressMode,
  selectCurrentPageById,
  selectMaxVisitedPageById
} from './booksSelectors'

//-----------------------------------------------------
//------ Reader State Selectors
//-----------------------------------------------------

/** @constant selectReader - entire reader slice state */
export const selectReader           = state => state.reader
/** @constant selectBookId - ID of the current book in reader */
export const selectBookId           = state => state.reader.bookId
/** @constant selectCurrentPage - current page in reader */
export const selectCurrentPage      = state => state.reader.currentPage
/** @constant selectTotalPages - total pages count */
export const selectTotalPages       = state => state.reader.totalPages
/** @constant selectFileUrl - URL of the loaded PDF */
export const selectFileUrl          = state => state.reader.fileUrl
/** @constant selectScaleIndex - index of the current scale */
export const selectScaleIndex       = state => state.reader.scaleIndex
/** @constant selectCurrentScale - current scale factor */
export const selectCurrentScale     = state => state.reader.currentScale
/** @constant selectFitScaleFactor - scale to fit page */
export const selectFitScaleFactor   = state => state.reader.fitScaleFactor
/** @constant selectFullPageFitScale - scale for full-page fit */
export const selectFullPageFitScale = state => state.reader.fullPageFitScale
/** @constant selectPageViewMode - page view mode ('single' or 'continuous') */
export const selectPageViewMode     = state => state.reader.pageViewMode
/** @constant selectPageTurnRate - page turn rate */
export const selectPageTurnRate     = state => state.reader.pageTurnRate

//-----------------------------------------------------
//------ Render Cache Selectors
//-----------------------------------------------------

/**
 * @function makeSelectRenderedPages
 * @description Factory for a selector returning rendered pages cache by bookId and scale.
 * @param {string} bookId
 * @param {number} scale
 */
export const makeSelectRenderedPages = (bookId, scale) =>
  createSelector(
    selectReader,
    reader => reader.renderedPages?.[bookId]?.[scale] ?? {}
  )

/**
 * @function makeSelectRenderedRanges
 * @description Factory for a selector returning rendered ranges cache by bookId and scale.
 * @param {string} bookId
 * @param {number} scale
 */
export const makeSelectRenderedRanges = (bookId, scale) =>
  createSelector(
    selectReader,
    reader => reader.renderedRanges?.[bookId]?.[scale] ?? []
  )

//-----------------------------------------------------
//------ Computed Progress Selector
//-----------------------------------------------------

/**
 * @function selectProgressValue
 * @description Returns the reading progress value (current or max) based on mode.
 * @param {Object} state
 * @param {string} bookId
 * @returns {number}
 */
export const selectProgressValue = createSelector(
  selectProgressMode,
  (state, bookId) => selectCurrentPageById(state, bookId),
  (state, bookId) => selectMaxVisitedPageById(state, bookId),
  (mode, current, max) => (mode === 'max' ? max : current)
)
