import renderPages from './renderPages'

export default async function preloadByScale({
  pdf,
  scale,
  currentPage,
  renderedPages = {},
  renderedRanges = [],
  onPages,
  onRange,
  loadingRef,
  concurrency = 2,
}) {
  if (!pdf || !loadingRef || loadingRef.current || !Number.isInteger(currentPage)) return

  const total = pdf.numPages
  console.log('[📄 pdf.numPages]', total)
  const RANGE_SIZE = 15
  const half = Math.floor(RANGE_SIZE / 2)
  const start = Math.max(1, currentPage - half)
  const end = Math.min(total, currentPage + half)
if (!Number.isInteger(start) || !Number.isInteger(end) || start < 1 || end < 1) {
  console.warn('[⚠️ Invalid range]', { start, end })
  return
}
  const isCached = renderedRanges.some(([a, b]) => start >= a && end <= b)
  if (isCached) return

  loadingRef.current = true
  const controller = new AbortController()

  try {
    console.log('[renderPages] start →', { from: start, to: end, scale, concurrency })

    const newPages = await renderPages({
      pdf,
      scale,
      from: start,
      to: end,
      renderedPages,
      signal: controller.signal,
      concurrency,
    })

    console.log('[renderPages] done, new:', Object.keys(newPages).length)

    if (onPages && Object.keys(newPages).length) onPages(newPages)
    if (onRange) onRange([start, end])
  } catch (err) {
    console.error('[preloadByScale] error', err)
  } finally {
    loadingRef.current = false
  }

  return () => controller.abort()
}
