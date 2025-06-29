/**
 * @file App.jsx
 * @description Main application container applying global styles and rendering routes.
 */

import React from 'react'
import styled from 'styled-components'
import AppRoutes from '@/routes/AppRoutes'
import AuthController from '@/controllers/AuthController'
import GlobalStyles from '@/styles/GlobalStyles.jsx'


// -----------------------------------------------------------------------------
// Styled components – App container
// -----------------------------------------------------------------------------

const StyledApp = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  width: 100vw;
`

// -----------------------------------------------------------------------------
// Component: App
// -----------------------------------------------------------------------------

/**
 * Wraps the application with global styles and renders the main route component.
 */
const App = () => {

  return (
    <>
      <GlobalStyles />
      <AuthController />
      <StyledApp>
        <AppRoutes />
      </StyledApp>
    </>
  )
}

export default App
