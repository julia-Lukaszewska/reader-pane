/**
 * @file RenderedPDFViewer.jsx
 * @description
 * Renders PDF pages onto canvas elements:
 * - Uses a streaming PDF manager’s `visiblePages` array
 * - Always calls hooks in the same order
 * - No visible UI outside the canvases
 */
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

//-----------------------------------------------------
//------ Styled Components
//-----------------------------------------------------

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

//-----------------------------------------------------
//------ RenderedPDFViewer Component
//-----------------------------------------------------

/**
 * @component RenderedPDFViewer
 * @description Draws each PDF page image into a canvas element.
 * @param {Object} props
 * @param {React.RefObject} props.pdfRef               - Optional wrapper ref for scroll container
 * @param {Array<{pageNumber: number, url: string, width: number, height: number}>} props.visiblePages
 *   Pages to render, each with a URL and dimensions
 * @param {boolean} props.sidebarOpen                  - Whether the sidebar is open (adjusts width)
 * @returns {React.ReactNode|null}
 */
export default function RenderedPDFViewer({
  pdfRef,
  visiblePages = [],
  sidebarOpen = false,
}) {
  // always call hooks in the same order
  const localWrapperRef = useRef()
  const wrapperRef = pdfRef || localWrapperRef
  const pageRefs = useRef({})

  //-----------------------------------------------------
  //------ Draw Pages on Canvas
  //-----------------------------------------------------
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
        console.error(`[RenderedPDFViewer] Error loading page ${pageNumber}`, e)
      }

      img.src = url
    })
  }, [visiblePages])

  //-----------------------------------------------------
  //------ Render
  //-----------------------------------------------------
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
