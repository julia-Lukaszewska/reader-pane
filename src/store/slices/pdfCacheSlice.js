import { createSlice } from '@reduxjs/toolkit'

//-------------------------------------------------------------------------
// PDF rendering cache slice
//---------------------------------------------------------------------
// Stores rendered pages and their preload ranges per book and scale
// Structure: state[bookId][scale] = { pages: {}, ranges: [] }
//-------------------------------------------------------------------------

const initialState = {}

//------------------------------------------------------------------------
// Helper: merge rendered pages into existing cache
//-------------------------------------------------------------------------

const mergePages = (target, pages) => {
  Object.entries(pages).forEach(([num, data]) => {
    target[num] = data
  })
}

//-------------------------------------------------------------------------
// Slice definition
//-------------------------------------------------------------------------

const pdfCacheSlice = createSlice({
  name: 'pdfCache',
  initialState,
  reducers: {
    // Set rendered pages for a specific book and scale
    setRenderedPages(state, { payload: { bookId, scale = 1, pages } }) {
      if (!state[bookId]) state[bookId] = {}
      if (!state[bookId][scale]) {
        state[bookId][scale] = { pages: {}, ranges: [] }
      }
      mergePages(state[bookId][scale].pages, pages)
    },

    // Set rendered page ranges (to avoid reloading)
    setRenderedRanges(state, { payload: { bookId, scale = 1, range } }) {
      const rangesIn = Array.isArray(range[0]) ? range : [range]
      if (!state[bookId]) state[bookId] = {}
      if (!state[bookId][scale]) {
        state[bookId][scale] = { pages: {}, ranges: [] }
      }
      const ranges = state[bookId][scale].ranges
      rangesIn.forEach(([s, e]) => {
        if (!ranges.some(([a, b]) => a === s && b === e)) {
          ranges.push([s, e])
        }
      })
    },

    // Clear cache for a specific book
    clearCache(state, { payload: bookId }) {
      delete state[bookId]
    },
  },
})

//------------------------------------------------------------------------
// Exports
//------------------------------------------------------------------------

export const {
  setRenderedPages,
  setRenderedRanges,
  clearCache,
} = pdfCacheSlice.actions

export default pdfCacheSlice.reducer
