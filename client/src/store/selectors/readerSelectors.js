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




export const selectBookId = (state) => selectReader(state).bookId
export const selectCurrentPage = (state) => selectReader(state).currentPage
export const selectTotalPages = (state) => selectReader(state).totalPages
export const selectFileUrl = (state) => selectReader(state).fileUrl


export const selectPageViewMode = (state) => selectReader(state).pageViewMode
export const selectPageTurnRate = (state) => selectReader(state).pageTurnRate
export const selectVisiblePages = (state) => selectReader(state).visiblePages
//-----------------------------------------------------------------------------
// Optional: Non-memoized fallback selectors (if needed elsewhere)
//-----------------------------------------------------------------------------
