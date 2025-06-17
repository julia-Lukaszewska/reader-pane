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
import { mergeRanges } from '@/utils/mergeRanges'
//-----------------------------------------------------
//------ Initial State
//-----------------------------------------------------
const initialState = {
  scaleIndex: 2,           // index into zoom levels array
  currentScale: 1.0,       // current zoom scale
  fitScaleFactor: 1.0,     // scale when fitting width/height
  fullPageFitScale: null,  // scale to fit full page
  pageViewMode: 'single',  // 'single' | 'double' | 'scroll'
  pageTurnRate: null,      // pages per turn / scroll speed
  currentPage: 1,          // current page number
  totalPages: 1,           // total pages in document
  fileUrl: null,           // URL to PDF file
  bookId: null,            // active book ID
  renderedRanges: {},      // cached rendered ranges by bookId & scale
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
    /**
     * @action setScaleIndex
     * @description Sets the index into the zoom levels array.
     * @payload {number}
     */
    setScaleIndex(state, action) {
      state.scaleIndex = action.payload
    },

    /**
     * @action setScale
     * @description Sets the current zoom scale.
     * @payload {number}
     */
    setScale(state, action) {
      state.currentScale = action.payload
    },

    /**
     * @action setFitScaleFactor
     * @description Sets the factor used when fitting content to width/height.
     * @payload {number}
     */
    setFitScaleFactor(state, action) {
      state.fitScaleFactor = action.payload
    },

    /**
     * @action setFullPageFitScale
     * @description Sets the scale that fits a full page in the viewport.
     * @payload {number}
     */
    setFullPageFitScale(state, action) {
      state.fullPageFitScale = action.payload
    },

    //-------------------------------------------------
    //------ View Mode & Turn Rate
    //-------------------------------------------------
    /**
     * @action setPageViewMode
     * @description Sets the page view mode (single, double, scroll).
     * @payload {string}
     */
    setPageViewMode(state, action) {
      state.pageViewMode = action.payload
    },

    /**
     * @action setPageTurnRate
     * @description Sets the page turn rate or scroll speed.
     * @payload {number}
     */
    setPageTurnRate(state, action) {
      state.pageTurnRate = action.payload
    },

    //-------------------------------------------------
    //------ Page Navigation
    //-------------------------------------------------
    /**
     * @action setCurrentPage
     * @description Sets the current page number.
     * @payload {number}
     */
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },

    /**
     * @action setTotalPages
     * @description Sets the total number of pages in the document.
     * @payload {number}
     */
    setTotalPages(state, action) {
      state.totalPages = action.payload
    },

    //-------------------------------------------------
    //------ File & Book Context
    //-------------------------------------------------
    /**
     * @action setFileUrl
     * @description Sets the PDF file URL.
     * @payload {string}
     */
    setFileUrl(state, action) {
      state.fileUrl = action.payload
    },

    /**
     * @action setReaderState
     * @description Batch-initializes reader state (bookId, totalPages, currentPage, fileUrl).
     * @payload {{bookId:string, totalPages:number, currentPage:number, fileUrl:string}}
     */
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
    /**
     * @action setRenderedRanges
     * @description Adds a new rendered range for given bookId and scale.
     * @payload {{bookId:string, scale:number, range:[number,number]}}
     */
    setRenderedRanges(state, action) {
      const { bookId, scale, range } = action.payload
      if (!state.renderedRanges[bookId]) {
        state.renderedRanges[bookId] = {}
      }
   const prev = state.renderedRanges[bookId][scale] ?? []
   state.renderedRanges[bookId][scale] = mergeRanges(prev, range)
    },
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
} = readerSlice.actions

export default readerSlice.reducer
