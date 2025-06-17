/**
 * @file booksSelectors.js
 * @description
 * Contains selectors for books state: RTK Entity selectors, static book data,
 * and UI state (selected books, filters, etc).
 */

import { createSelector } from '@reduxjs/toolkit'
import { booksAdapter } from '@/store/api/booksPrivateApi/booksAdapter'
import { booksApi } from '@/store/api/booksPrivateApi'

//-----------------------------------------------------------------------------
// 1. RTK Adapter Selectors (getBooks)
//-----------------------------------------------------------------------------

/**
 * Returns the full API result object for getBooks.
 */
export const selectBooksResult = booksApi.endpoints.getBooks.select()

/**
 * Returns normalized book data from getBooks query or initial state fallback.
 */
const selectBooksData = createSelector(
  selectBooksResult,
  (res) => res?.data ?? booksAdapter.getInitialState()
)

/**
 * Returns all books from the RTK entity state.
 */
export const selectAllBooks = booksAdapter.getSelectors(selectBooksData).selectAll

/**
 * Returns a single book by ID.
 * @param {string} id – Book ID
 */
export const selectBookById = (id) =>
  createSelector(selectBooksData, (data) => data.entities[id])

//-----------------------------------------------------------------------------
// 2. Static Books (getBooksStatic)
//-----------------------------------------------------------------------------

/**
 * Returns all books from the static getBooksStatic query.
 */
export const selectAllBooksStatic = createSelector(
  booksApi.endpoints.getBooksStatic.select(),
  (res) => res?.data ? booksAdapter.getSelectors().selectAll(res.data) : []
)

/**
 * Returns a single static book by ID.
 * @param {string} id – Book ID
 */
export const selectBookStaticById = (id) =>
  createSelector(
    booksApi.endpoints.getBooksStatic.select(),
    (res) => res?.data ? booksAdapter.getSelectors().selectById(res.data, id) : undefined
  )

//-----------------------------------------------------------------------------
// 3. UI State from bookSlice
//-----------------------------------------------------------------------------

/**
 * Returns the currently active book ID.
 */
export const selectActiveBookId = (state) => state.book.activeBookId

/**
 * Returns whether the library is in manage mode.
 */
export const selectIsManageMode = (state) => state.book.isManageMode

/**
 * Returns the ID of the previewed book.
 */
export const selectPreviewBookId = (state) => state.book.previewBookId

/**
 * Returns true if the book preview modal is open.
 */
export const selectIsPreviewOpen = (state) => Boolean(state.book.previewBookId)

/**
 * Returns an array of selected book IDs.
 */
export const selectSelectedBookIds = (state) => state.book.selectedIds

/**
 * Returns the current library view mode (e.g. tile/list/table).
 */
export const selectLibraryViewMode = (state) => state.book.libraryViewMode

/**
 * Returns the current book sort mode (e.g. by date, title).
 */
export const selectSortMode = (state) => state.book.sortMode

/**
 * Returns the current reading progress mode.
 */
export const selectProgressMode = (state) => state.book.progressMode

/**
 * Returns the last opened book ID.
 */
export const selectLastOpenedBookId = (state) => state.book.lastOpenedBookId

/**
 * Returns the current library filter object.
 */
export const selectLibraryFilter = (state) => state.book.libraryFilter

/**
 * Returns the current page number for a specific book.
 * @param {object} state – Redux state
 * @param {string} bookId – Book ID
 */
export const selectCurrentPageById = (state, bookId) => {
  const book = selectBookById(bookId)(state)
  return book?.stats?.currentPage ?? 1
}

/**
 * Returns the max visited page number for a specific book.
 * @param {object} state – Redux state
 * @param {string} bookId – Book ID
 */
export const selectMaxVisitedPageById = (state, bookId) => {
  const book = selectBookById(bookId)(state)
  return book?.stats?.maxVisitedPage ?? 1
}
