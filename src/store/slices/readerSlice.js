// src/store/slices/readerSlice.js

import { createSlice } from '@reduxjs/toolkit'

//----------------------------------------------------------------------
// Reader slice – handles scale, page number, and view mode
//----------------------------------------------------------------------------

const initialState = {
  scaleIndex: 2,
  currentPage: 1,
  maxVisitedPage: 1,
  currentScale: 1.0,
  fitScaleFactor: 1.0,
  fullPageFitScale: null,
  pageViewMode: 'single', // 'single' | 'spread' | 'scroll'
  pageTurnRate: null,
}

//--------------------------------------------------------------------------
// Slice definition
//---------------------------------------------------------------------------

const readerSlice = createSlice({
  name: 'reader',
  initialState,
  reducers: {
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
    setPageViewMode(state, action) {
      state.pageViewMode = action.payload
    },
    setPageTurnRate(state, action) {
      state.pageTurnRate = action.payload
    },
    setCurrentPage(state, action) {
      const page = action.payload
      state.currentPage = page
      if (page > state.maxVisitedPage) {
        state.maxVisitedPage = page
      }
    },
    setMaxVisitedPage(state, action) {
      state.maxVisitedPage = action.payload
    },
  },
})

//--------------------------------------------------------------------------
// Exports
//--------------------------------------------------------------------------

export const {
  setScaleIndex,
  setFitScaleFactor,
  setFullPageFitScale,
  setPageViewMode,
  setPageTurnRate,
  setScale,
  setCurrentPage,
  setMaxVisitedPage,
} = readerSlice.actions

export default readerSlice.reducer
