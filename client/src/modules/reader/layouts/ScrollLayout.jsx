import React from 'react'
import { useSelector } from 'react-redux'
import RenderedPDFViewer from '@reader/components/RenderedPDFViewer'
import { selectVisiblePagesByMode } from '@/store/selectors/readerSelectors'

/**
 * ScrollLayout
 * ------------
 * Klasyczny tryb „continuous scroll”.
 * Przekazuje pełną listę widocznych stron w układzie kolumnowym.
 */
export default function ScrollLayout({ containerRef }) {
  const visible = useSelector(selectVisiblePagesByMode)

  return (
    <RenderedPDFViewer
      containerRef={containerRef}
      visiblePages={visible}
      direction="column"
    />
  )
}
