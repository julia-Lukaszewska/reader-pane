// src/store/reader/streamSlice.js

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentRange: null,              // e.g. [9, 16] — currently active rendered page range
  visiblePages: [],                // e.g. [9,10,11] — pages currently visible in the viewport
  renderedPages: {},               // e.g. { '1.0': { 9: { status, bitmapId }, ... } } — rendered pages grouped by scale
  preloadedRanges: [],             // e.g. [[1,8], [9,16], [17,24]] — ranges already preloaded
  pendingRenderQueue: [],          // e.g. [{ scale: '1.0', pageNumber: 12 }] — pages waiting to be rendered
  streamStatus: 'idle',            // 'idle' | 'streaming' | 'waiting' | 'error' — current streaming state
  scale: 1.0,                      // current zoom level
  error: null,                     // last error encountered during streaming/rendering
  lastLoadedAt: null,              // timestamp of last successful render
  scaleIndex: 2,
}

const streamSlice = createSlice({
  name: 'stream',
  initialState,
  reducers: {
    // Sets the current active page range
    setCurrentRange(state, action) {
      state.currentRange = action.payload
    },

    // Updates currently visible pages in the viewport
    setVisiblePages(state, action) {
      state.visiblePages = action.payload
    },

    // Adds a rendered page for a specific scale
    addRenderedPage(state, action) {
      const { scale, pageNumber, bitmapId, status = 'ready' } = action.payload
      if (!state.renderedPages[scale]) {
        state.renderedPages[scale] = {}
      }
      state.renderedPages[scale][pageNumber] = { status, bitmapId }
    },

    // Updates the status of a specific rendered page
    setPageStatus(state, action) {
      const { scale, pageNumber, status } = action.payload
      if (state.renderedPages[scale]?.[pageNumber]) {
        state.renderedPages[scale][pageNumber].status = status
      }
    },

    // Adds a new preloaded range if it doesn't already exist
    addPreloadedRange(state, action) {
      const newRange = action.payload
      const exists = state.preloadedRanges.some(
        ([start, end]) => start === newRange[0] && end === newRange[1]
      )
      if (!exists) {
        state.preloadedRanges.push(newRange)
      }
    },

    // Sets the current stream status
    setStreamStatus(state, action) {
      state.streamStatus = action.payload
    },
    setScaleIndex(state, action) {
      state.scaleIndex = action.payload
      state.scale = ZOOM_LEVELS[action.payload] ?? state.scale
    },
    // Sets the current zoom level
    setScale(state, action) {
      state.scale = action.payload
    },

    // Stores the latest error
    setError(state, action) {
      state.error = action.payload
    },

    // Sets the timestamp of the last successful page load
    setLastLoadedAt(state, action) {
      state.lastLoadedAt = action.payload
    },

    // Adds a page to the render queue if it's not already queued
    addToRenderQueue(state, action) {
      const item = action.payload
      const exists = state.pendingRenderQueue.some(
        q => q.scale === item.scale && q.pageNumber === item.pageNumber
      )
      if (!exists) {
        state.pendingRenderQueue.push(item)
      }
    },

    // Removes a page from the render queue
    removeFromRenderQueue(state, action) {
      const { scale, pageNumber } = action.payload
      state.pendingRenderQueue = state.pendingRenderQueue.filter(
        q => !(q.scale === scale && q.pageNumber === pageNumber)
      )
    },

    // Resets the entire stream state (e.g. when switching books)
    resetStreamState() {
      return initialState
    },
  },
})

export const {
  setCurrentRange,
  setVisiblePages,
  addRenderedPage,
  setPageStatus,
  addPreloadedRange,
  setStreamStatus,
  setScaleIndex,
  setScale,
  setError,
  setLastLoadedAt,
  addToRenderQueue,
  removeFromRenderQueue,
  resetStreamState,
} = streamSlice.actions

export default streamSlice.reducer
