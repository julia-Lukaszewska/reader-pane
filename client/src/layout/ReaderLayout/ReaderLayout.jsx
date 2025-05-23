/**
 * @file ReaderLayout.jsx
 * @description Layout wrapper for the reader view.
 * Initializes reading session and renders the ReaderToolbar and nested routes.
 */

import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import { ReaderToolbar } from '@reader'
import { useInitReaderSession } from '@reader/hooks'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

//-----------------------------------------------------------------------------
// Component: ReaderLayout
//-----------------------------------------------------------------------------

/**
 * Layout used in the `/read` route.
 * Initializes reader state and wraps nested pages.
 *
 * @returns {JSX.Element}
 */
const ReaderLayout = () => {
  useInitReaderSession()

  return (
    <Container>
      <ReaderToolbar />
      <Outlet />
    </Container>
  )
}

export default ReaderLayout
