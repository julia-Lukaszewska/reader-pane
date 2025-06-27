// src/store/selectors/singleBookSelectors.js
import { createSelector } from '@reduxjs/toolkit'
import { selectBooksData } from './bookLibrarySelectors' // Required to access normalized book data from RTK Query
import { selectBookById } from './bookLibrarySelectors'
//----------------------------------------------------------------------------- 
// Base: select single book
//----------------------------------------------------------------------------- 


//----------------------------------------------------------------------------- 
// Book: flags
//----------------------------------------------------------------------------- 

/**
 * Returns the flags object (e.g. isArchived, isFavorited) of a book.
 * @param {string} id - Book ID
 */
export const selectBookFlagsById = (id) =>
  createSelector(selectBookById(id), (book) => book?.flags ?? {})

/**
 * Returns true if the book is archived.
 * @param {string} id - Book ID
 */
export const selectIsArchivedById = (id) =>
  createSelector(selectBookFlagsById(id), (flags) => flags.isArchived ?? false)

/**
 * Returns true if the book is favorited.
 * @param {string} id - Book ID
 */
export const selectIsFavoritedById = (id) =>
  createSelector(selectBookFlagsById(id), (flags) => flags.isFavorited ?? false)

//----------------------------------------------------------------------------- 
// Book: stats
//----------------------------------------------------------------------------- 

/**
 * Returns the stats object (e.g. currentPage, maxVisitedPage) of a book.
 * @param {string} id - Book ID
 */
export const selectBookStatsById = (id) =>
  createSelector(selectBookById(id), (book) => book?.stats ?? {})

/**
 * Returns the current page number of the book.
 * @param {object} state - Redux state
 * @param {string} id - Book ID
 */
export const selectCurrentPageById = (state, id) => {
  const book = selectBookById(id)(state)
  return book?.stats?.currentPage ?? 1
}

/**
 * Returns the highest page number visited in the book.
 * @param {object} state - Redux state
 * @param {string} id - Book ID
 */
export const selectMaxVisitedPageById = (state, id) => {
  const book = selectBookById(id)(state)
  return book?.stats?.maxVisitedPage ?? 1
}

/**
 * Returns computed reading progress as a percentage (0–100).
 * @param {object} state - Redux state
 * @param {string} id - Book ID
 */
export const selectProgressValue = (state, id) => {
  const book = selectBookById(id)(state)
  const page = book?.stats?.currentPage ?? 1
  const max = book?.stats?.maxVisitedPage ?? 1
  if (!max || max <= 1) return 0
  return Math.min(100, Math.round((page / max) * 100))
}

//----------------------------------------------------------------------------- 
// Book: meta
//----------------------------------------------------------------------------- 

/**
 * Returns the meta object (e.g. cover, addedAt) of the book.
 * @param {string} id - Book ID
 */
export const selectBookMetaById = (id) =>
  createSelector(selectBookById(id), (book) => book?.meta ?? {})

/**
 * Returns the book title.
 * @param {string} id - Book ID
 */
export const selectBookTitleById = (id) =>
  createSelector(selectBookById(id), (book) => book?.title ?? '')

//-----------------------------------------------------------------------------
// Book: file ranges
//-----------------------------------------------------------------------------

/**
 * Returns the list of pre-generated ranges for a book.
 * @param {string} id - Book ID
 */
export const selectRangesForBook = (id) =>
  createSelector(selectBookById(id), (book) => book?.file?.ranges ?? [])