import React from 'react'
import styled from 'styled-components'
 
import AppRoutes from './AppRoutes'
 
import GlobalStyles from './style/GlobalStyles'

// -----------------------------------------------------------------------------
//------ Styled components – App   
// -----------------------------------------------------------------------------

const StyledApp = styled.div`
  display: flex;  
  min-height: 100vh;  
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
