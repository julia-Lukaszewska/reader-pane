/**
 * @file src/store/selectors/streamSelectors.js
 * @description
 * Centralized selectors for accessing streamSlice state.
 *
 * Responsibilities:
 * - Exposes all fields from stream state (visible pages, rendered pages, scale, etc.)
 * - Provides memoized selectors using Reselect
 * - Encapsulates derived state such as visible bitmap pages at current scale
 */

import { createSelector } from '@reduxjs/toolkit'
import { ZOOM_LEVELS } from '@reader/utils/pdfConstants'

//-----------------------------------------------------------------------------
// Basic selectors (non-memoized)
//-----------------------------------------------------------------------------

/** Returns the full stream slice */
export const selectStream = (state) => state.stream

/** Returns the current active chunk range (e.g. [9, 16]) */
export const selectCurrentRange = (state) => state.stream.currentRange

/** Returns the list of pages currently visible in the viewport */
export const selectVisiblePages = (state) => state.stream.visiblePages

/** Returns the rendered bitmap metadata per scale */
export const selectRenderedPages = (state) => state.stream.renderedPages

/** Returns preloaded page ranges by scale (e.g. [[1,8],[9,16]]) */
export const selectPreloadedRanges = (state) => state.stream.preloadedRanges

/** Returns the queue of pages pending bitmap rendering */
export const selectPendingRenderQ = (state) => state.stream.pendingRenderQueue

/** Returns the current streaming status: 'idle' | 'streaming' | 'waiting' | 'error' */
export const selectStreamStatus = (state) => state.stream.streamStatus

/** Returns the last stream/render error, if any */
export const selectStreamError = (state) => state.stream.error

/** Returns the current scale factor (e.g. 1.0) */
export const selectStreamScale = (state) => state.stream.scale

/** Returns the index of the current zoom level in ZOOM_LEVELS */
export const selectScaleIndex = (state) => state.stream.scaleIndex

/** Returns the timestamp of the last completed render */
export const selectLastLoadedAt = (state) => state.stream.lastLoadedAt

//-----------------------------------------------------------------------------
// Derived selectors (memoized)
//-----------------------------------------------------------------------------

/**
 * Returns the float zoom level corresponding to scaleIndex.
 */
export const selectCurrentScale = createSelector(
  [selectScaleIndex],
  (idx) => ZOOM_LEVELS[idx] ?? 1
)

/**
 * Returns visible pages that are fully rendered (i.e. have bitmap data).
 * 
 * Output shape per page:
 * { pageNumber, bitmapId, status }
 */
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
/** Returns true if currentRange is defined and non-empty */
export const selectIsRangeReady = createSelector(
  [selectCurrentRange],
  (range) => Array.isArray(range) && range.length === 2 && range[0] <= range[1]
)
