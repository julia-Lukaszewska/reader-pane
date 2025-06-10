/**
 * @file booksSelectors.js
 * @description
 * Selectors for accessing book-related state and cached data.
 */
import { createSelector } from 'reselect'
import { booksApi } from '@/store/api/booksPrivateApi/booksApi'
import { booksAdapter } from '@/store/api/booksPrivateApi/booksAdapter'

//-----------------------------------------------------------------------------//
// Dynamic Data Selectors (RTK Query: getBooks)
//-----------------------------------------------------------------------------//

/**
 * Selects the RTK Query result object for the getBooks endpoint.
 * @returns {object} The result object from the getBooks query.
 */
export const selectBooksResult = booksApi.endpoints.getBooks.select()

/**
 * A universal selector for dynamic book data (ids + entities) from the getBooks cache.
 * Returns the adapter's initial state if data is not available, ensuring consistency.
 * @returns {object} Normalized book data (ids and entities).
 */
const selectBooksData = createSelector(
  selectBooksResult,
  (result) => result?.data ?? booksAdapter.getInitialState()
)

/**
 * Generates adapter selectors that operate on the data provided by selectBooksData.
 * By passing a function, these selectors maintain memoization with RTK Query.
 */
const {
  selectAll: adapterSelectAll,
  selectById: adapterSelectById,
} = booksAdapter.getSelectors((state) => selectBooksData(state))

/**
 * Selects an array of all books from the getBooks cache, or an empty array,
 * utilizing the adapter's selectAll selector.
 * @returns {Array<object>} An array of all book entities.
 */
export const selectAllBooks = adapterSelectAll

/**
 * Creates a selector for a single book by its _id from the cache.
 * Returns data directly from the adapter without manual Array.find().
 * @param {string} id - The ID of the book to select.
 * @returns {function(state): object | undefined} A selector that returns the book entity or undefined.
 */
export const selectBookById = (id) =>
  createSelector(selectBooksData, (data) => adapterSelectById(data, id))

//-----------------------------------------------------------------------------//
// Static Data Selectors (RTK Query: getBooksStatic)
//-----------------------------------------------------------------------------//

/**
 * Selects all static books normalized by the adapter.
 * Uses the adapter's selectors directly on the static data.
 * @returns {Array<object>} An array of all static book entities.
 */
export const selectAllBooksStatic = createSelector(
  booksApi.endpoints.getBooksStatic.select(),
  (res) => (res?.data ? booksAdapter.getSelectors().selectAll(res.data) : [])
)

/**
 * Selects one static book by ID from the normalized data.
 * Uses the adapter's selectors directly on the static data.
 * @param {string} id - The ID of the static book to select.
 * @returns {function(state): object | undefined} A selector that returns the static book entity or undefined.
 */
export const selectBookStaticById = (id) =>
  createSelector(
    booksApi.endpoints.getBooksStatic.select(),
    (res) =>
      res?.data ? booksAdapter.getSelectors().selectById(res.data, id) : undefined
  )

//-----------------------------------------------------------------------------//
// Book UI State Selectors (bookSlice)
//-----------------------------------------------------------------------------//

/**
 * Selects the currently active book ID from the UI state.
 * @param {object} state - The Redux state.
 * @returns {string | null} The ID of the active book, or null if none.
 */
export const selectActiveBookId = state => state.book.activeBookId

/**
 * Selects whether manage mode is enabled in the UI state.
 * @param {object} state - The Redux state.
 * @returns {boolean} True if manage mode is enabled, false otherwise.
 */
export const selectIsManageMode = state => state.book.isManageMode

/**
 * Selects the preview book ID from the UI state.
 * @param {object} state - The Redux state.
 * @returns {string | null} The ID of the book in preview, or null if none.
 */
export const selectPreviewBookId = state => state.book.previewBookId

/**
 * Selects if the preview modal is open based on the previewBookId.
 * @param {object} state - The Redux state.
 * @returns {boolean} True if the preview modal is open, false otherwise.
 */
export const selectIsPreviewOpen = state => Boolean(state.book.previewBookId)

/**
 * Selects an array of selected book IDs from the UI state.
 * @param {object} state - The Redux state.
 * @returns {Array<string>} An array of selected book IDs.
 */
export const selectSelectedBookIds = state => state.book.selectedIds

/**
 * Selects the current library view mode from the UI state.
 * @param {object} state - The Redux state.
 * @returns {string} The current library view mode (e.g., 'grid', 'list').
 */
export const selectLibraryViewMode = state => state.book.libraryViewMode

/**
 * Selects the current sort mode for the library from the UI state.
 * @param {object} state - The Redux state.
 * @returns {string} The current sort mode.
 */
export const selectSortMode = state => state.book.sortMode

/**
 * Selects the progress display mode ('max' or default) from the UI state.
 * @param {object} state - The Redux state.
 * @returns {string} The current progress display mode.
 */
export const selectProgressMode = state => state.book.progressMode

/**
 * Selects the ID of the last opened book from the UI state.
 * @param {object} state - The Redux state.
 * @returns {string | null} The ID of the last opened book, or null if none.
 */
export const selectLastOpenedBookId = state => state.book.lastOpenedBookId

/**
 * Selects the current page number for a given book ID.
 * Defaults to 1 if not found. Uses the new selectBookById selector.
 * @param {object} state - The Redux state.
 * @param {string} bookId - The ID of the book.
 * @returns {number} The current page number for the specified book.
 */
export const selectCurrentPageById = (state, bookId) => {
  const book = selectBookById(bookId)(state)
  return book?.stats?.currentPage ?? 1
}

/**
 * Selects the maximum visited page number for a given book ID.
 * Defaults to 1 if not found. Uses the new selectBookById selector.
 * @param {object} state - The Redux state.
 * @param {string} bookId - The ID of the book.
 * @returns {number} The maximum visited page number for the specified book.
 */
export const selectMaxVisitedPageById = (state, bookId) => {
  const book = selectBookById(bookId)(state)
  return book?.stats?.maxVisitedPage ?? 1
}

/**
 * Selects the current page for the actively selected book.
 * Defaults to 1 if no active book is selected.
 * @param {object} state - The Redux state.
 * @returns {number} The current page of the active book.
 */
export const selectCurrentPage = state => {
  const activeId = selectActiveBookId(state)
  return activeId ? selectCurrentPageById(state, activeId) : 1
}