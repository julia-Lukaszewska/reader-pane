/**
 * @file ReaderView.jsx
 * @description Renders the PDF reader view using RenderedPDFViewer component.
 */

//-----------------------------------------------------
//------ ReaderView – displays PDF reader interface
//-----------------------------------------------------

import React from 'react'
import styled from 'styled-components'
import { RenderedPDFViewer } from '@/modules/reader'

//-----------------------------------------------------
//------ Styled Components
//-----------------------------------------------------

//------ StyledReaderView
//-----------------------------------------------------
const StyledReaderView = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%; 
  z-index: 9000;
  background: var(--bg-default);
`

//-----------------------------------------------------
//------ Component
//-----------------------------------------------------

/**
 * @function ReaderView
 * @description Displays the PDF viewer within a styled container.
 *
 * @returns {JSX.Element}
 */
const ReaderView = () => {
  return (
    <StyledReaderView>
      <RenderedPDFViewer />
    </StyledReaderView>
  )
}

export default ReaderView
