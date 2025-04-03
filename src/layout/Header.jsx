import React from 'react'  
import styled from 'styled-components'  

// -----------------------------------------------------------------------------
//------  Header styles   
// -----------------------------------------------------------------------------

const HeaderStyled = styled.header`
  background: var(
    --gradient-blue-light
  );  
  grid-row: 1;  
  grid-column: 1/3;  
  height: 10vh;  
  width: 100vw;  
  display: flex;  
  align-items: center;  
  justify-content: center;  
  color: white;  
  padding: 0 3rem;  
`

// -----------------------------------------------------------------------------
//------ Header   
// -----------------------------------------------------------------------------

const Header = () => {
  return (
    <HeaderStyled>
      <Title>Pane</Title>
    </HeaderStyled>
  )
}

//' -----------------------------------------------------------------------------
// Title styles   
//' -----------------------------------------------------------------------------

const Title = styled.h1`
  font-size: 2.4rem;  
  font-weight: 300;  
  text-transform: uppercase;  
  font-family:
    'Poppins', sans-serif;  
`

 
export default Header
