//-----------------------------------------------------------------------------
//------ preloadByScale: Preload missing PDF pages for a given scale 
//-----------------------------------------------------------------------------

/**
 * Preloads missing PDF pages based on current scale and page.
 * Skips ranges that are already rendered (cached).
 * Dispatches rendered range to context after completion.
 * Requires viewMode for double/single page logic.
 */

import { renderPages } from '@/utils'
import { setRenderedRange } from '@/store'

const preloadByScale = async ({
  pdf,
  scale,
  currentPage,
  viewMode, // determines single or double page batching 
  renderedPages,
  renderedRanges,
  dispatch,
  loadingRef,
}) => {
  //---------------------------------------------------------------------------
  //------ Lock loading to avoid duplicate execution 
  //---------------------------------------------------------------------------
  loadingRef.current = true

  try {
    //---------------------------------------------------------------------------
    //------ Define range to preload around currentPage 
    //---------------------------------------------------------------------------
    const totalPages = pdf.numPages
    const batchSize = 8
    const safetyOffset = 3

    const start = Math.max(1, currentPage - safetyOffset) // start of range 
    const end = Math.min(totalPages, currentPage + batchSize - 1) // end of range 

    const ranges = renderedRanges[scale] || [] // previously rendered ranges for this scale 

    //---------------------------------------------------------------------------
    //------ Skip rendering if range already covered 
    //---------------------------------------------------------------------------
    const alreadyRendered =
      Array.isArray(ranges) &&
      ranges.some(
        (range) =>
          Array.isArray(range) &&
          range.length === 2 &&
          start >= range[0] &&
          end <= range[1]
      )

    if (alreadyRendered) return

    //---------------------------------------------------------------------------
    //------ Render pages if range is missing 
    //---------------------------------------------------------------------------
    await renderPages({
      pdf,
      scale,
      from: start,
      to: end,
      viewMode, // preserve layout mode for future pairing logic 
      renderedPages,
      dispatch,
    })

    //---------------------------------------------------------------------------
    //------ Save newly rendered range to context 
    //---------------------------------------------------------------------------
    dispatch(setRenderedRange({ scale, range: [start, end] }))
  } catch (err) {
    console.error('[preloadByScale] Error rendering pages:', err)
  } finally {
    //---------------------------------------------------------------------------
    //------ Unlock loading after completion 
    //---------------------------------------------------------------------------
    loadingRef.current = false
  }
}
export default preloadByScale
