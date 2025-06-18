/**
 * @file bookSlice.js
 * @description
 * Redux slice for managing UI state and settings related to books in the library view.
 */

import { createSlice } from '@reduxjs/toolkit'

//-----------------------------------------------------------------------------
// Initial State
//-----------------------------------------------------------------------------

/**
 * @type {object}
 * @property {string|null} activeBookId - ID of the currently opened book in the reader.
 * @property {string|null} previewBookId - ID of the book shown in preview modal.
 * @property {boolean} isManageMode - Whether multi-select/manage mode is active.
 * @property {string} libraryFilter - Filter mode (e.g. 'all', 'favorites', 'archived').
 * @property {Array<string>} selectedIds - List of selected book IDs in manage mode.
 * @property {string} libraryViewMode - View mode in the library ('grid' | 'list' | 'table').
 * @property {string} sortMode - Sorting mode for the book list.
 * @property {string} progressMode - Type of progress shown: 'current' or 'max'.
 * @property {string|null} lastOpenedBookId - Last opened book (used to resume session).
 */
const initialState = {
  activeBookId: null,
  previewBookId: null,
  isManageMode: false,
  libraryFilter: 'all',
  selectedIds: [],
  libraryViewMode: 'grid',
  sortMode: 'title-asc',
  progressMode: 'current',
  lastOpenedBookId: null,
  activeLibraryView: 'default', // ← NEW
}

//-----------------------------------------------------------------------------
// Slice: book
//-----------------------------------------------------------------------------

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setActiveBookId: (state, action) => {
      state.activeBookId = action.payload
    },
    clearActiveBook: (state) => {
      state.activeBookId = null
    },
    setPreviewBookId: (state, action) => {
      state.previewBookId = action.payload
    },
    clearPreviewBook: (state) => {
      state.previewBookId = null
    },
    setLibraryFilter: (state, action) => {
      state.libraryFilter = action.payload
    },
    toggleManageMode: (state) => {
      state.isManageMode = !state.isManageMode
      if (!state.isManageMode) state.selectedIds = []
    },
    setManageMode: (state, action) => {
      state.isManageMode = action.payload
      if (!action.payload) state.selectedIds = []
    },
    setSelectedIds: (state, action) => {
      state.selectedIds = action.payload
    },
    toggleSelect: (state, action) => {
      const id = action.payload
      const index = state.selectedIds.indexOf(id)
      if (index === -1) {
        state.selectedIds.push(id)
      } else {
        state.selectedIds.splice(index, 1)
      }
    },
    clearSelected: (state) => {
      state.selectedIds = []
    },
    setLibraryViewMode: (state, action) => {
      state.libraryViewMode = action.payload
    },
    setSortMode: (state, action) => {
      state.sortMode = action.payload
    },
    setProgressMode: (state, action) => {
      state.progressMode = action.payload
    },
    setLastOpenedBookId: (state, action) => {
      state.lastOpenedBookId = action.payload
    },
    setActiveLibraryView: (state, action) => {
    state.activeLibraryView = action.payload
    },

  },
})

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------

export const {
  setActiveBookId,
  clearActiveBook,
  setPreviewBookId,
  clearPreviewBook,
  toggleManageMode,
  setManageMode,
  setSelectedIds,
  toggleSelect,
  clearSelected,
  setLibraryViewMode,
  setSortMode,
  setLibraryFilter,
  setProgressMode,
  setLastOpenedBookId,
  setActiveLibraryView,
} = bookSlice.actions

export default bookSlice.reducer
