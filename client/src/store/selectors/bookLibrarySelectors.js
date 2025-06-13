/**
 * @file bookLibrarySelectors.js
 * @description
 * Redux selectors for filtering Book entities based on library filter.
 */
import { createSelector } from '@reduxjs/toolkit'
import { selectAllBooks, selectLibraryFilter } from './booksSelectors'

/**
 * Returns list of books according to current library filter.
 * Supported filter values:
 * - 'favorites' : only favorited, non-archived books
 * - 'archived'  : only archived books
 * - 'to-read'   : books flagged to read next, non-archived
 * - 'reading'   : books in progress, non-archived
 * - 'finished'  : completed books, non-archived
 * - default     : all non-archived books
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
        // e.g. 'all' or any unknown value: show only non-archived
        return books.filter(b => !b.flags?.isArchived)
    }
  }
)

/**
 * Returns `true` if there are no books in the current filtered view.
 */
export const selectIsLibraryEmpty = createSelector(
  selectVisibleBooks,
  list => list.length === 0
)
