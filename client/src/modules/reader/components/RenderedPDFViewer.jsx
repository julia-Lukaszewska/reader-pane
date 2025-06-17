import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

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
  min-height: 100%;
  gap: 0.3rem;
`

const Canvas = styled.canvas`
  margin: 1rem;
  max-height: 100%;
  object-fit: contain;
  display: block;
`

export default function RenderedPDFViewer({
  containerRef,
  visiblePages = [],
  sidebarOpen = false,
}) {
  const wrapperRef = containerRef || useRef()
  const pageRefs = useRef({})

  useEffect(() => {
    visiblePages.forEach(({ pageNumber, bitmap, width, height }) => {
      const canvas = pageRefs.current[pageNumber]
      if (!canvas || !bitmap) return

      canvas.width = width
      canvas.height = height
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      const ctx = canvas.getContext('2d')
      ctx.drawImage(bitmap, 0, 0)

      // optional: bitmap.close()
    })
  }, [visiblePages])

  return (
    <ScrollWrapper $isSidebarOpen={sidebarOpen} ref={wrapperRef}>
      <PagesContainer>
        {visiblePages.map(({ pageNumber, width, height }) => (
          <Canvas
            key={pageNumber}
            data-page={pageNumber}
            ref={(el) => (pageRefs.current[pageNumber] = el)}
            style={{ width: `${width}px`, height: `${height}px` }}
          />
        ))}
      </PagesContainer>
    </ScrollWrapper>
  )
}
