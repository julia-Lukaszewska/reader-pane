/**
 * @file booksSelectors.js
 * @description
 * Provides memoized selectors for Book entities using RTK Query cache and `booksAdapter`.
 * - Reads from the `getBooks` endpoint cache
 * - Normalizes with `booksAdapter`
 * - Exposes ready-to-use selectors:
 *   - selectAllBooks
 *   - selectBookById
 *   - selectBookEntities
 *   - selectBookIds
 *   - selectBooksTotal
 */

import { createSelector } from '@reduxjs/toolkit'
import { booksAdapter } from '../booksPrivateApi/booksAdapter'
import { booksApi } from '../booksPrivateApi/booksApiCollection'

// ----------------------------------------------------------------------------
// 1) Base selector: RTK Query `getBooks` result
// ----------------------------------------------------------------------------
const selectBooksResult = booksApi.endpoints.getBooks.select()

// ----------------------------------------------------------------------------
// 2) Memoized selector: normalized state slice
// ----------------------------------------------------------------------------
/**
 * @description
 * Returns the normalized books state from the RTK Query cache.
 * Falls back to the adapter’s initial state if no data is present.
 *
 * @param {object} state - Redux root state
 * @returns {EntityState<Book>} Normalized books state
 */
const selectBooksData = createSelector(
  selectBooksResult,
  (booksResult) => booksResult.data ?? booksAdapter.getInitialState()
)

// ----------------------------------------------------------------------------
// 3) Exported selectors from the adapter
// ----------------------------------------------------------------------------
/**
 * Selector: Get all books as an array
 * @function selectAllBooks
 * @param {object} state - Redux root state
 * @returns {Book[]}
 */

/**
 * Selector: Get a book by its MongoDB `_id`
 * @function selectBookById
 * @param {object} state - Redux root state
 * @param {string} id - Book `_id`
 * @returns {Book | undefined}
 */

/**
 * Selector: Get the entities lookup object `{ [id]: Book }`
 * @function selectBookEntities
 * @param {object} state - Redux root state
 * @returns {{ [id: string]: Book }}
 */

/**
 * Selector: Get all book IDs
 * @function selectBookIds
 * @param {object} state - Redux root state
 * @returns {string[]}
 */

/**
 * Selector: Get total number of books
 * @function selectBooksTotal
 * @param {object} state - Redux root state
 * @returns {number}
 */
export const {
  selectAll:    selectAllBooks,
  selectById:   selectBookById,
  selectEntities: selectBookEntities,
  selectIds:    selectBookIds,
  selectTotal:  selectBooksTotal,
} = booksAdapter.getSelectors(selectBooksData)
