// =============================================================================
// === Imports ===  
// =============================================================================

import React from 'react'
import styled from 'styled-components'
import HomeMenu from '../layout/HomeMenu' // Home menu component  

// -----------------------------------------------------------------------------
// === Styled Components ===  
// -----------------------------------------------------------------------------

const StyledHomeView = styled.div`
  position: relative;  
  display: flex;  
  justify-content: center;  
  align-items: center;  

  width: 100vw;  
  height: 100%;  

  background: var(
    --gradient-blue-light
  );  
  color: var(--color-light-0);  

  box-shadow: var(--glass-shadow);  

  &:hover {
    filter: brightness(1.05);  
  }
`

// -----------------------------------------------------------------------------
// === HomeView Component ===  
// -----------------------------------------------------------------------------

const HomeView = () => {
  return (
    <StyledHomeView>
      {/* Renderuje menu główne aplikacji   */}
      <HomeMenu />
    </StyledHomeView>
  )
}

// -----------------------------------------------------------------------------
// === Export ===  
// -----------------------------------------------------------------------------

export default HomeView
