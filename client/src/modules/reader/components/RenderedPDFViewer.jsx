// -----------------------------------------------------------------------------
//------ RenderedPDFViewer – displays PDF pages from preload
//-----------------------------------------------------------------------------

/**
 * @file RenderedPDFViewer.jsx
 * @description
 * Component that renders visible pages of a loaded PDF document using preloaded data.
 * Supports single and double page view modes and auto-scrolls to the current page.
 */

import { useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import {
  useLoadPDFDocument,
  usePreloadPDFPages,
} from '@reader/hooks'
import {
  selectCurrentPage,
  selectPageViewMode,
} from '@/store/selectors/selectors'

// -----------------------------------------------------------------------------
//------ Styled Components
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

//--- Centered horizontal container for one or two pages
const PagesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  gap: 0.3rem;
`

//--- Single PDF page image
const PDFPage = styled.img`
  object-fit: contain;
  margin: 1rem;
  max-height: 100%;
`

// -----------------------------------------------------------------------------
//------ Component: RenderedPDFViewer
//-----------------------------------------------------------------------------

/**
 * Renders preloaded PDF pages from the visible range as images (data URLs).
 * Handles PDF loading lifecycle, scrolls to the current page,
 * and centers pages depending on the view mode.
 *
 * @component
 * @returns {JSX.Element}
 */
const RenderedPDFViewer = () => {
  console.log('[RenderedPDFViewer] RenderedPDFViewer() called')

  //--- Redux state
  const sidebarOpen = useSelector((s) => s.ui.sidebarOpen)
  const currentPage = useSelector(selectCurrentPage)
  const viewMode = useSelector(selectPageViewMode)

  //--- Hooks: preload logic
  const { pdfRef, preload, visiblePages, setPdfReady } = usePreloadPDFPages()

  //--- Load PDF and trigger preload once it's available
  const handleLoaded = useCallback(() => setPdfReady(true), [setPdfReady])
  useLoadPDFDocument({ pdfRef, preload, onLoaded: handleLoaded })

  //--- Refs for scroll-to-page
  const pageRefs = useRef({})

  useEffect(() => {
    const el = pageRefs.current[currentPage]
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [currentPage, visiblePages])

  //--- Determine pages to render based on viewMode
  let pagesToRender = []

  if (viewMode === 'single') {
    pagesToRender = visiblePages.filter(p => p.pageNumber === currentPage)
  } else {
    pagesToRender = visiblePages.filter(
      p => p.pageNumber === currentPage || p.pageNumber === currentPage + 1
    )
  }

  //--- Show loader if no pages are ready yet
  if (pagesToRender.length === 0) {
    return <p>Loading…</p>
  }

  return (
    <ScrollWrapper $isSidebarOpen={sidebarOpen}>
      <PagesContainer>
        {pagesToRender.map(({ id, dataUrl, pageNumber }) => (
          <PDFPage
            key={id}
            src={dataUrl}
            alt={`Page ${pageNumber}`}
            ref={(el) => (pageRefs.current[pageNumber] = el)}
          />
        ))}
      </PagesContainer>
    </ScrollWrapper>
  )
}

export default RenderedPDFViewer
