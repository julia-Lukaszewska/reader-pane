// src/store/selectors/streamSelectors.js

/**
 * Centralised selectors for streamSlice
 * -------------------------------------
 * Keeps all read-only access to the streaming state in one place.
 * Memoised selectors are created with Reselect.
 */
import { ZOOM_LEVELS } from '@reader/utils/pdfConstants'
import { createSelector } from '@reduxjs/toolkit'

/* ───────────────── basic field selectors ───────────────── */

/**
 * Returns the entire stream slice state
 */
export const selectStream = (state) => state.stream

/**
 * Returns the currently active range of pages
 * Example: [9, 16]
 */
export const selectCurrentRange = (state) => state.stream.currentRange

/**
 * Returns the list of visible pages currently in the viewport
 * Example: [9, 10]
 */
export const selectVisiblePages = (state) => state.stream.visiblePages

/**
 * Returns all rendered pages grouped by scale
 * Example: { '1.0': { 9: { bitmapId, status }, ... } }
 */
export const selectRenderedPages = (state) => state.stream.renderedPages

/**
 * Returns the list of preloaded page ranges
 * Example: [[1,8], [9,16]]
 */
export const selectPreloadedRanges = (state) => state.stream.preloadedRanges

/**
 * Returns the queue of pages waiting to be rendered
 */
export const selectPendingRenderQ = (state) => state.stream.pendingRenderQueue

/**
 * Returns the current streaming status
 * 'idle' | 'streaming' | 'waiting' | 'error'
 */
export const selectStreamStatus = (state) => state.stream.streamStatus

/**
 * Returns the last error encountered during streaming/rendering
 */
export const selectStreamError = (state) => state.stream.error

/**
 * Returns the current zoom level (scale)
 * Example: 1.0
 */
export const selectStreamScale = (state) => state.stream.scale

/**
 * Returns the timestamp of the last successful render
 */
export const selectLastLoadedAt = (state) => state.stream.lastLoadedAt

export const selectScaleIndex = (state) => state.stream.scaleIndex
/* ───────────────── derived / memoised selectors ───────────────── */

/**
 * Returns an array of visible pages that are fully rendered (with bitmaps).
 *
 * Each item has the shape:
 * { pageNumber, bitmap, width, height, status }
 *
 * Only includes pages that are available at the current scale and have a bitmap.
 */
export const selectCurrentScale = createSelector(
  [selectScaleIndex],
  (idx) => ZOOM_LEVELS[idx] ?? 1
)
export const selectVisibleBitmapPages = createSelector(
  [selectVisiblePages, selectRenderedPages, selectStreamScale],
  (numbers, renderedPages, scale) =>
    numbers
      .map((pageNumber) => {
        const data = renderedPages[scale]?.[pageNumber]
        return data ? { pageNumber, ...data } : null
      })
      .filter(Boolean)
)
