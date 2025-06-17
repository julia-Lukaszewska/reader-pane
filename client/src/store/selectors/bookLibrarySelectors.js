import { createSelector } from '@reduxjs/toolkit'
import { selectAllBooks, selectLibraryFilter } from './booksSelectors'

//-----------------------------------------------------
//------ Library View Selectors
//-----------------------------------------------------

/**
 * @function selectVisibleBooks
 * @description Returns books filtered by the current library filter.
 * @param {Array} books
 * @param {string} filter
 * @returns {Array<Object>}
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
 * @function selectIsLibraryEmpty
 * @description Returns true if no books are visible in the current filter.
 * @returns {boolean}
 */
export const selectIsLibraryEmpty = createSelector(
  selectVisibleBooks,
  list => list.length === 0
)
