/**
 * @file App.jsx
 * @description Main application container applying global styles and rendering routes.
 */

import React from 'react'
import styled from 'styled-components'
import AppRoutes from '@/routes/AppRoutes'
import GlobalStyles from '@/styles/GlobalStyles'
import AuthController from '@/controllers/AuthController'


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
  if (!authChecked) return <LoadingSpinner fullScreen />
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
