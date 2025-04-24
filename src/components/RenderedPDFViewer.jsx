//-----------------------------------------------------------------------------
//------ RenderedPDFViewer: Display rendered PDF pages  
//-----------------------------------------------------------------------------

import { useContext } from 'react'
import styled from 'styled-components'
import { AppContext } from '../context/AppContext'
import { usePreloadPDFPages } from '../hooks/usePreloadPDFPages'

//-----------------------------------------------------------------------------
//------ Styled component: Scroll wrapper  
//-----------------------------------------------------------------------------
const ScrollWrapper = styled.div`
  width: ${({ $isSidebarOpen }) =>
    $isSidebarOpen ? 'calc(100vw - 20rem)' : '100vw'};
  height: calc(100vh - 17vh);

  flex-direction: row;
  overflow: auto;
  display: block;
  padding: 2rem;
  overflow: auto;
  position: relative;

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #999;
  }

  &::-webkit-scrollbar-track {
    background-color: #eee;
  }
`

//-----------------------------------------------------------------------------
//------ Styled component: Pages container  
//-----------------------------------------------------------------------------
const PagesContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  width: max-content;  

  margin: 0 auto;  

  gap: 0.3rem;
  padding: 0;

  overflow: visible;
  z-index: 2000;
`

//-----------------------------------------------------------------------------
//------ Styled component: Proporcjonalna strona PDF  
//-----------------------------------------------------------------------------
const PDFPage = styled.img`
  display: block;
  object-fit: contain;
  margin: 1rem;
  flex-shrink: 0;
  width: auto;
  height: auto;
`

export default function RenderedPDFViewer() {
  const { state } = useContext(AppContext)

  const { renderedPages, currentPage, viewMode, scaleLevels, scaleIndex } =
    state

  const scale = scaleLevels?.[scaleIndex] ?? 1.0

  usePreloadPDFPages() // Trigger preload logic  

  const pages = renderedPages[scale] || {}
  const left = pages[currentPage]
  const right = viewMode === 'double' ? pages[currentPage + 1] : null

  if (!left) {
    console.log('Waiting for page render:', currentPage)
    return <p> Loading Page {currentPage}...</p>
  }

  return (
    <ScrollWrapper>
      <PagesContainer>
        <PDFPage
          src={left.dataUrl}
          alt={`Page ${currentPage}`} // Alt for accessibility  
        />
        {right && (
          <PDFPage src={right.dataUrl} alt={`Page ${currentPage + 1}`} />
        )}
      </PagesContainer>
    </ScrollWrapper>
  )
}
