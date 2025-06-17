import { createSelector } from '@reduxjs/toolkit'
import { booksAdapter }   from '@/store/api/booksPrivateApi/booksAdapter'
import { booksApi }       from '@/store/api/booksPrivateApi'

//-----------------------------------------------------
//------ Books Adapter Selectors
//-----------------------------------------------------

/**
 * @constant selectBooksResult
 * @description RTK Query selector for getBooks endpoint.
 */
export const selectBooksResult = booksApi.endpoints.getBooks.select()

/**
 * @function selectBooksData
 * @description Normalizes books data or returns adapter initial state.
 */
const selectBooksData = createSelector(
  selectBooksResult,
  res => res?.data ?? booksAdapter.getInitialState()
)

/**
 * @constant selectAllBooks
 * @description Returns all book entities.
 */
export const selectAllBooks = booksAdapter.getSelectors(selectBooksData).selectAll

/**
 * @function selectBookById
 * @description Selector factory to get a book by its ID.
 * @param {string} id - Book ID
 */
export const selectBookById = id =>
  createSelector(selectBooksData, data => data.entities[id])

//-----------------------------------------------------
//------ Static Books Selectors
//-----------------------------------------------------

/**
 * @constant selectAllBooksStatic
 * @description Returns all books from the static getBooksStatic endpoint.
 */
export const selectAllBooksStatic = createSelector(
  booksApi.endpoints.getBooksStatic.select(),
  res => (res?.data ? booksAdapter.getSelectors().selectAll(res.data) : [])
)

/**
 * @function selectBookStaticById
 * @description Selector factory to get a static book by ID.
 * @param {string} id - Book ID
 */
export const selectBookStaticById = id =>
  createSelector(
    booksApi.endpoints.getBooksStatic.select(),
    res => (res?.data ? booksAdapter.getSelectors().selectById(res.data, id) : undefined)
  )

//-----------------------------------------------------
//------ Book Slice UI State Selectors
//-----------------------------------------------------

/** @constant selectActiveBookId - currently active book ID */
export const selectActiveBookId     = state => state.book.activeBookId
/** @constant selectIsManageMode - whether manage mode is enabled */
export const selectIsManageMode     = state => state.book.isManageMode
/** @constant selectPreviewBookId - ID of the book in preview */
export const selectPreviewBookId    = state => state.book.previewBookId
/** @constant selectIsPreviewOpen - whether preview pane is open */
export const selectIsPreviewOpen    = state => Boolean(state.book.previewBookId)
/** @constant selectSelectedBookIds - array of selected book IDs */
export const selectSelectedBookIds  = state => state.book.selectedIds
/** @constant selectLibraryViewMode - current library view mode */
export const selectLibraryViewMode  = state => state.book.libraryViewMode
/** @constant selectSortMode - current sorting mode */
export const selectSortMode         = state => state.book.sortMode
/** @constant selectProgressMode - reading progress mode */
export const selectProgressMode     = state => state.book.progressMode
/** @constant selectLastOpenedBookId - last opened book ID */
export const selectLastOpenedBookId = state => state.book.lastOpenedBookId
/** @constant selectLibraryFilter - active library filter value */
export const selectLibraryFilter    = state => state.book.libraryFilter

/**
 * @function selectCurrentPageById
 * @description Returns the current page of a book (defaults to 1).
 * @param {Object} state
 * @param {string} bookId
 * @returns {number}
 */
export const selectCurrentPageById = (state, bookId) => {
  const book = selectBookById(bookId)(state)
  return book?.stats?.currentPage ?? 1
}

/**
 * @function selectMaxVisitedPageById
 * @description Returns the maximum visited page of a book (defaults to 1).
 * @param {Object} state
 * @param {string} bookId
 * @returns {number}
 */
export const selectMaxVisitedPageById = (state, bookId) => {
  const book = selectBookById(bookId)(state)
  return book?.stats?.maxVisitedPage ?? 1
}
