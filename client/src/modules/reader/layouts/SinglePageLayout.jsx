import React from 'react'
import { useSelector } from 'react-redux'
import { PDFCanvasViewer } from '../components'
import { selectVisiblePagesByMode } from '@/store/selectors/readerSelectors'


/**
 * SinglePageLayout
 * ----------------
 * Renderuje wyłącznie pierwszą stronę z listy visiblePagesByMode
 * (w trybie 'single' to dokładnie bieżąca strona).
 */
export default function SinglePageLayout({ containerRef }) {
  const visible = useSelector(selectVisiblePagesByMode)
  const pages   = visible.length ? [visible[0]] : []

  return (
    <PDFCanvasViewer
      containerRef={containerRef}
      visiblePages={pages}
    />
  )
}
