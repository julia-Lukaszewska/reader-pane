/**
 * @file ReaderLayout.jsx
 * @description Layout wrapper for the PDF reader view.
 * Renders the ReaderToolbar and delegates session initialization and routing
 * to the ReaderSessionController.
 */

import React from 'react'
import styled from 'styled-components'
import { ReaderToolbar } from '@reader'
import ReaderSessionController from '@/modules/reader/ReaderSessionController'

//-----------------------------------------------------------------------------
// Styled container for the reader layout
//-----------------------------------------------------------------------------
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

//-----------------------------------------------------------------------------
// Component: ReaderLayout
//-----------------------------------------------------------------------------/

/**
 * Layout component for the `/read` route.
 * Displays the top ReaderToolbar and uses ReaderSessionController
 * to handle session initialization, book selection, and route rendering.
 *
 * @component
 * @returns {JSX.Element} The reader layout with toolbar and session controller.
 */
export default function ReaderLayout() {
  return (
    <Container>
      <ReaderToolbar />
      <ReaderSessionController />
    </Container>
  )
}
