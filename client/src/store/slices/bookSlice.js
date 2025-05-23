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
  byId: {},                // map of book entries by ID
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
    /**
     * Sets the currently active book ID.
     *
     * @param {Object} state
     * @param {{ payload: string }} action
     */
    setActiveBookId(state, action) {
      state.activeBookId = action.payload
    },

    /**
     * Clears the active book ID.
     *
     * @param {Object} state
     */
    clearActiveBook(state) {
      state.activeBookId = null
    },

    /**
     * Updates or merges book data in state.byId for a given ID.
     *
     * @param {Object} state
     * @param {{ payload: { id: string, changes: Object } }} action
     */
    updateBookLocally(state, action) {
      const { id, changes } = action.payload
      if (!id || !changes) return
      ensureBookEntry(state, id)
      if (changes.meta) {
        state.byId[id].meta = { ...state.byId[id].meta, ...changes.meta }
      }
      if (changes.stats) {
        state.byId[id].stats = { ...state.byId[id].stats, ...changes.stats }
      }
      if (changes.flags) {
        state.byId[id].flags = { ...state.byId[id].flags, ...changes.flags }
      }
      if (changes.preload) {
        state.byId[id].preload = { ...state.byId[id].preload, ...changes.preload }
      }
    },

    /**
     * Sets arbitrary book data for a given ID.
     *
     * @param {Object} state
     * @param {{ payload: { id: string, data: Object } }} action
     */
    setBookData(state, action) {
      const { id, data } = action.payload
      if (!id) return
      ensureBookEntry(state, id)
      state.byId[id] = { ...state.byId[id], ...data }
    },

    /**
     * Updates only the stats object for a given book ID.
     *
     * @param {Object} state
     * @param {{ payload: { id: string, stats: Object } }} action
     */
    setBookStats(state, action) {
      const { id, stats } = action.payload
      if (!id) return
      ensureBookEntry(state, id)
      state.byId[id].stats = { ...state.byId[id].stats, ...stats }
    },

    /**
     * Updates only the flags object for a given book ID.
     *
     * @param {Object} state
     * @param {{ payload: { id: string, flags: Object } }} action
     */
    setBookFlags(state, action) {
      const { id, flags } = action.payload
      if (!id) return
      ensureBookEntry(state, id)
      state.byId[id].flags = { ...state.byId[id].flags, ...flags }
    },

    /**
     * Updates only the preload cache for a given book ID.
     *
     * @param {Object} state
     * @param {{ payload: { id: string, preload: Object } }} action
     */
    setBookPreload(state, action) {
      const { id, preload } = action.payload
      if (!id) return
      ensureBookEntry(state, id)
      state.byId[id].preload = { ...state.byId[id].preload, ...preload }
    },

    /**
     * Sets manage mode on or off. Clears selection when turning off.
     *
     * @param {Object} state
     * @param {{ payload: boolean }} action
     */
    setManageMode(state, action) {
      state.isManageMode = action.payload
      if (!action.payload) state.selectedIds = []
    },

    /**
     * Toggles manage mode. Clears selection when turning off.
     *
     * @param {Object} state
     */
    toggleManageMode(state) {
      state.isManageMode = !state.isManageMode
      if (!state.isManageMode) state.selectedIds = []
    },

    /**
     * Toggles selection of a book ID.
     *
     * @param {Object} state
     * @param {{ payload: string }} action
     */
    toggleSelect(state, action) {
      const id = action.payload
      state.selectedIds = state.selectedIds.includes(id)
        ? state.selectedIds.filter(x => x !== id)
        : [...state.selectedIds, id]
    },

    /**
     * Clears all selected book IDs.
     *
     * @param {Object} state
     */
    clearSelected(state) {
      state.selectedIds = []
    },

    /**
     * Sets the layout mode for the library.
     *
     * @param {Object} state
     * @param {{ payload: string }} action
     */
    setLibraryViewMode(state, action) {
      state.libraryViewMode = action.payload
    },

    /**
     * Sets the sort mode for the library listing.
     *
     * @param {Object} state
     * @param {{ payload: string }} action
     */
    setSortMode(state, action) {
      state.sortMode = action.payload
    },

    /**
     * Sets the progress bar mode (current or max).
     *
     * @param {Object} state
     * @param {{ payload: string }} action
     */
    setProgressMode(state, action) {
      state.progressMode = action.payload
    },

    /**
     * Sets the book ID for preview modal.
     *
     * @param {Object} state
     * @param {{ payload: string }} action
     */
    setPreviewBookId(state, action) {
      state.previewBookId = action.payload
    },

    /**
     * Clears the preview book ID.
     *
     * @param {Object} state
     */
    clearPreviewBook(state) {
      state.previewBookId = null
    },

    /**
     * Records the last opened book ID.
     *
     * @param {Object} state
     * @param {{ payload: string }} action
     */
    setLastOpenedBookId(state, action) {
      state.lastOpenedBookId = action.payload
    },
  },
})

export const {
  setActiveBookId,
  clearActiveBook,
  updateBookLocally,
  setBookData,
  setBookStats,
  setBookFlags,
  setBookPreload,
  setManageMode,
  toggleManageMode,
  toggleSelect,
  clearSelected,
  setLibraryViewMode,
  setSortMode,
  setProgressMode,
  setPreviewBookId,
  clearPreviewBook,
  setLastOpenedBookId,
} = bookSlice.actions

export default bookSlice.reducer
