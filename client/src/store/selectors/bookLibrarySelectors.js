/**
 * @file libraryViewSelectors.js
 * @description
 * Selectors related to the current view of the user's library (filtered books).
 */

import { createSelector } from '@reduxjs/toolkit'
import { selectAllBooks, selectLibraryFilter } from './booksSelectors'

//-----------------------------------------------------------------------------
// Library View Selectors
//-----------------------------------------------------------------------------

/**
 * Returns books filtered by the current library filter value.
 *
 * Possible filters:
 * - 'favorites'
 * - 'archived'
 * - 'to-read'
 * - 'reading'
 * - 'finished'
 * - default (non-archived)
 *
 * @function selectVisibleBooks
 * @returns {Array<Object>} List of visible book objects
 */
export const selectVisibleBooks = createSelector(
  [selectAllBooks, selectLibraryFilter],
  (books, filter) => {
    switch (filter) {
      case 'favorites':
        return books.filter(b => b.flags?.isFavorited && !b.flags?.isArchived)
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
 *
 * @function selectIsLibraryEmpty
 * @returns {boolean}
 */
export const selectIsLibraryEmpty = createSelector(
  selectVisibleBooks,
  list => list.length === 0
)
