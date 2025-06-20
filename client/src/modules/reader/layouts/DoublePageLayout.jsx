import React from 'react'
import RenderedPDFViewer from '../components/RenderedPDFViewer'

function getOrientation(meta) {
  if (!meta) return 'portrait'
  return meta.width >= meta.height ? 'landscape' : 'portrait'
}

/**
 * Layout for displaying two pages side by side.
 * If the orientations of the two pages differ, fallback to single page.
 */
export default function DoublePageLayout({ containerRef, visiblePages = [], metadata }) {
  let pages = visiblePages

  if (visiblePages.length === 2 && Array.isArray(metadata)) {
    const [a, b] = visiblePages
    const metaA = metadata[a.pageNumber - 1]
    const metaB = metadata[b.pageNumber - 1]
    if (metaA && metaB && getOrientation(metaA) !== getOrientation(metaB)) {
      pages = [a] // mismatch orientation -> show only first page
    }
  }

  return <RenderedPDFViewer containerRef={containerRef} visiblePages={pages} />
}