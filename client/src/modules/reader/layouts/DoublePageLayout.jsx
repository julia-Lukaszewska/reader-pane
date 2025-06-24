/**
 * @file src/views/reader/layouts/DoublePageLayout.jsx
 * @description
 * Double-page layout for the PDF reader.
 *
 * Behaviour
 * ----------
 * • Tries to show the first two visible pages (from Redux)
 * • Falls back to a single page when the two bitmaps have
 *   different orientation (portrait vs. landscape).
 */

import React from 'react'
import { useSelector } from 'react-redux'
import { PDFCanvasViewer } from '../components'

import {
  selectVisiblePagesByMode,
} from '@/store/selectors/readerSelectors'

import {
  selectRenderedPages,
  selectStreamScale,
} from '@/store/selectors/streamSelectors'
import { BitmapCache } from '@reader/utils/bitmapCache'

const orient = (bmp) =>
  bmp && bmp.width >= bmp.height ? 'landscape' : 'portrait'

/**
 * DoublePageLayout component
 *
 * @param {object}   props
 * @param {React.Ref} props.containerRef – ref przekazywany dalej do viewer-a
 */
export default function DoublePageLayout({ containerRef }) {
  const visiblePages = useSelector(selectVisiblePagesByMode)
  const [first, second] = visiblePages

  const scaleKey = String(useSelector(selectStreamScale))
  const rendered = useSelector(selectRenderedPages)[scaleKey] ?? {}

  let pages = second ? [first, second] : first ? [first] : []

  if (first && second) {
    const bmpA = rendered[first]  && BitmapCache.get(rendered[first].bitmapId)
    const bmpB = rendered[second] && BitmapCache.get(rendered[second].bitmapId)

    if (bmpA && bmpB && orient(bmpA) !== orient(bmpB)) {
      pages = [first]
    }
  }

  return (
    <PDFCanvasViewer
      containerRef={containerRef}
      visiblePages={pages}
    />
  )
}
