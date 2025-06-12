/**
 * @file bookLibrarySelectors.js
 * @description
 * Selectors for filtering books based on flags and library view mode.
 */

import { createSelector } from 'reselect'
import { selectAllBooks, selectLibraryViewMode } from './booksSelectors'

/**
 * Books with isArchived === false
 */
export const selectActiveBooks = createSelector(
  selectAllBooks,
  (books) => books.filter((book) => !book.flags?.isArchived)
)

/**
 * Books with isArchived === true
 */
export const selectArchivedBooks = createSelector(
  selectAllBooks,
  (books) => books.filter((book) => book.flags?.isArchived)
)

/**
 * Books with isFavorited === true
 */
export const selectFavoritedBooks = createSelector(
  selectAllBooks,
  (books) => books.filter((book) => book.flags?.isFavorited)
)

/**
 * Returns books based on current view mode:
 * - "archived": archived only
 * - "favorites": favorited & not archived
 * - default: all active (non-archived)
 */
export const selectBooksForCurrentView = createSelector(
  [selectLibraryViewMode, selectAllBooks],
  (mode, books) => {
    if (mode === 'archived') {
      return books.filter((book) => book.flags?.isArchived)
    }
    if (mode === 'favorites') {
      return books.filter((book) => book.flags?.isFavorited && !book.flags?.isArchived)
    }
    return books.filter((book) => !book.flags?.isArchived)
  }
)
