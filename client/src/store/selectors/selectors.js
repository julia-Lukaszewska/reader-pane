/**
 * @file selectors.js
 * @description
 * General selectors (UI state, reader settings, computed values, PDF cache).
 */

// UI State Selectors (mainUiSlice)
export const selectTheme = state => state.ui.theme
export const selectSidebarOpen = state => state.ui.sidebarOpen
export const selectActiveItem = state => state.ui.activeItem
export const selectLoginModalOpen = state => state.ui.loginModalOpen
export const selectRegisterModalOpen = state => state.ui.registerModalOpen
export const selectAuthModalMode = state => state.ui.authModalMode

// Reader State Selectors (readerSlice)
export const selectScaleIndex = state => state.reader.scaleIndex
export const selectCurrentScale = state => state.reader.currentScale
export const selectFitScaleFactor = state => state.reader.fitScaleFactor
export const selectFullPageFitScale = state => state.reader.fullPageFitScale
export const selectPageViewMode = state => state.reader.pageViewMode
export const selectPageTurnRate = state => state.reader.pageTurnRate

// Computed Selectors
import { createSelector } from 'reselect'
import { selectProgressMode, selectCurrentPageById, selectMaxVisitedPageById } from './booksSelectors'

/**
 * Compute progress (current or max) based on progress mode.
 */
export const selectProgressValue = createSelector(
  selectProgressMode,
  (state, bookId) => selectCurrentPageById(state, bookId),
  (state, bookId) => selectMaxVisitedPageById(state, bookId),
  (mode, currentPage, maxVisited) =>
    mode === 'max' ? maxVisited : currentPage
)

// PDF Cache Selectors (pdfCacheSlice)
export const selectCachedPage = (state, bookId, scale, page) =>
  state.pdfCache?.[bookId]?.[scale]?.pages?.[page] ?? null

export const selectRenderedRanges = (state, bookId, scale) =>
  state.pdfCache?.[bookId]?.[scale]?.ranges ?? []
