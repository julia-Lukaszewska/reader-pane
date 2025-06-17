
export function mergeRanges(ranges, [start, end]) {
  const sorted = [...ranges, [start, end]].sort((a, b) => a[0] - b[0])
  const merged = []

  for (const [s, e] of sorted) {
    const last = merged.at(-1)
    if (!last || s > last[1] + 1) merged.push([s, e])
    else last[1] = Math.max(last[1], e)
  }
  return merged
}
