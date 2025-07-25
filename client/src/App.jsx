/**
 * @file App.jsx
 * @description Main application container applying global styles and rendering routes.
 */

import React from 'react'
import styled from 'styled-components'
import AppRoutes from '@/routes/AppRoutes'
import AuthController from '@/controllers/AuthController'
import { BackendWakeupOverlay } from '@/components'
import { useBackendReady } from '@/hooks'



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
const ready = useBackendReady()

  if (!ready) return <BackendWakeupOverlay />
  return (
    <>
    
      <AuthController />
      <StyledApp>
        <AppRoutes />
      </StyledApp>
    </>
  )
}

export default App
