import renderPages from './renderPages'
import {
  setRenderedPages,
  setRenderedRanges,
} from '@/store/slices/pdfCacheSlice'


export default async function preloadByScale({
  pdf,
  scale,
  currentPage,
  renderedPages,
  renderedRanges,
  bookId,
  dispatch,
  loadingRef,
}) {
  console.log('[preloadByScale] start', { currentPage, scale, bookId })

  if (!pdf || !bookId || loadingRef.current) {
    console.warn('[preloadByScale] Guard failed → skipping preload')
    return
  }

  loadingRef.current = true
  try {
    const total       = pdf.numPages
    const RANGE_SIZE  = 15
    const half        = Math.floor(RANGE_SIZE / 2)
    const start       = Math.max(1, currentPage - half)
    const end         = Math.min(total, currentPage + half)
    console.log('[preloadByScale] Calculated range →', { start, end, total })

    const ranges   = renderedRanges || []
    const isCached = ranges.some(([a, b]) => start >= a && end <= b)
    console.log('[preloadByScale] Cached ranges:', ranges)

    if (isCached) {
      console.log('[preloadByScale] Range already cached → skipping render')
      return
    }

    // render pages in the range [start, end]
    const newPages = await renderPages({
      pdf,
      scale,
      from: start,
      to:   end,
      renderedPages,
    })
    console.log('[preloadByScale] Rendered pages →', Object.keys(newPages))

    // save bitmaps to store
    if (Object.keys(newPages).length) {
      dispatch(
        setRenderedPages({
          bookId,
          scale: String(scale),
          pages: newPages,
        })
      )
      console.log('[preloadByScale] Dispatched renderedPages ✓')
    }

    dispatch(
      setRenderedRanges({
        bookId,
        scale: String(scale),
        range: [start, end],
      })
    )
    console.log('[preloadByScale] Dispatched renderedRanges ✓')
  } catch (err) {
    console.error('[preloadByScale] Error:', err)
  } finally {
    loadingRef.current = false
    console.log('[preloadByScale] Done ✓ loadingRef reset')
  }
}