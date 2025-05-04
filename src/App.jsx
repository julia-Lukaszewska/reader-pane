//-----------------------------------------------------------------------------
//------ App: Main application container with global styles and routes
//-----------------------------------------------------------------------------

import React from 'react'
import styled from 'styled-components'

import AppRoutes from '@/routes/AppRoutes' 

import GlobalStyles from '@/styles/GlobalStyles'

// -----------------------------------------------------------------------------
//------ Styled components – App
// -----------------------------------------------------------------------------

const StyledApp = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  width: 100vw;
`

// -----------------------------------------------------------------------------
//------- App
// -----------------------------------------------------------------------------

const App = () => {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <AppRoutes />
      </StyledApp>
    </>
  )
}

export default App
