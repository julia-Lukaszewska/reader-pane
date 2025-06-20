import React from 'react'
import RenderedPDFViewer from '../components/RenderedPDFViewer'

/**
 * Layout for displaying a single PDF page.
 * Simply forwards the first visible page to RenderedPDFViewer.
 */
export default function SinglePageLayout({ containerRef, visiblePages = [], metadata }) {
  const page = visiblePages.length > 0 ? [visiblePages[0]] : []
  return <RenderedPDFViewer containerRef={containerRef} visiblePages={page} />
}