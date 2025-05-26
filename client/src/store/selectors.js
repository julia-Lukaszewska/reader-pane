/**
 * @file selectors.js
 * @description Reselect selectors for static data, UI state, book state, reader state, and PDF cache.
 */

import { createSelector } from 'reselect'
import { booksApi, booksAdapter } from '@/store/api/booksApi'

//-----------------------------------------------------------------------------
// Static Data Selectors (RTK Query normalized)
//-----------------------------------------------------------------------------

// Select result of getBooksStatic query
const selectStaticResult = booksApi.endpoints.getBooksStatic.select()

/**
 * Select all static books as an array
 * @type {Selector}
 */
export const selectAllBooksStatic = createSelector(
  selectStaticResult,
  (staticResult) =>
    staticResult.data
      ? booksAdapter.getSelectors().selectAll(staticResult.data)
      : []
)

/**
 * Select a static book by ID
 * @param {string} bookId
 * @returns {Selector}
 */
export const selectBookStaticById = (bookId) =>
  createSelector(
    selectStaticResult,
    (staticResult) =>
      staticResult.data
        ? booksAdapter.getSelectors().selectById(staticResult.data, bookId)
        : undefined
  )

//-----------------------------------------------------------------------------
// UI State Selectors (mainUiSlice)
//-----------------------------------------------------------------------------

/**
 * @returns {string} current theme ('light' | 'dark')
 */
export const selectTheme = (state) => state.ui.theme

/**
 * @returns {boolean} sidebar open state
 */
export const selectSidebarOpen = (state) => state.ui.sidebarOpen

/**
 * @returns {string|null} active navigation item
 */
export const selectActiveItem = (state) => state.ui.activeItem

//-----------------------------------------------------------------------------
// Book State Selectors (bookSlice)
//-----------------------------------------------------------------------------

/** @returns {string|null} active book ID */
export const selectActiveBookId = (state) => state.book.activeBookId

/** @returns {boolean} manage mode flag */
export const selectIsManageMode = (state) => state.book.isManageMode

/** @returns {string|null} preview book ID */
export const selectPreviewBookId = (state) => state.book.previewBookId

/** @returns {boolean} whether preview is open */
export const selectIsPreviewOpen = (state) => Boolean(state.book.previewBookId)

/** @returns {string[]} selected book IDs */
export const selectSelectedBookIds = (state) => state.book.selectedIds

/** @returns {'grid'|'list'|'table'} library view mode */
export const selectLibraryViewMode = (state) => state.book.libraryViewMode

/** @returns {string} sort mode */
export const selectSortMode = (state) => state.book.sortMode

/** @returns {'current'|'max'} progress mode */
export const selectProgressMode = (state) => state.book.progressMode

/** @returns {string|null} last opened book ID */
export const selectLastOpenedBookId = (state) => state.book.lastOpenedBookId

/**
 * Select book entry by ID from normalized byId map
 * @param {string} bookId
 */
export const selectBookById = (state, bookId) =>
  state.book.byId?.[bookId] ?? null

/** @returns {Object} stats for book */
export const selectBookStatsById = (state, bookId) =>
  state.book.byId?.[bookId]?.stats ?? {}

/** @returns {Object} flags for book */
export const selectBookFlagsById = (state, bookId) =>
  state.book.byId?.[bookId]?.flags ?? {}

/** @returns {Object} preload cache for book */
export const selectBookPreloadById = (state, bookId) =>
  state.book.byId?.[bookId]?.preload ?? {}

/** @returns {number} current page or 1 */
export const selectCurrentPageById = (state, bookId) =>
  state.book.byId?.[bookId]?.stats?.currentPage ?? 1

/** @returns {number} max visited page or 1 */
export const selectMaxVisitedPageById = (state, bookId) =>
  state.book.byId?.[bookId]?.stats?.maxVisitedPage ?? 1

/**
 * @returns {number} current page of active book (or 1)
 */
export const selectCurrentPage = (state) => {
  const activeId = selectActiveBookId(state)
  return activeId ? selectCurrentPageById(state, activeId) : 1
}

//-----------------------------------------------------------------------------
// Reader State Selectors (readerSlice)
//-----------------------------------------------------------------------------

/** @returns {number} index into zoom levels */
export const selectScaleIndex = (state) => state.reader.scaleIndex

/** @returns {number} current zoom scale */
export const selectCurrentScale = (state) => state.reader.currentScale

/** @returns {number} fit scale factor */
export const selectFitScaleFactor = (state) => state.reader.fitScaleFactor

/** @returns {number|null} full page fit scale */
export const selectFullPageFitScale = (state) => state.reader.fullPageFitScale

/** @returns {'single'|'spread'|'scroll'} page view mode */
export const selectPageViewMode = (state) => state.reader.pageViewMode

/** @returns {*} page turn rate */
export const selectPageTurnRate = (state) => state.reader.pageTurnRate

//-----------------------------------------------------------------------------
// Computed Selectors
//-----------------------------------------------------------------------------

/**
 * Computes progress value based on mode, current page, and max visited.
 */
export const selectProgressValue = createSelector(
  selectProgressMode,
  (state, bookId) => selectCurrentPageById(state, bookId),
  (state, bookId) => selectMaxVisitedPageById(state, bookId),
  (mode, currentPage, maxVisited) =>
    mode === 'max' ? maxVisited : currentPage
)

//-----------------------------------------------------------------------------
// PDF Cache Selectors (pdfCacheSlice)
//-----------------------------------------------------------------------------

/**
 * Get a cached page data by book, scale, and page number
 */
export const selectCachedPage = (state, bookId, scale, page) =>
  state.pdfCache?.[bookId]?.[scale]?.pages?.[page] ?? null

/**
 * Get cached rendered ranges for book and scale
 */
export const selectRenderedRanges = (state, bookId, scale) =>
  state.pdfCache?.[bookId]?.[scale]?.ranges ?? []
