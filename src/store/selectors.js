import { createSelector } from 'reselect'
import { booksApi, booksAdapter } from '@/store/api/booksApi'

//-------------------------------------------------------------------------
//  Static data (RTK Query normalized)
//--------------------------------------------------------------------------

//  Select result of getBooksStatic query
const selectStaticResult = booksApi.endpoints.getBooksStatic.select()

//  Select all normalized static books
export const selectAllBooksStatic = createSelector(
  selectStaticResult,
  (staticResult) =>
    staticResult.data
      ? booksAdapter.getSelectors().selectAll(staticResult.data)
      : []
)

//  Select single static book by ID
export const selectBookStaticById = (bookId) =>
  createSelector(
    selectStaticResult,
    (staticResult) =>
      staticResult.data
        ? booksAdapter.getSelectors().selectById(staticResult.data, bookId)
        : undefined
  )

//--------------------------------------------------------------------------
// UI state (mainUiSlice)
//------------------------------------------------------------------------------

export const selectTheme        = (state) => state.ui.theme
export const selectSidebarOpen  = (state) => state.ui.sidebarOpen
export const selectActiveItem   = (state) => state.ui.activeItem

//---------------------------------------------------------------------------
//  Book state (bookSlice)
//----------------------------------------------------------------------------

export const selectActiveBookId    = (state) => state.book.activeBookId
export const selectIsManageMode    = (state) => state.book.isManageMode
export const selectPreviewBookId   = (state) => state.book.previewBookId
export const selectIsPreviewOpen   = (state) => Boolean(state.book.previewBookId)
export const selectSelectedBookIds = (state) => state.book.selectedIds
export const selectLibraryViewMode = (state) => state.book.libraryViewMode
export const selectSortMode        = (state) => state.book.sortMode
export const selectProgressMode    = (state) => state.book.progressMode

//----------------------------------------------------------------------------
//  Reader state (readerSlice)
//----------------------------------------------------------------------------

export const selectScaleIndex        = (state) => state.reader.scaleIndex
export const selectCurrentPage       = (state) => state.reader.currentPage
export const selectMaxVisitedPage    = (state) => state.reader.maxVisitedPage
export const selectCurrentScale      = (state) => state.reader.currentScale
export const selectFitScaleFactor    = (state) => state.reader.fitScaleFactor
export const selectFullPageFitScale  = (state) => state.reader.fullPageFitScale
export const selectPageViewMode      = (state) => state.reader.pageViewMode
export const selectPageTurnRate      = (state) => state.reader.pageTurnRate

//----------------------------------------------------------------------------
//  Reading progress (computed value)
//----------------------------------------------------------------------------

export const selectProgressValue = createSelector(
  selectProgressMode,
  selectCurrentPage,
  selectMaxVisitedPage,
  (mode, currentPage, maxVisitedPage) =>
    mode === 'max' ? maxVisitedPage : currentPage
)

//----------------------------------------------------------------------------
//  PDF Cache (pdfCacheSlice)
//----------------------------------------------------------------------------

export const selectCachedPage = (state, bookId, scale, page) =>
  state.pdfCache?.[bookId]?.[scale]?.pages?.[page] ?? null

export const selectRenderedRanges = (state, bookId, scale) =>
  state.pdfCache?.[bookId]?.[scale]?.ranges ?? []
