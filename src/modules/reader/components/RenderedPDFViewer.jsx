/**
 * @file RenderedPDFViewer.jsx
 * @description Component that renders visible pages of a loaded PDF document using preloaded data.
 */

import { useCallback } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useLoadPDFDocument, usePreloadPDFPages } from '@reader/hooks'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

//--- Scrollable wrapper with dynamic width based on sidebar state
const ScrollWrapper = styled.div`
  width: ${({ $isSidebarOpen }) =>
    $isSidebarOpen ? 'calc(100vw - 20rem)' : '100vw'};
  height: calc(100vh - 17vh);
  overflow: auto;
  padding: 2rem;
  position: relative;
`

//--- Horizontal container for rendered pages
const PagesContainer = styled.div`
  display: flex;
  gap: 0.3rem;
  margin: 0 auto;
`

//--- Single PDF page image
const PDFPage = styled.img`
  object-fit: contain;
  margin: 1rem;
`

//-----------------------------------------------------------------------------
// Component: RenderedPDFViewer
//-----------------------------------------------------------------------------

/**
 * Renders preloaded PDF pages from visible range as images (data URLs).
 * Handles PDF loading lifecycle using custom hooks.
 *
 * @component
 * @returns {JSX.Element}
 */
const RenderedPDFViewer = () => {
  console.log('[RenderedPDFViewer] RenderedPDFViewer() called')

  //--- Get sidebar state from Redux
  const sidebarOpen = useSelector((s) => s.ui.sidebarOpen)

  //--- Custom hook: preload visible PDF pages
  const { pdfRef, preload, visiblePages, setPdfReady } = usePreloadPDFPages()

  //--- Set PDF as ready when document is fully loaded
  const handleLoaded = useCallback(() => setPdfReady(true), [setPdfReady])

  //--- Load PDF and trigger preload once it's available
  useLoadPDFDocument({ pdfRef, preload, onLoaded: handleLoaded })

  console.log(
    '[RenderedPDFViewer] visiblePages:',
    visiblePages.map((p) => p.pageNumber)
  )

  //--- Show loader if no pages are visible yet
  if (visiblePages.length === 0) {
    return <p>Loading…</p>
  }

  return (
    <ScrollWrapper $isSidebarOpen={sidebarOpen}>
      <PagesContainer>
        {visiblePages.map(({ id, dataUrl, pageNumber }) => (
          <PDFPage key={id} src={dataUrl} alt={`Page ${pageNumber}`} />
        ))}
      </PagesContainer>
    </ScrollWrapper>
  )
}

export default RenderedPDFViewer
