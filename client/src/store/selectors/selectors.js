
import { createSelector } from 'reselect'
import { booksApi, booksAdapter } from '@/store/api/booksApi'

//-----------------------------------------------------------------------------//
// Dynamic Data Selectors (RTK Query: getBooks)
//-----------------------------------------------------------------------------//

export const selectBooksResult = booksApi.endpoints.getBooks.select()

export const selectAllBooks = createSelector(
  selectBooksResult,
  result => result?.data ?? []
)

export const selectBookByIdFromCache = bookId =>
  createSelector(selectBooksResult, result =>
    result?.data?.find(book => book._id === bookId)
  )

//-----------------------------------------------------------------------------//
//  Static Data Selectors (RTK Query: getBooksStatic)
//-----------------------------------------------------------------------------//

const adapterSelectors = booksAdapter.getSelectors((s) => s);

export const selectAllBooksStatic = createSelector(
  booksApi.endpoints.getBooksStatic.select(),
  (res) => (res?.data ? adapterSelectors.selectAll(res.data) : [])
);

export const selectBookStaticById = (id) =>
  createSelector(
    booksApi.endpoints.getBooksStatic.select(),
    (res) => (res?.data ? adapterSelectors.selectById(res.data, id) : undefined)
  );

//-----------------------------------------------------------------------------//
//  UI State Selectors (mainUiSlice)
//-----------------------------------------------------------------------------//

export const selectTheme = state => state.ui.theme
export const selectSidebarOpen = state => state.ui.sidebarOpen
export const selectActiveItem = state => state.ui.activeItem
export const selectLoginModalOpen = state => state.ui.loginModalOpen
export const selectRegisterModalOpen = state => state.ui.registerModalOpen
export const selectAuthModalMode = state => state.ui.authModalMode

//-----------------------------------------------------------------------------//
//  Book State Selectors (bookSlice – tylko UI)
//-----------------------------------------------------------------------------//

export const selectActiveBookId = state => state.book.activeBookId
export const selectIsManageMode = state => state.book.isManageMode
export const selectPreviewBookId = state => state.book.previewBookId
export const selectIsPreviewOpen = state => Boolean(state.book.previewBookId)
export const selectSelectedBookIds = state => state.book.selectedIds
export const selectLibraryViewMode = state => state.book.libraryViewMode
export const selectSortMode = state => state.book.sortMode
export const selectProgressMode = state => state.book.progressMode
export const selectLastOpenedBookId = state => state.book.lastOpenedBookId

export const selectCurrentPageById = (state, bookId) => {
  const book = selectBookByIdFromCache(bookId)(state)
  return book?.stats?.currentPage ?? 1
}

export const selectMaxVisitedPageById = (state, bookId) => {
  const book = selectBookByIdFromCache(bookId)(state)
  return book?.stats?.maxVisitedPage ?? 1
}

export const selectCurrentPage = state => {
  const activeId = selectActiveBookId(state)
  return activeId ? selectCurrentPageById(state, activeId) : 1
}

//-----------------------------------------------------------------------------//
//  Reader State Selectors (readerSlice)
//-----------------------------------------------------------------------------//

export const selectScaleIndex = state => state.reader.scaleIndex
export const selectCurrentScale = state => state.reader.currentScale
export const selectFitScaleFactor = state => state.reader.fitScaleFactor
export const selectFullPageFitScale = state => state.reader.fullPageFitScale
export const selectPageViewMode = state => state.reader.pageViewMode
export const selectPageTurnRate = state => state.reader.pageTurnRate

//-----------------------------------------------------------------------------//
//  Computed Selectors
//-----------------------------------------------------------------------------//

export const selectProgressValue = createSelector(
  selectProgressMode,
  (state, bookId) => selectCurrentPageById(state, bookId),
  (state, bookId) => selectMaxVisitedPageById(state, bookId),
  (mode, currentPage, maxVisited) =>
    mode === 'max' ? maxVisited : currentPage
)

//-----------------------------------------------------------------------------//
//  PDF Cache Selectors (pdfCacheSlice)
//-----------------------------------------------------------------------------//

export const selectCachedPage = (state, bookId, scale, page) =>
  state.pdfCache?.[bookId]?.[scale]?.pages?.[page] ?? null

export const selectRenderedRanges = (state, bookId, scale) =>
  state.pdfCache?.[bookId]?.[scale]?.ranges ?? []

//-----------------------------------------------------------------------------//
//  Auth State Selectors (authSlice)
//-----------------------------------------------------------------------------//

export const selectIsLoggedIn = state => Boolean(state.auth.access)
