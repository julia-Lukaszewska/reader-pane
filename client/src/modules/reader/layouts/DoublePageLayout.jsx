import React from 'react'
import { useSelector } from 'react-redux'
import RenderedPDFViewer from '@reader/components/RenderedPDFViewer'
import {
  selectVisiblePagesByMode,
  selectCurrentPage,
  selectTotalPages,
} from '@/store/selectors/readerSelectors'
import {
  selectRenderedPages,
  selectStreamScale,
} from '@/store/selectors/streamSelectors'
import { BitmapCache } from '@reader/utils/bitmapCache'

/* helper: portrait / landscape */
const orient = (bmp) =>
  bmp && bmp.width >= bmp.height ? 'landscape' : 'portrait'

/**
 * DoublePageLayout
 * ----------------
 * Pokazuje dwie sąsiadujące strony obok siebie.
 * Gdy bitmapy mają różną orientację – wraca do pojedynczej.
 */
export default function DoublePageLayout({ containerRef }) {
  const visible = useSelector(selectVisiblePagesByMode)     // [1,2,…]
  const scale   = String(useSelector(selectStreamScale))
  const rendered= useSelector(selectRenderedPages)[scale] ?? {}

  /* — wybór max dwóch stron — */
  let pages = visible.slice(0, 2)

  if (pages.length === 2) {
    const [a, b] = pages
    const bmpA   = rendered[a] && BitmapCache.get(rendered[a].bitmapId)
    const bmpB   = rendered[b] && BitmapCache.get(rendered[b].bitmapId)

    if (orient(bmpA) !== orient(bmpB)) {
      pages = [a]               // inna orientacja ⇒ tylko pierwsza
    }
  }

  return (
    <RenderedPDFViewer
      containerRef={containerRef}
      visiblePages={pages}
    />
  )
}
