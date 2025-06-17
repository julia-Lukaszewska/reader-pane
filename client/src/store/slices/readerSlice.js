/**
 * @file readerSlice.js
 * @description Redux slice for managing PDF reader state: zoom levels, view mode, page turn rate, and document context.
 */

import { createSlice } from '@reduxjs/toolkit'

//-----------------------------------------------------------------------------
// Initial State
//----------------------------------------------------------------------------- 

const initialState = {
  scaleIndex: 2,           // index into zoom level array
  currentScale: 1.0,       // current zoom scale
  fitScaleFactor: 1.0,     // scale factor when fitting width or height
  fullPageFitScale: null,  // scale to fit full page in viewport
  pageViewMode: 'single',  // 'single' | 'double' | 'scroll'
  pageTurnRate: null,      // pages per turn or scroll speed
  currentPage: 1,          // current page number
  totalPages: 1,           // total pages in document
  fileUrl: null,           // URL to PDF file
  bookId: null,            // ID of the current book

renderedRanges: {},
}

//-----------------------------------------------------------------------------
// Slice: reader
//----------------------------------------------------------------------------- 

const readerSlice = createSlice({
  name: 'reader',
  initialState,
  reducers: {
    /**
     * Sets the index into the available scale levels.
     */
    setScaleIndex(state, action) {
      state.scaleIndex = action.payload
    },

    /**
     * Sets the current zoom scale.
     */
    setScale(state, action) {
      state.currentScale = action.payload
    },

    /**
     * Sets the factor used when fitting content to available width/height.
     */
    setFitScaleFactor(state, action) {
      state.fitScaleFactor = action.payload
    },

    /**
     * Sets the scale that fits a full page into the viewport.
     */
    setFullPageFitScale(state, action) {
      state.fullPageFitScale = action.payload
    },

    /**
     * Sets the page view mode (single, spread, or scroll).
     */
    setPageViewMode(state, action) {
      state.pageViewMode = action.payload
    },

    /**
     * Sets the page turn rate (e.g. number of pages per turn or scroll speed).
     */
    setPageTurnRate(state, action) {
      state.pageTurnRate = action.payload
    },

    /**
     * Sets the current page number.
     */
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },

    /**
     * Sets the total pages in the document.
     */
    setTotalPages(state, action) {
      state.totalPages = action.payload
    },

    /**
     * Sets the file URL for the PDF.
     */
    setFileUrl(state, action) {
      state.fileUrl = action.payload
    },

    /**
     * Initializes reader state in one action.
     * @param state
     * @param action.payload { bookId: string, totalPages: number, currentPage: number, fileUrl: string }
     */
    setReaderState(state, action) {
      const { bookId, totalPages, currentPage, fileUrl } = action.payload
      state.bookId = bookId
      state.totalPages = totalPages
      state.currentPage = currentPage
      state.fileUrl = fileUrl
    },
     /**
     * Sets rendered pages for given bookId and scale.
     */


setRenderedRanges(state, action) {
  const { bookId, scale, range } = action.payload
  if (!state.renderedRanges) state.renderedRanges = {}
  if (!state.renderedRanges[bookId]) state.renderedRanges[bookId] = {}
  if (!state.renderedRanges[bookId][scale]) state.renderedRanges[bookId][scale] = []

  state.renderedRanges[bookId][scale].push(range)
}



  }})

//-----------------------------------------------------------------------------
// Exports
//----------------------------------------------------------------------------- 

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
} = readerSlice.actions

export default readerSlice.reducer
