/**
 * @file src/utils/getRangeAround.js
 * @description
 * Returns a page range aligned to the configured chunk size.
 * Useful for triggering PDF streaming or rendering in fixed-size blocks.
 *
 * Example: page 9 with CHUNK_SIZE = 8 → [9, 16]
 *
 * @param {number} page - Target page number (1-based)
 * @param {number} [chunk=CHUNK_SIZE] - Optional chunk size override
 * @returns {[number, number]} Tuple representing the [start, end] page range
 */

import { CHUNK_SIZE } from '@reader/utils/pdfConstants'

export function getRangeAround(page, chunk = CHUNK_SIZE) {
  const start = Math.floor((page - 1) / chunk) * chunk + 1
  return [start, start + chunk - 1]
}
