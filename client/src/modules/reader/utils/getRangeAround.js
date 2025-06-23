/**
 * Returns chunk-aligned range around a given page.
 * E.g. page 9 → [9, 16] for chunkSize = 8
 */
export function getRangeAround(page, chunkSize = 8) {
  const start = Math.floor((page - 1) / chunkSize) * chunkSize + 1
  const end = start + chunkSize - 1
  return [start, end]
}
