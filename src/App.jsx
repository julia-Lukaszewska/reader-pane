//-----------------------------------------------------------------------------
//------ App: Main application container with global styles and routes  
//-----------------------------------------------------------------------------

import React from 'react'
import styled from 'styled-components'
 
import AppRoutes from './AppRoutes'
 
import GlobalStyles from './style/GlobalStyles'

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
      {/* Global styles   */}
      <GlobalStyles />
      {/* Main layout container   */}
      <StyledApp>
        <AppRoutes />
      </StyledApp>
    </>
  )
}

 
export default App
