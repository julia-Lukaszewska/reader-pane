import React from 'react'
import { useSelector } from 'react-redux'
import { PDFCanvasViewer } from '../components'
import styled from 'styled-components'
import { selectVisiblePagesByMode } from '@/store/selectors/readerSelectors'

/**
 * “Scroll” mode – classic vertical continuous scrolling.
 */

const Canvas = styled(PDFCanvasViewer)`
  overflow: auto;
`
export default function ScrollLayout({ containerRef }) {
  const visiblePages = useSelector(selectVisiblePagesByMode)

  return (
    <Canvas
      containerRef={containerRef}
      visiblePages={visiblePages}
      direction="column"
    />
  )
}
