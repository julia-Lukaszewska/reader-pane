/**
 * @file bookSlice.js
 * @description Redux slice for managing book data, UI state, and view settings.
 */

import { createSlice } from '@reduxjs/toolkit'

//-----------------------------------------------------------------------------
// Helper Functions
//-----------------------------------------------------------------------------

/**
 * Ensures an entry exists for the given book ID in state.byId.
 *
 * @param {Object} state - The slice state
 * @param {string} id - The book identifier
 */
function ensureBookEntry(state, id) {
  if (!state.byId) state.byId = {}
  if (!state.byId[id]) {
    state.byId[id] = {
      meta: {},
      stats: {},
      flags: {},
      preload: {},
    }
  }
}

//-----------------------------------------------------------------------------
// Initial State
//-----------------------------------------------------------------------------

const initialState = {
  activeBookId: null,      // currently opened book in reader
  previewBookId: null,     // book shown in preview modal
  isManageMode: false,     // whether selection mode is active
  selectedIds: [],         // IDs of books currently selected
  libraryViewMode: 'grid', // 'grid' | 'list' | 'table'
  sortMode: 'title-asc',   // sort order for library listing
  progressMode: 'current', // 'current' | 'max' for progress bar
  lastOpenedBookId: null,  // persisted last opened book ID
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
    clearActiveBook: state => {
      state.activeBookId = null
    },
    setPreviewBookId: (state, action) => {
      state.previewBookId = action.payload
    },
    clearPreviewBook: state => {
      state.previewBookId = null
    },
    toggleManageMode: state => {
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

    clearSelected: state => {
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
  },
})

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
  setProgressMode,
  setLastOpenedBookId,
} = bookSlice.actions

export default bookSlice.reducer
