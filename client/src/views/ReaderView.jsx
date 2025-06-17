/**
 * @file ReaderView.jsx
 * @description
 * Renders the PDF reader view container and delegates page rendering to RenderedPDFViewer.
 */
import React from 'react'
import styled from 'styled-components'
import RenderedPDFViewer from '@reader/components/RenderedPDFViewer'

//-----------------------------------------------------
//------ Styled Components
//-----------------------------------------------------
const StyledReaderView = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: var(--bg-default);
`

//-----------------------------------------------------
//------ ReaderView Component
//-----------------------------------------------------
/**
 * @component ReaderView
 * @description
 * Container for the PDF reader; renders visible pages via RenderedPDFViewer.
 * @param {object} props
 * @param {React.RefObject} props.pdfRef           - Ref to attach to the scrollable container
 * @param {Array<{pageNumber:number,url:string,width:number,height:number}>} props.visiblePages
 *                                                  - Pages to render
 * @returns {JSX.Element}
 */
const ReaderView = ({ pdfRef, visiblePages }) => (
  <StyledReaderView ref={pdfRef}>
    <RenderedPDFViewer
      pdfRef={pdfRef}
      visiblePages={visiblePages}
    />
  </StyledReaderView>
)

export default React.memo(ReaderView)
