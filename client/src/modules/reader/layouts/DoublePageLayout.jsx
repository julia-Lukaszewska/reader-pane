/**
 * @file src/views/reader/layouts/DoublePageLayout.jsx
 * @description
 * Double-page layout for the PDF reader.
 *
 * Behaviour
 * ----------
 * • Always tries to show the current page **and** the next one.
 * • Falls back to a single page when the two bitmaps have
 *   different orientation (portrait vs. landscape).
 * • Uses exactly the same ImageBitmap cache as the single-page view –
 *   only the selection logic differs.
 */

import React from 'react'
import { useSelector } from 'react-redux'
import { PDFCanvasViewer } from '../components'

import {
  selectCurrentPage,
  selectTotalPages,
} from '@/store/selectors/readerSelectors'
import {
  selectRenderedPages,
  selectStreamScale,
} from '@/store/selectors/streamSelectors'
import { BitmapCache } from '@reader/utils/bitmapCache'

/* helper ▸ determines orientation of a bitmap */
const orient = (bmp) =>
  bmp && bmp.width >= bmp.height ? 'landscape' : 'portrait'

/**
 * DoublePageLayout component
 *
 * @param {object}   props
 * @param {React.Ref} props.containerRef – ref przekazywany dalej do viewer-a
 */
export default function DoublePageLayout({ containerRef }) {
  /* ---------- Redux state ------------------------------------------------ */
  const currentPage = useSelector(selectCurrentPage)      // bieżąca strona
  const totalPages  = useSelector(selectTotalPages)       // max stron w pliku
  const scaleKey    = String(useSelector(selectStreamScale))
  const rendered    = useSelector(selectRenderedPages)[scaleKey] ?? {}

  /* ---------- Choose which pages to show --------------------------------- */
  const first  = currentPage
  const second = currentPage + 1 <= totalPages ? currentPage + 1 : null

  let pages = second ? [first, second] : [first]

  /* If both bitmaps are ready and have mixed orientation → show one page */
  if (second) {
    const bmpA = rendered[first]  && BitmapCache.get(rendered[first].bitmapId)
    const bmpB = rendered[second] && BitmapCache.get(rendered[second].bitmapId)

    if (bmpA && bmpB && orient(bmpA) !== orient(bmpB)) {
      pages = [first]
    }
  }

  /* ---------- Render ----------------------------------------------------- */
  return (
    <PDFCanvasViewer
      containerRef={containerRef}
      visiblePages={pages}
    />
  )
}
