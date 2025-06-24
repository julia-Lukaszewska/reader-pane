/**
 * @file src/store/reader/streamSlice.js
 * @description
 * Redux slice for managing PDF streaming state in the reader module.
 */

import { createSlice } from '@reduxjs/toolkit'
import {
  ZOOM_LEVELS,
  MAX_ACTIVE_CHUNKS,
} from '@reader/utils/pdfConstants'
import { BitmapCache } from '@reader/utils/bitmapCache'

//-----------------------------------------------------------------------------
// Constants
//-----------------------------------------------------------------------------
const INITIAL_SCALE_INDEX = 2 // corresponds to ZOOM_LEVELS[2]

//-----------------------------------------------------------------------------
// Initial State
//-----------------------------------------------------------------------------
const initialState = {
  currentRange: null,
  visiblePages: [],

  renderedPages: {},
  preloadedRanges: {},

  pendingRenderQueue: [],

  streamStatus: 'idle',
  scaleIndex: INITIAL_SCALE_INDEX,
  scale: ZOOM_LEVELS[INITIAL_SCALE_INDEX],

  error: null,
  lastLoadedAt: null,
}

//-----------------------------------------------------------------------------
// Slice Definition
//-----------------------------------------------------------------------------
const streamSlice = createSlice({
  name: 'stream',
  initialState,
  reducers: {
    // Viewport state
    setCurrentRange(state, { payload }) {
      state.currentRange = payload
    },
    setVisiblePages(state, { payload }) {
      state.visiblePages = payload
    },

    // Bitmap cache
    addRenderedPage(state, { payload }) {
      const { scale, pageNumber, bitmapId, status = 'ready' } = payload
      if (!state.renderedPages[scale]) state.renderedPages[scale] = {}
      state.renderedPages[scale][pageNumber] = { status, bitmapId }
    },
    setPageStatus(state, { payload }) {
      const { scale, pageNumber, status } = payload
      const page = state.renderedPages[scale]?.[pageNumber]
      if (page) page.status = status
    },

    // Preload & LRU cache management
    addPreloadedRange(state, { payload }) {
      const { scale, range } = payload
      const list = state.preloadedRanges[scale] ?? []

      if (list.some(([s, e]) => s === range[0] && e === range[1])) return
      list.push(range)

      while (list.length > MAX_ACTIVE_CHUNKS) {
        const [start, end] = list.shift()
        for (let p = start; p <= end; p++) {
          const meta = state.renderedPages[scale]?.[p]
          if (meta) {
            BitmapCache.del(meta.bitmapId)
            delete state.renderedPages[scale][p]
          }
        }
      }

      state.preloadedRanges[scale] = list
    },

    registerChunk(state, action) {
      streamSlice.caseReducers.addPreloadedRange(state, action)
    },

    // Render queue
    addToRenderQueue(state, { payload }) {
      const exists = state.pendingRenderQueue.some(
        q => q.scale === payload.scale && q.pageNumber === payload.pageNumber
      )
      if (!exists) state.pendingRenderQueue.push(payload)
    },
    removeFromRenderQueue(state, { payload }) {
      const { scale, pageNumber } = payload
      state.pendingRenderQueue = state.pendingRenderQueue.filter(
        q => !(q.scale === scale && q.pageNumber === pageNumber)
      )
    },
    clearRenderQueue(state) {
      state.pendingRenderQueue = []
    },

    // Zoom state
    setScaleIndex(state, { payload }) {
      state.scaleIndex = payload
      state.scale = ZOOM_LEVELS[payload] ?? state.scale
    },
    setScale(state, { payload }) {
      state.scale = payload
      const idx = ZOOM_LEVELS.indexOf(payload)
      if (idx !== -1) state.scaleIndex = idx
    },

    // Status / meta
    setStreamStatus(state, { payload }) {
      state.streamStatus = payload
    },
    setError(state, { payload }) {
      state.error = payload
    },
    setLastLoadedAt(state, { payload }) {
      state.lastLoadedAt = payload
    },

    // Reset state (e.g. on unmount)
   resetStreamState(state) {
  BitmapCache.gc()
  Object.assign(state, initialState)
}

    
  },
})

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------
export const {
  setCurrentRange,
  setVisiblePages,

  addRenderedPage,
  setPageStatus,

  addPreloadedRange,
  registerChunk,

  addToRenderQueue,
  removeFromRenderQueue,
  clearRenderQueue,

  setScaleIndex,
  setScale,

  setStreamStatus,
  setError,
  setLastLoadedAt,

  resetStreamState,
} = streamSlice.actions

export default streamSlice.reducer
