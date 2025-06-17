// booksSelectors.js

//-----------------------------------------------------------------------------
// 1. RTK Adapter Selectors (getBooks)
//-----------------------------------------------------------------------------

import { createSelector } from '@reduxjs/toolkit'
import { booksAdapter } from '@/store/api/booksPrivateApi/booksAdapter'
import { booksApi } from '@/store/api/booksPrivateApi'

export const selectBooksResult = booksApi.endpoints.getBooks.select()


const selectBooksData = createSelector(
  selectBooksResult,
  (res) => res?.data ?? booksAdapter.getInitialState()
)

export const selectAllBooks = booksAdapter.getSelectors(selectBooksData).selectAll
export const selectBookById = (id) =>
  createSelector(selectBooksData, (data) => data.entities[id])

//-----------------------------------------------------------------------------
// 2. Static Books (getBooksStatic)
//-----------------------------------------------------------------------------

export const selectAllBooksStatic = createSelector(
  booksApi.endpoints.getBooksStatic.select(),
  (res) => res?.data ? booksAdapter.getSelectors().selectAll(res.data) : []
)

export const selectBookStaticById = (id) =>
  createSelector(
    booksApi.endpoints.getBooksStatic.select(),
    (res) => res?.data ? booksAdapter.getSelectors().selectById(res.data, id) : undefined
  )

//-----------------------------------------------------------------------------
// 3. UI State from bookSlice
//-----------------------------------------------------------------------------

export const selectActiveBookId = (state) => state.book.activeBookId
export const selectIsManageMode = (state) => state.book.isManageMode
export const selectPreviewBookId = (state) => state.book.previewBookId
export const selectIsPreviewOpen = (state) => Boolean(state.book.previewBookId)
export const selectSelectedBookIds = (state) => state.book.selectedIds
export const selectLibraryViewMode = (state) => state.book.libraryViewMode
export const selectSortMode = (state) => state.book.sortMode
export const selectProgressMode = (state) => state.book.progressMode
export const selectLastOpenedBookId = (state) => state.book.lastOpenedBookId
export const selectLibraryFilter = (state) => state.book.libraryFilter

export const selectCurrentPageById = (state, bookId) => {
  const book = selectBookById(bookId)(state)
  return book?.stats?.currentPage ?? 1
}

export const selectMaxVisitedPageById = (state, bookId) => {
  const book = selectBookById(bookId)(state)
  return book?.stats?.maxVisitedPage ?? 1
}



