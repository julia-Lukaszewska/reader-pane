/**
 * @file RenderedPDFViewer.jsx
 * @description
 * Displays rendered PDF pages as <canvas> elements inside a scrollable container.
 * Handles image bitmap drawing and adjusts layout based on sidebar state.
 */

import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------

const ScrollWrapper = styled.div`
  width: ${({ $isSidebarOpen }) =>
    $isSidebarOpen ? 'calc(100vw - 20rem)' : '100vw'};
  height: calc(100vh - 17vh);
  overflow: auto;
  padding: 2rem;
  position: relative;
`

const PagesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${({ $direction }) => $direction};
  min-height: 100%;
  gap: 0.3rem;
`

const Canvas = styled.canvas`
  margin: 1rem;
  max-height: 100%;
  object-fit: contain;
  display: block;
`

//-----------------------------------------------------------------------------
// Component: RenderedPDFViewer
//-----------------------------------------------------------------------------

/**
 * Displays a list of visible PDF pages using canvas.
 * Draws image bitmaps onto canvas elements when visiblePages change.
 *
 * @param {Object} props
 * @param {React.RefObject} props.containerRef – Optional external container ref
 * @param {Array<Object>} props.visiblePages – Array of { pageNumber, bitmap, width, height }
 * @param {boolean} props.sidebarOpen – Whether the sidebar is open (affects layout)
 * @returns {JSX.Element}
 */
export default function RenderedPDFViewer({
  containerRef,
  visiblePages = [],
  sidebarOpen = false,
  direction = 'row',
}) {
  const internalRef = useRef()
  const wrapperRef = containerRef ?? internalRef
  const pageRefs = useRef({})

  useEffect(() => {
    visiblePages.forEach(({ pageNumber, bitmap }) => {
      const canvas = pageRefs.current[pageNumber]
      if (!canvas || !bitmap) return

      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(bitmap, 0, 0)
    })
  }, [visiblePages])

  return (
    <ScrollWrapper $isSidebarOpen={sidebarOpen} ref={wrapperRef}>
      <PagesContainer $direction={direction}>
        {visiblePages.map(({ pageNumber, width, height }) => (
          <Canvas
            key={`${pageNumber}-${width}x${height}`}
            data-page={pageNumber}
            ref={(el) => (pageRefs.current[pageNumber] = el)}
            width={width}
            height={height}
          />
        ))}
      </PagesContainer>
    </ScrollWrapper>
  )
}
