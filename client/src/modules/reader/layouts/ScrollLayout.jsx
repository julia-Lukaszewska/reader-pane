import React from 'react'
import RenderedPDFViewer from '../components/RenderedPDFViewer'

/**
 * Vertical scrolling layout for multiple pages.
 */
export default function ScrollLayout({ containerRef, visiblePages = [] }) {
  return (
    <RenderedPDFViewer
      containerRef={containerRef}
      visiblePages={visiblePages}
      direction="column"
    />
  )
}