/**
 * @file ReaderView.jsx
 * @description
 * Wraps the reader content area. Connects session controller to the PDF viewer.
 * Uses styled layout and forwards containerRef to manage visible area.
 */

import React, { useRef } from 'react'
import styled from 'styled-components'
import ReaderSessionController from '@/controllers/ReaderSessionController'
import RenderedPDFViewer from '@reader/components/RenderedPDFViewer'

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

  return (
    <StyledReaderView ref={containerRef}>
      <ReaderSessionController>
        {({ containerRef, visiblePages }) => (
          <RenderedPDFViewer
            containerRef={containerRef}
            visiblePages={visiblePages}
          />
        )}
      </ReaderSessionController>
    </StyledReaderView>
  )
}

export default ReaderView
