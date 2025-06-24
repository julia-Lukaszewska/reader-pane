import React from 'react'
import { useSelector } from 'react-redux'
import RenderedPDFViewer from '@reader/components/RenderedPDFViewer'
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
    <RenderedPDFViewer
      containerRef={containerRef}
      visiblePages={pages}
    />
  )
}
