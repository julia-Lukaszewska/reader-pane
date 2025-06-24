import React from 'react'
import { useSelector } from 'react-redux'
import { PDFCanvasViewer } from '../components'

import { selectVisiblePagesByMode } from '@/store/selectors/readerSelectors'

/**
 * “Scroll” mode – classic vertical continuous scrolling.
 */
export default function ScrollLayout({ containerRef }) {
  const visiblePages = useSelector(selectVisiblePagesByMode)

  return (
    <PDFCanvasViewer
      containerRef={containerRef}
      visiblePages={visiblePages}
      direction="column"
    />
  )
}
