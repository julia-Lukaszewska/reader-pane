/**
 * @file readerSlice.js
 * @description Redux slice for managing PDF reader state: zoom levels, view mode, and page turn rate.
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
  pageViewMode: 'single',  // 'single' | 'spread' | 'scroll'
  pageTurnRate: null,      // pages per turn or scroll speed
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
     *
     * @param {Object} state - Current slice state
     * @param {{ payload: number }} action - New scale index
     */
    setScaleIndex(state, action) {
      state.scaleIndex = action.payload
    },

    /**
     * Sets the current zoom scale.
     *
     * @param {Object} state - Current slice state
     * @param {{ payload: number }} action - New zoom scale
     */
    setScale(state, action) {
      state.currentScale = action.payload
    },

    /**
     * Sets the factor used when fitting content to available width/height.
     *
     * @param {Object} state - Current slice state
     * @param {{ payload: number }} action - Fit scale factor
     */
    setFitScaleFactor(state, action) {
      state.fitScaleFactor = action.payload
    },

    /**
     * Sets the scale that fits a full page into the viewport.
     *
     * @param {Object} state - Current slice state
     * @param {{ payload: number|null }} action - Full page fit scale or null
     */
    setFullPageFitScale(state, action) {
      state.fullPageFitScale = action.payload
    },

    /**
     * Sets the page view mode (single, spread, or scroll).
     *
     * @param {Object} state - Current slice state
     * @param {{ payload: string }} action - One of 'single', 'spread', 'scroll'
     */
    setPageViewMode(state, action) {
      state.pageViewMode = action.payload
    },

    /**
     * Sets the page turn rate (e.g. number of pages per turn or scroll speed).
     *
     * @param {Object} state - Current slice state
     * @param {{ payload: any }} action - Page turn rate value
     */
    setPageTurnRate(state, action) {
      state.pageTurnRate = action.payload
    },
  },
})

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
} = readerSlice.actions

export default readerSlice.reducer
