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
  z-index: 10000;
  width: 100%;
  height: auto;
  display: block;
`

export default function RenderedPDFViewer({
  pdfRef,
  fileUrl,
  visiblePages = [],
  currentPage,
  sidebarOpen = false,
}) {
  const wrapperRef = pdfRef || useRef()
  const pageRefs = useRef({})

  useEffect(() => {
    visiblePages.forEach(({ pageNumber, url, width, height }) => {
      const canvas = pageRefs.current[pageNumber]
      if (!canvas || !url) return

      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0)
      }

      img.onerror = (e) => {
        console.error(`[❌ error img ${pageNumber}]`, e)
      }

      img.src = url
    })
  }, [visiblePages])

  return (
    <ScrollWrapper $isSidebarOpen={sidebarOpen} ref={wrapperRef}>
      <PagesContainer>
        {visiblePages.map(({ pageNumber }) => (
          <Canvas
            key={pageNumber}
            data-page={pageNumber}
            ref={(el) => (pageRefs.current[pageNumber] = el)}
          />
        ))}
      </PagesContainer>
    </ScrollWrapper>
  )
}
