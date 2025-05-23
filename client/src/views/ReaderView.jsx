// -----------------------------------------------------------------------------
//------ ReaderView – displays PDF reader interface
//-----------------------------------------------------------------------------

/**
 * @file ReaderView.jsx
 * @description Renders the PDF reader view using RenderedPDFViewer component.
 */
import React from 'react'
import styled from 'styled-components'
import { RenderedPDFViewer } from '@/modules/reader'

// -----------------------------------------------------------------------------
//------ Styled components for ReaderView
//-----------------------------------------------------------------------------

const StyledReaderView = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%; 
  background: var(--bg-default);
`

// -----------------------------------------------------------------------------
//------ Component: ReaderView
//-----------------------------------------------------------------------------

/**
 * Displays the PDF viewer within a styled container.
 */
const ReaderView = () => {
  return (
    <StyledReaderView>
      <RenderedPDFViewer />
    </StyledReaderView>
  )
}

export default ReaderView
