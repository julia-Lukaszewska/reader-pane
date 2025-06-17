/**
 * @file ReaderLayout.jsx
 * @description
 * Layout component for the reader view:
 * - Wraps content in a flex column container
 * - Uses ReaderSessionController to manage PDF session
 * - Renders ReaderToolbar and ReaderView once ready
 */
import React from 'react'
import styled from 'styled-components'

//-----------------------------------------------------
//------ Controllers
//-----------------------------------------------------
import ReaderSessionController from '@/controllers/ReaderSessionController'

//-----------------------------------------------------
//------ UI Components
//-----------------------------------------------------
import { ReaderToolbar } from '@reader/ReaderToolbar'
import ReaderView from '@/views/ReaderView'

//-----------------------------------------------------
//------ Styled Components
//-----------------------------------------------------
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

//-----------------------------------------------------
//------ ReaderLayout Component
//-----------------------------------------------------
/**
 * @component ReaderLayout
 * @description
 * Orchestrates the reader page layout:
 * - Initializes PDF session
 * - Renders toolbar and view with session props
 * @returns {JSX.Element}
 */
const ReaderLayout = () => (
  <Container>
    <ReaderSessionController>
      {({ pdfRef, visiblePages }) => (
        <>
          <ReaderToolbar
            pdfRef={pdfRef}
            visiblePages={visiblePages}
          />
          <ReaderView
            pdfRef={pdfRef}
            visiblePages={visiblePages}
          />
        </>
      )}
    </ReaderSessionController>
  </Container>
)

export default React.memo(ReaderLayout)
