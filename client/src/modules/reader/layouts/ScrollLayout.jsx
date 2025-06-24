import React from 'react'
import { useSelector } from 'react-redux'
import { PDFCanvasViewer } from '../components'
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
    <PDFCanvasViewer
      containerRef={containerRef}
      visiblePages={visible}
      direction="column"
    />
  )
}
