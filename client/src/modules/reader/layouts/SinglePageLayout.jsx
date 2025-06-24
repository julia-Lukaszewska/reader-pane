import React from 'react'
import { useSelector } from 'react-redux'
import { PDFCanvasViewer } from '../components'

import { selectVisiblePagesByMode } from '@/store/selectors/readerSelectors'

/**
 * “Single” mode – renders only the first page from the visiblePages array.
 */
export default function SinglePageLayout({ containerRef }) {
  const visiblePages = useSelector(selectVisiblePagesByMode)
  const pages = visiblePages.length ? [visiblePages[0]] : []

  return (
    <PDFCanvasViewer
      containerRef={containerRef}
      visiblePages={pages}
    />
  )
}
