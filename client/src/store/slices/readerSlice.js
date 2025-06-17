/**
 * @file readerSlice.js
 * @description Redux slice for managing PDF reader state:
 *   - Zoom levels & scale factors
 *   - View mode & page turn rate
 *   - Current page & total pages
 *   - PDF file URL & book context
 *   - Rendered page ranges cache
 */
import { createSlice } from '@reduxjs/toolkit'


//-----------------------------------------------------
//------ Initial State
//-----------------------------------------------------
const initialState = {
  scaleIndex: 2,
  currentScale: 1.0,
  fitScaleFactor: 1.0,
  fullPageFitScale: null,
  pageViewMode: 'single',
  pageTurnRate: null,
  currentPage: 1,
  totalPages: 1,
  fileUrl: null,
  bookId: null,
  renderedRanges: {},
}

//-----------------------------------------------------
//------ Slice: reader
//-----------------------------------------------------
const readerSlice = createSlice({
  name: 'reader',
  initialState,
  reducers: {
    //-------------------------------------------------
    //------ Zoom Controls
    //-------------------------------------------------
    setScaleIndex(state, action) {
      state.scaleIndex = action.payload
    },
    setScale(state, action) {
      state.currentScale = action.payload
    },
    setFitScaleFactor(state, action) {
      state.fitScaleFactor = action.payload
    },
    setFullPageFitScale(state, action) {
      state.fullPageFitScale = action.payload
    },

    //-------------------------------------------------
    //------ View Mode & Turn Rate
    //-------------------------------------------------
    setPageViewMode(state, action) {
      state.pageViewMode = action.payload
    },
    setPageTurnRate(state, action) {
      state.pageTurnRate = action.payload
    },

    //-------------------------------------------------
    //------ Page Navigation
    //-------------------------------------------------
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload
    },

    //-------------------------------------------------
    //------ File & Book Context
    //-------------------------------------------------
    setFileUrl(state, action) {
      state.fileUrl = action.payload
    },
    setReaderState(state, action) {
      const { bookId, totalPages, currentPage, fileUrl } = action.payload
      state.bookId = bookId
      state.totalPages = totalPages
      state.currentPage = currentPage
      state.fileUrl = fileUrl
    },

    //-------------------------------------------------
    //------ Rendered Ranges Cache
    //-------------------------------------------------
    setRenderedRanges(state, action) {
      const { bookId, scale, range } = action.payload
      if (!state.renderedRanges[bookId]) {
        state.renderedRanges[bookId] = {}
      }
   
    },

    /**
     * @action resetRenderedRanges
     * @description Clears all renderedRanges for a given bookId.
     * @payload {{bookId: string}}
     */
    resetRenderedRanges(state, action) {
      const { bookId } = action.payload
      if (bookId && state.renderedRanges[bookId]) {
        delete state.renderedRanges[bookId]
      }
    },
    /**
 * @action resetReaderState
 * @description Resets full reader state (e.g. on reader exit)
 */
resetReaderState(state) {
  state.bookId = null
  state.fileUrl = null
  state.currentPage = 1
  state.totalPages = 1
  state.renderedRanges = {}
  state.scaleIndex = 2
  state.currentScale = 1.0
  state.fullPageFitScale = null
}

  },
})

//-----------------------------------------------------
//------ Exports
//-----------------------------------------------------
export const {
  setScaleIndex,
  setScale,
  setFitScaleFactor,
  setFullPageFitScale,
  setPageViewMode,
  setPageTurnRate,
  setCurrentPage,
  setTotalPages,
  setFileUrl,
  setReaderState,
  setRenderedRanges,
  resetRenderedRanges,
  resetReaderState, 
} = readerSlice.actions

export default readerSlice.reducer
