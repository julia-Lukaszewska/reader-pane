/**
 * @file pdfCacheSlice.js
 * @description Redux slice for caching rendered PDF pages and their preload ranges per book and scale.
 */

import { createSlice } from '@reduxjs/toolkit'

//-----------------------------------------------------------------------------
// Constants
//-----------------------------------------------------------------------------

const MAX_RANGES = 3 // maximum number of cached ranges per scale

//-----------------------------------------------------------------------------
// Initial State
//-----------------------------------------------------------------------------

// Structure: {
//   [bookId]: {
//     [scale]: {
//       pages: { [pageNumber]: PageData },
//       ranges: Array<[startPage, endPage]>
//     }
//   }
// }
const initialState = {}

//-----------------------------------------------------------------------------
// Slice: pdfCache
//-----------------------------------------------------------------------------

const pdfCacheSlice = createSlice({
  name: 'pdfCache',
  initialState,
  reducers: {
    /**
     * Adds rendered pages to the cache for a given book and scale.
     *
     * @param {Object} state - Current slice state
     * @param {Object} action.payload
     * @param {string} action.payload.bookId - Book identifier
     * @param {string|number} [action.payload.scale=1] - Scale level
     * @param {Object} action.payload.pages - Map of { pageNumber: PageData }
     */
    setRenderedPages(state, { payload: { bookId, scale = 1, pages } }) {
      if (!state[bookId]) state[bookId] = {}
      if (!state[bookId][scale]) {
        state[bookId][scale] = { pages: {}, ranges: [] }
      }
      Object.assign(state[bookId][scale].pages, pages)
    },

    /**
     * Adds new preload ranges and trims to the most recent MAX_RANGES.
     *
     * @param {Object} state - Current slice state
     * @param {Object} action.payload
     * @param {string} action.payload.bookId - Book identifier
     * @param {string|number} [action.payload.scale=1] - Scale level
     * @param {Array<number[]>} action.payload.range - Single range [start, end] or array of ranges
     */
    setRenderedRanges(state, { payload: { bookId, scale = 1, range } }) {
      if (!state[bookId]) state[bookId] = {}
      if (!state[bookId][scale]) {
        state[bookId][scale] = { pages: {}, ranges: [] }
      }
      const ranges = state[bookId][scale].ranges
      const newRanges = Array.isArray(range[0]) ? range : [range]

      newRanges.forEach(([start, end]) => {
        if (!ranges.some(([a, b]) => a === start && b === end)) {
          ranges.push([start, end])
        }
      })

      if (ranges.length > MAX_RANGES) {
        ranges.splice(0, ranges.length - MAX_RANGES)
      }
    },

    /**
     * Clears all cached pages and ranges for a specific book.
     *
     * @param {Object} state - Current slice state
     * @param {Object} action.payload
     * @param {string} action.payload - Book identifier to clear
     */
    clearCache(state, { payload: bookId }) {
      delete state[bookId]
    },
  },
})

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------

export const { setRenderedPages, setRenderedRanges, clearCache } = pdfCacheSlice.actions
export default pdfCacheSlice.reducer
