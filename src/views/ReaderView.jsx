// ReaderView.jsx
import React from 'react'
import styled from 'styled-components'
import {RenderedPDFViewer} from '@/modules/reader'
import useLastOpenedBook from '@reader/hooks/useLastOpenedBook'

const StyledReaderView = styled.div`

  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: var(--bg-default);
`

export default function ReaderView() {
  
   
 useLastOpenedBook() 

  return (
    <StyledReaderView>
      <RenderedPDFViewer  />
    </StyledReaderView>
  )
}
