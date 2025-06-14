// -----------------------------------------------------------------------------
// RenderedPDFViewer – displays PDF pages from preload
// -----------------------------------------------------------------------------

/**
 * @file RenderedPDFViewer.jsx
 * @description
 * Component that renders visible pages of a loaded PDF document using preloaded data.
 * Supports single and double page view modes and auto-scrolls to the current page.
 */

import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import {
  useLoadPDFDocument,
  usePreloadPDFPages,
} from '@reader/hooks'
import {
  selectCurrentPage,
  selectPageViewMode,
  selectBookById,
} from '@/store/selectors'

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
  z-index: 10000;
`

// -----------------------------------------------------------------------------
// Component: RenderedPDFViewer
// -----------------------------------------------------------------------------

export default function RenderedPDFViewer() {
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen)
  const rawCurrentPage = useSelector(selectCurrentPage)
  const currentPage =
    Number.isFinite(rawCurrentPage) && rawCurrentPage > 0
      ? rawCurrentPage
      : 1

  const viewMode = useSelector(selectPageViewMode)
  const bookId = useSelector((state) => state.book.activeBookId)
  const selectBook = useMemo(() => selectBookById(bookId), [bookId])
  const staticBook = useSelector(selectBook)
  const totalPages = staticBook?.meta?.totalPages || 0

  // Preload hook
  const { pdfRef, visiblePages, setPdfReady } = usePreloadPDFPages()

  // Handle initial load
  const handleLoaded = useCallback(
    (pdf) => {
    const pages = totalPages || pdf?.numPages || 0
    if (!totalPages && pdf?.numPages && staticBook?.meta) {
      // tu staticBook istnieje, więc dopiero wtedy zapisujemy
      staticBook.meta.totalPages = pdf.numPages
    }
      if (pages > 0 && currentPage > 0) {
        setPdfReady(true)
      }
    },
    [totalPages, currentPage, setPdfReady, staticBook]
  )

 useLoadPDFDocument({ pdfRef, book: staticBook, onLoaded: handleLoaded })

  // Auto-scroll to current page
  const pageRefs = useRef({})
  useEffect(() => {
    const el = pageRefs.current[currentPage]
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [currentPage, visiblePages])

  // Determine pages to render
  const pagesToRender = useMemo(() => {
    if (viewMode === 'single') {
      return visiblePages.filter((p) => p.pageNumber === currentPage)
    }
    return visiblePages.filter(
      (p) =>
        p.pageNumber === currentPage || p.pageNumber === currentPage + 1
    )
  }, [viewMode, visiblePages, currentPage])

  // Revoke unused Blob URLs
  const seenUrls = useRef(new Set())
  useEffect(() => {
    // Revoke URLs no longer used
    seenUrls.current.forEach((url) => {
      if (!pagesToRender.some((p) => p.blobUrl === url)) {
        URL.revokeObjectURL(url)
        seenUrls.current.delete(url)
      }
    })
    // Track new URLs
    pagesToRender.forEach((p) => seenUrls.current.add(p.blobUrl))

    return () => {
      seenUrls.current.forEach((url) => URL.revokeObjectURL(url))
      seenUrls.current.clear()
    }
  }, [pagesToRender])

  // Show loading if no pages ready
  if (pagesToRender.length === 0) {
    return <p>Loading…</p>
  }

  return (
    <ScrollWrapper $isSidebarOpen={sidebarOpen} ref={pdfRef}>
      <PagesContainer>
        {pagesToRender.map(({ id, blobUrl, pageNumber }) => (
          <PDFPage
            key={id}
            src={blobUrl}
            alt={`Page ${pageNumber}`}
            ref={(el) => (pageRefs.current[pageNumber] = el)}
          />
        ))}
      </PagesContainer>
    </ScrollWrapper>
  )
}
