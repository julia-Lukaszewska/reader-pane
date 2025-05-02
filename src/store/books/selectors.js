import { createSelector } from '@reduxjs/toolkit'
import { sortBooks } from '@/utils/sortBooks'
//-------------------------------------------------------------------------------
//------ Selectors 
//-------------------------------------------------------------------------------

export const selectLibraryList = (state) => state.library.list
//-----------------------------------------------------------------------------
//------ archive book by ID 
//-------------------------------------------------------------------------------
export const selectArchivedBooks = createSelector([selectLibraryList], (list) =>
  list.filter((b) => b.isArchived)
)
export const selectBookById = (state, id) =>
  state.library.list.find((b) => b._id === id)
//-----------------------------------------------------------------------------
//------ favorite book by ID 
//-------------------------------------------------------------------------------
export const selectFavoritedBooks = createSelector(
  [selectLibraryList],
  (list) => list.filter((b) => b.isFavorited)
)
//-----------------------------------------------------------------------------
//------ sort book by ID 
//-------------------------------------------------------------------------------
export const selectFilteredBooks = createSelector(
  [selectLibraryList, (state) => state.library.sortMode],
  (list, sortMode) => {
    const active = list.filter((b) => !b.isArchived) 
    return sortMode ? sortBooks(active, sortMode) : active
  }
)
