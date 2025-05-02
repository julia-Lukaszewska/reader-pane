import { createSlice } from '@reduxjs/toolkit'
//------------------------------------------------------------------------------
//------ Reader Slice 
//------------------------------------------------------------------------------

//--------------------------------------------------
//------ Initial State 
//--------------------------------------------------
const initialState = {
  activeBookId: null,
  activeBook: null,
  viewMode: 'single',
  currentPage: 1,
  scaleIndex: 1,
  batchSize: 20,
  scaleLevels: [1, 1.25, 1.5, 1.75, 2],
  safetyOffset: 2,
  renderedPages: ,
  renderedRanges: ,
}
//------------------------------------------------------------------------------
//------ Slice do czytnika PDF 
//------------------------------------------------------------------------------
const readerSlice = createSlice({
  name: 'reader',
  initialState,
  reducers: {
    // Action to set the active book 
    setActiveBook(state, action) {
      state.activeBook = action.payload
      state.activeBookId = action.payload._id
      state.currentPage = action.payload.currentPage ?? 1
    },
    // Action to clear the active book 
    clearActiveBook(state) {
      state.activeBook = null
      state.activeBookId = null
    },
    // Action to set the view mode 
    setViewMode(state, action) {
      state.viewMode = action.payload
    },
    // Action to set the current page 
    setCurrentPage(state, action) {
      const page = action.payload
      const max = state.activeBook?.totalPages || 1
      state.currentPage = Math.max(1, Math.min(page, max))
    },
    // Action to set the scale index 
    setScaleIndex(state, action) {
      state.scaleIndex = action.payload
    },
    // Action to set the batch size 
    setBatchSize(state, action) {
      state.batchSize = action.payload
    },
    // Action to set the safety offset 
    setSafetyOffset(state, action) {
      state.safetyOffset = action.payload
    },
    // Action to add rendered pages 
    addRenderedPages(state, action) {
      state.renderedPages = { ...state.renderedPages, ...action.payload }
    },
    // Action to set rendered range 
    setRenderedRange(state, action) {
      const { scale, range } = action.payload
      state.renderedRanges = {
        ...state.renderedRanges,
        [scale]: [...(state.renderedRanges[scale] || []), range],
      }
    },
    // Action to clear rendered pages 
    clearRenderedPages(state) {
      state.renderedPages = 
    },
    // Action to clear rendered ranges 
    clearRenderedRanges(state) {
      state.renderedRanges = 
    },
  },
})

//------------------------------------------------------------------------------
//------ Export actions and reducer 
//------------------------------------------------------------------------------
export const {
  setActiveBook,
  clearActiveBook,
  setViewMode,
  setCurrentPage,
  setScaleIndex,
  setBatchSize,
  setSafetyOffset,
  addRenderedPages,
  setRenderedRange,
  clearRenderedPages,
  clearRenderedRanges,
} = readerSlice.actions

export default readerSlice.reducer
