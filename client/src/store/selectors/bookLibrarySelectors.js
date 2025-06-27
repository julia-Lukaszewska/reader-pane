/**
 * @file booksLibrarySelectors.js
 * @description
 * Selectors for:
 * - Normalized books from RTK Query (getBooks, getBooksStatic)
 * - Filtered view of the library
 * - UI state: view mode, sort, preview, selection, etc.
 */

import { createSelector } from '@reduxjs/toolkit'
import { booksAdapter } from '@/store/api/booksPrivateApi/booksAdapter'
import { booksApi } from '@/store/api/booksPrivateApi'

//-----------------------------------------------------------------------------
// RTK Query: Normalized book data (getBooks)
//-----------------------------------------------------------------------------

/**
 * Returns the full query result of getBooks (with status, data, error).
 */
export const selectBooksResult = booksApi.endpoints.getBooks.select()

/**
 * Returns normalized book data from getBooks query or fallback to initial state.
 */
export const selectBooksData = createSelector(
  selectBooksResult,
  (res) => res?.data ?? booksAdapter.getInitialState()
)

/**
 * Returns all books from normalized entity state.
 */
export const selectAllBooks = booksAdapter.getSelectors(selectBooksData).selectAll

//-----------------------------------------------------------------------------
// RTK Query: Static books (getBooksStatic)
//-----------------------------------------------------------------------------

/**
 * Returns all books from static getBooksStatic query (non-normalized).
 */
export const selectAllBooksStatic = createSelector(
  booksApi.endpoints.getBooksStatic.select(),
  (res) => res?.data ? booksAdapter.getSelectors().selectAll(res.data) : []
)

/**
 * Returns a static book by ID from getBooksStatic query.
 * @param {string} id - Book ID
 */
export const selectBookStaticById = (id) =>
  createSelector(
    booksApi.endpoints.getBooksStatic.select(),
    (res) => res?.data ? booksAdapter.getSelectors().selectById(res.data, id) : undefined
  )
/**
 * Returns a book by ID from normalized getBooks query.
 * @param {string} id - Book ID
 */
export const selectBookById = (id) =>
  createSelector(
    selectBooksData,
    (data) => booksAdapter.getSelectors().selectById(data, id)
  )
//-----------------------------------------------------------------------------
// Library Filtered View
//-----------------------------------------------------------------------------

/**
 * Returns the current active filter used in library view.
 */
export const selectLibraryFilter = (state) => state.book.libraryFilter

/**
 * Returns books filtered by the current library filter value.
 */
export const selectVisibleBooks = createSelector(
  [selectAllBooks, selectLibraryFilter],
  (books, filter) => {
    switch (filter) {
      case 'favorites':
        return books.filter(b => b.flags?.isFavorited)
      case 'archived':
        return books.filter(b => b.flags?.isArchived)
      case 'to-read':
        return books.filter(b => b.flags?.isToRead && !b.flags?.isArchived)
      case 'reading':
        return books.filter(b => b.flags?.isReading && !b.flags?.isArchived)
      case 'finished':
        return books.filter(b => b.flags?.isFinished && !b.flags?.isArchived)
      default:
        return books.filter(b => !b.flags?.isArchived)
    }
  }
)

/**
 * Returns true if no books are visible in the current filter view.
 */
export const selectIsLibraryEmpty = createSelector(
  selectVisibleBooks,
  list => list.length === 0
)

//-----------------------------------------------------------------------------
// UI State: View, Selection, Preview
//-----------------------------------------------------------------------------

/**
 * Returns true if library is in manage mode.
 */
export const selectIsManageMode = (state) => state.book.isManageMode

/**
 * Returns the current library view mode (tile/list/table).
 */
export const selectLibraryViewMode = (state) => state.book.libraryViewMode

/**
 * Returns the current sort mode (e.g. by title/date).
 */
export const selectSortMode = (state) => state.book.sortMode



/**
 * Returns the currently active book ID.
 */
export const selectActiveBookId = (state) => state.book.activeBookId

/**
 * Returns the last opened book ID.
 */
export const selectLastOpenedBookId = (state) => state.book.lastOpenedBookId

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
 * Returns the progress mode used in the reader ('current' or 'max').
 */
export const selectProgressMode = (state) => state.book.progressMode
/**
 * Returns the ID of the book pending delete confirmation.
 */
export const selectConfirmDeleteId = (state) => state.book.confirmDeleteId

/**
 * Returns the variant for delete confirmation modal.
 */
export const selectConfirmDeleteVariant = (state) => state.book.confirmDeleteVariant

/**
 * Returns true if delete confirmation modal is open.
 */
export const selectIsConfirmOpen = (state) => Boolean(state.book.confirmDeleteId)
