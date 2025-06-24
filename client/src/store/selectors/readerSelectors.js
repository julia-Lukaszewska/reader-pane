/**
 * @file src/store/selectors/readerSelectors.js
 * @description
 * Contains selectors for accessing the readerSlice state.
 *
 * Responsibilities:
 * - Expose core reader state: current page, total pages, file URL, book ID
 * - Handle conditional logic for visible page numbers based on view mode
 * - Support integration with streaming/scroll-based rendering
 */

import { createSelector } from '@reduxjs/toolkit'
import { selectVisiblePages as selectScrolled } from '@/store/selectors/streamSelectors'

//-----------------------------------------------------------------------------
// Root selector
//-----------------------------------------------------------------------------

/**
 * Returns the full reader slice state.
 */
export const selectReader = (state) => state.reader

//-----------------------------------------------------------------------------
// Basic selectors
//-----------------------------------------------------------------------------

/** Returns the current bookId (if any) */
export const selectBookId = (state) => selectReader(state).bookId

/** Returns the current page number */
export const selectCurrentPage = (state) => selectReader(state).currentPage

/** Returns the total number of pages */
export const selectTotalPages = (state) => selectReader(state).totalPages

/** Returns the PDF file URL (blob or remote) */
export const selectFileUrl = (state) => selectReader(state).fileUrl

/** Returns the current page view mode: 'single' | 'double' | 'scroll' */
export const selectPageViewMode = (state) => selectReader(state).pageViewMode

/** Returns the configured page turn rate (if any) */
export const selectPageTurnRate = (state) => selectReader(state).pageTurnRate

/** Legacy (unused in scroll mode) – visiblePages was formerly tracked per mode */
export const selectVisiblePages = (state) => selectReader(state).visiblePages

//-----------------------------------------------------------------------------
// Memoized: Visible pages based on current view mode
//-----------------------------------------------------------------------------

/**
 * Returns an array of visible page numbers depending on the view mode:
 * - scroll: derived from streamSlice
 * - single: [currentPage]
 * - double: [currentPage, nextPage]
 */
export const selectVisiblePagesByMode = createSelector(
  [
    (s) => s.reader.pageViewMode,     // 'single' | 'double' | 'scroll'
    (s) => s.reader.currentPage,
    (s) => s.reader.totalPages,
    selectScrolled,
  ],
  (mode, cur, total, scrolled) => {
    if (mode === 'scroll') return scrolled
    if (mode === 'single') return [cur]

    const next = Math.min(total, cur + 1)
    return cur === next ? [cur] : [cur, next]
  }
)
