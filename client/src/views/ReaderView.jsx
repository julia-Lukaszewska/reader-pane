import React, { useRef } from 'react'
import styled from 'styled-components'
import ReaderSessionController from '@/controllers/ReaderSessionController'
import RenderedPDFViewer from '@reader/components/RenderedPDFViewer'

const StyledReaderView = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100%;
  width: 100%;
  background: var(--bg-default);
`

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
