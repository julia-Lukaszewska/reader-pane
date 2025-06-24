/**
 * @file src/utils/pdfConstants.js
 * @description
 * Shared constants for PDF rendering and streaming configuration.
 *
 * Includes:
 * - Supported zoom levels
 * - Chunk size for range-based streaming
 * - Page preload/render offsets for different view modes
 */

//-----------------------------------------------------------------------------
// Zoom levels available to the user (scale factors)
//-----------------------------------------------------------------------------
export const ZOOM_LEVELS = [0.5, 0.75, 1.0, 1.25, 1.5]

//-----------------------------------------------------------------------------
// Number of pages to fetch in a chunk (for streaming/rendering)
//-----------------------------------------------------------------------------
export const CHUNK_SIZE = 8

//-----------------------------------------------------------------------------
// Maximum number of active chunks kept in memory (LRU-managed)
//-----------------------------------------------------------------------------
export const MAX_ACTIVE_CHUNKS = 3 // prev | current | next

//-----------------------------------------------------------------------------
// Preload offsets: how many pages before/after to preload (not render)
//-----------------------------------------------------------------------------
export const PRELOAD_OFFSETS = {
  single: { before: 4, after: 4 },
  double: { before: 6, after: 6 },
  scroll: { before: 6, after: 6 },
}

//-----------------------------------------------------------------------------
// Render offsets: how many pages before/after to actually render
//-----------------------------------------------------------------------------
export const RENDER_OFFSETS = {
  single: { before: 2, after: 2 },
  double: { before: 4, after: 4 },
  scroll: { before: 2, after: 2 },
}
