import React from 'react'  
import styled from 'styled-components'  

// -----------------------------------------------------------------------------
//------ StyledToolbar   
// -----------------------------------------------------------------------------

const StyledToolbar = styled.nav`
  display: flex;  
  justify-content: center;  
  align-items: center;  
  height: 8vh;  
  width: 100vw;  
  padding: 2rem 3rem;  
`

// -----------------------------------------------------------------------------
//------ Toolbar   
// -----------------------------------------------------------------------------
const Toolbar = () => {
  return (
    <StyledToolbar>
      <h1>Toolbar</h1> {/*Toolbar heading   */}
    </StyledToolbar>
  )
}

 
export default Toolbar
