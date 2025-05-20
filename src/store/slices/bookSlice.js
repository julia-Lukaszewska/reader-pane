
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeBookId: null,
  previewBookId: null,
  isManageMode: false,
  selectedIds: [],
  libraryViewMode: 'grid',
  sortMode: 'title',
  progressMode: 'current', // 'current' or 'max'
}

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setProgressMode(state, action) {
      state.progressMode = action.payload
    },
    setActiveBookId(state, action) {
      state.activeBookId = action.payload
    },
    clearActiveBook(state) {
      state.activeBookId = null
    },
    setPreviewBookId(state, action) {
      state.previewBookId = action.payload
    },
    clearPreviewBook(state) {
      state.previewBookId = null
    },
    setManageMode(state, action) {
      state.isManageMode = action.payload
      if (!action.payload) state.selectedIds = []
    },
    toggleManageMode(state) {
      state.isManageMode = !state.isManageMode
      if (!state.isManageMode) state.selectedIds = []
    },
    toggleSelect(state, action) {
      const id = action.payload
      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter(x => x !== id)
      } else {
        state.selectedIds.push(id)
      }
    },
    clearSelected(state) {
      state.selectedIds = []
    },
    setLibraryViewMode(state, action) {
      state.libraryViewMode = action.payload
    },
    setSortMode(state, action) {
      state.sortMode = action.payload
    },
  },
})

export const {
  setProgressMode,
  setActiveBookId,
  clearActiveBook,
  setPreviewBookId,
  clearPreviewBook,
  setManageMode,
  toggleManageMode,
  toggleSelect,
  clearSelected,
  setLibraryViewMode,
  setSortMode,
} = bookSlice.actions

export default bookSlice.reducer
