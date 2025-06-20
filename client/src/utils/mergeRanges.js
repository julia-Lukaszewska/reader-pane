/**
 * Merges a new range with an existing list of ranges.
 *
 * Overlapping or adjacent ranges are combined into a single range. Only the
 * last three ranges are kept to limit memory usage.
 *
 * @param {Array<Array<number>>} ranges - Existing ranges [[from, to], ...]
 * @param {Array<number>} newRange - Range to add [from, to]
 * @returns {Array<Array<number>>} Updated and merged ranges
 */
export function mergeRanges(ranges, newRange) {
  let [nStart, nEnd] = newRange
  const out = []
  let added = false

  for (const [start, end] of ranges) {
    if (nEnd + 1 < start) {
      if (!added) {
        out.push([nStart, nEnd])
        added = true
      }
      out.push([start, end])
    } else if (end + 1 < nStart) {
      out.push([start, end])
    } else {
      // overlapping or adjacent – merge with new range
      nStart = Math.min(nStart, start)
      nEnd = Math.max(nEnd, end)
    }
  }

  if (!added) out.push([nStart, nEnd])

  // keep only the newest 3 ranges
  return out.slice(-3)
}

