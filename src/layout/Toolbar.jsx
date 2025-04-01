import React from 'react'
import styled from 'styled-components'

const StyledToolbar = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8vh;
  width: 100vw;
  padding: 2rem 3rem;
`

const Toolbar = () => {
  return (
    <StyledToolbar>
      <h1>Toolbar</h1>
    </StyledToolbar>
  )
}

export default Toolbar
