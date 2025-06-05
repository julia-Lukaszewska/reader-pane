// -----------------------------------------------------------------------------
// RenderedPDFViewer – displays PDF pages from preload
// -----------------------------------------------------------------------------

/**
 * @file RenderedPDFViewer.jsx
 * @description
 * Component that renders visible pages of a loaded PDF document using preloaded data.
 * Supports single and double page view modes and auto-scrolls to the current page.
 */

import { useCallback, useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import {
  useLoadPDFDocument,
  usePreloadPDFPages,
} from '@reader/hooks'
import {
  selectCurrentPage,
  selectPageViewMode,
  selectBookStaticById,
} from '@/store/selectors/selectors'

// -----------------------------------------------------------------------------
// Styled Components
// -----------------------------------------------------------------------------

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

const PDFPage = styled.img`
  object-fit: contain;
  margin: 1rem;
  max-height: 100%;
`

// -----------------------------------------------------------------------------
// Component: RenderedPDFViewer
// -----------------------------------------------------------------------------

const RenderedPDFViewer = () => {
  console.log('[RenderedPDFViewer] RenderedPDFViewer() called')

  const sidebarOpen = useSelector((s) => s.ui.sidebarOpen)

  const rawCurrentPage = useSelector(selectCurrentPage)
  const currentPage =
    Number.isFinite(rawCurrentPage) && rawCurrentPage > 0 ? rawCurrentPage : 1

  const viewMode = useSelector(selectPageViewMode)

  const bookId = useSelector(state => state.book.activeBookId)
  const selectStaticBook = useMemo(
    () => selectBookStaticById(bookId),
    [bookId]
  )
  const staticBook = useSelector(selectStaticBook)

  const totalPages = staticBook?.meta?.totalPages ?? 0

  const { pdfRef, preload, visiblePages, setPdfReady } = usePreloadPDFPages()

 const handleLoaded = useCallback((pdf) => {
  console.log('[RenderedPDFViewer] handleLoaded called', pdf)

  const pages = totalPages || pdf?.numPages || 0
  console.log('[RenderedPDFViewer] handleLoaded pages:', pages)

  if (pages > 0 && currentPage > 0) {
    console.log('[RenderedPDFViewer] Setting pdfReady to true')
    setPdfReady(true)
  } else {
    console.log('[RenderedPDFViewer] Waiting: pages/currentPage', {
      pages,
      currentPage,
    })
  }
}, [totalPages, currentPage, setPdfReady])


console.log('[RenderedPDFViewer] bookId from store:', bookId)

useLoadPDFDocument({ pdfRef, onLoaded: handleLoaded })


  const pageRefs = useRef({})
  useEffect(() => {
    const el = pageRefs.current[currentPage]
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [currentPage, visiblePages])

  let pagesToRender = []

  if (viewMode === 'single') {
    pagesToRender = visiblePages.filter(p => p.pageNumber === currentPage)
  } else {
    pagesToRender = visiblePages.filter(
      p => p.pageNumber === currentPage || p.pageNumber === currentPage + 1
    )
  }

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
