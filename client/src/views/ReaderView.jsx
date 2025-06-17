// ReaderView.jsx
import React from 'react'
import styled from 'styled-components'
import RenderedPDFViewer from '@reader/components/RenderedPDFViewer'

const StyledReaderView = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: var(--bg-default);
`

const ReaderView = ({ pdfRef, visiblePages }) => (
  <StyledReaderView ref={pdfRef}>
    <RenderedPDFViewer
      pdfRef={pdfRef}
      visiblePages={visiblePages}
    />
  </StyledReaderView>
)

export default ReaderView
