/**
 * @file src/store/reader/readerSlice.js
 * @description
 * Redux slice for managing PDF reader state.
 *
 * Responsibilities:
 * - Page view mode: 'single', 'double', or 'scroll'
 * - Page turn rate (optional timing/delay for auto-flipping)
 * - Current page and total page count
 * - File URL and book context for the active PDF
 *
 * Used by:
 * - ReaderLayout and ReaderView
 * - Navigation controls (toolbar, pagination)
 * - usePageViewMode and other hooks
 */

import { createSlice } from '@reduxjs/toolkit'

//-----------------------------------------------------------------------------
// Initial State
//-----------------------------------------------------------------------------
const initialState = {
  pageViewMode: 'single',   // 'single' | 'double' | 'scroll'
  pageTurnRate: null,       // Optional auto-flip timing
  currentPage: 1,           // Current active page number
  totalPages: 1,            // Total number of pages in the PDF

  fileUrl: null,            // Blob URL or remote file location
  bookId: null,             // Book context (for persistence or session logic)
}

//-----------------------------------------------------------------------------
// Slice: reader
//-----------------------------------------------------------------------------
const readerSlice = createSlice({
  name: 'reader',
  initialState,
  reducers: {
    // View mode and page turn rate
    setPageViewMode(state, action) {
      state.pageViewMode = action.payload
    },
    setPageTurnRate(state, action) {
      state.pageTurnRate = action.payload
    },

    // Page navigation
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload
    },

    // File and book metadata
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

    /**
     * Resets the entire reader state (used on reader exit).
     */
    resetReaderState(state) {
      state.bookId = null
      state.fileUrl = null
      state.currentPage = 1
      state.totalPages = 1
      state.pageViewMode = 'single'


    },
  },
})

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------
export const {
  setPageViewMode,
  setPageTurnRate,
  setCurrentPage,
  setTotalPages,
  setFileUrl,
  setReaderState,
  resetReaderState,
} = readerSlice.actions

export default readerSlice.reducer
