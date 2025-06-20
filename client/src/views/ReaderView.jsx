/**
 * @file ReaderView.jsx
 * @description
 * Wraps the reader content area. Connects session controller to the PDF viewer.
 * Uses styled layout and forwards containerRef to manage visible area.
 */

import React, { useRef } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { SinglePageLayout, DoublePageLayout } from '@reader/layouts'
import { usePdfMetadata } from '@reader/hooks'
import ReaderSessionController from '@/controllers/ReaderSessionController'
import RenderedPDFViewer from '@reader/components/RenderedPDFViewer'
import { selectPageViewMode, selectFileUrl, selectActiveBookId } from '@/store/selectors'
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------

const StyledReaderView = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100%;
  width: 100%;
  background: var(--bg-default);
`

//-----------------------------------------------------------------------------
// Component: ReaderView
//-----------------------------------------------------------------------------

/**
 * Main viewer container for rendering the PDF pages.
 * Provides a containerRef for measuring viewport bounds
 * and consumes visiblePages from ReaderSessionController.
 *
 * @component
 * @returns {JSX.Element}
 */
const ReaderView = () => {
  const containerRef = useRef(null)
  const viewMode = useSelector(selectPageViewMode)
  const fileUrl = useSelector(selectFileUrl)
  const bookId = useSelector(selectActiveBookId)

  const filename = fileUrl ? decodeURIComponent(fileUrl.split('/').pop()) : null
  const metadata = usePdfMetadata(bookId, filename)
  
  return (
    <StyledReaderView ref={containerRef}>
      <ReaderSessionController>
       {({ containerRef, visiblePages }) => {
          const Layout = viewMode === 'double' ? DoublePageLayout : SinglePageLayout
          return (
            <Layout
              containerRef={containerRef}
              visiblePages={visiblePages}
              metadata={metadata}
            />
          )
        }}
      </ReaderSessionController>
    </StyledReaderView>
  )
}

export default ReaderView
