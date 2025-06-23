

/**
 * Wraps reader content; pulls bitmap‑enriched visiblePages via selectors.
 */
import React, { useRef } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { SinglePageLayout, DoublePageLayout } from '@reader/layouts'
import RenderedPDFViewer from '@reader/components/RenderedPDFViewer'
import ReaderSessionController from '@/controllers/ReaderSessionController'

import { selectPageViewMode } from '@/store/selectors/readerSelectors'
import { selectVisibleBitmapPages } from '@/store/selectors/streamSelectors'
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
export default function ReaderView() {
  const containerRef = useRef(null)

  const viewMode     = useSelector(selectPageViewMode)


  const visiblePages = useSelector(selectVisibleBitmapPages)

  const Layout = viewMode === 'double' ? DoublePageLayout : SinglePageLayout

  return (
    <Wrapper ref={containerRef}>
   
      <ReaderSessionController containerRef={containerRef}>
        {() => (
          <Layout containerRef={containerRef} visiblePages={visiblePages}>
            <RenderedPDFViewer
              containerRef={containerRef}
              visiblePages={visiblePages}
              sidebarOpen={false}
            />
          </Layout>
        )}
      </ReaderSessionController>
    </Wrapper>
  )
}