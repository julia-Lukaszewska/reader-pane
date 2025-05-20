
import { useCallback } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useLoadPDFDocument, usePreloadPDFPages } from '@reader/hooks'

//-----------------------------------------------------------------------------
// Styled components
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
  gap: 0.3rem;
  margin: 0 auto;
`

const PDFPage = styled.img`
  object-fit: contain;
  margin: 1rem;
`

//-----------------------------------------------------------------------------
// Component: RenderedPDFViewer 
//-----------------------------------------------------------------------------
const RenderedPDFViewer = () => {
  const sidebarOpen = useSelector((s) => s.ui.sidebarOpen)

  // hooks to load the PDF, preload pages and return visible ones
  const { pdfRef, preload, visiblePages, setPdfReady } = usePreloadPDFPages()

  const handleLoaded = useCallback(() => setPdfReady(true), [setPdfReady])
  useLoadPDFDocument({ pdfRef, preload, onLoaded: handleLoaded })

  console.log(
    '[RenderedPDFViewer] visiblePages:',
    visiblePages.map((p) => p.pageNumber)
  )

  // show loader if no pages are ready yet
  if (visiblePages.length === 0) {
    return <p>Loading…</p>
  }

  return (
    <ScrollWrapper $isSidebarOpen={sidebarOpen}>
      <PagesContainer>
        {visiblePages.map(({ pageNumber, dataUrl, width }) => (
          <PDFPage
            key={`${pageNumber}-${width}`}
            src={dataUrl}
            alt={`Page ${pageNumber}`}
          />
        ))}
      </PagesContainer>
    </ScrollWrapper>
  )
}

export default RenderedPDFViewer
