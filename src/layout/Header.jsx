import React from 'react'
import styled from 'styled-components'

const HeaderStyled = styled.header`
  background: var(--gradient-blue-light);
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

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 300;
  text-transform: uppercase;
  font-family: 'Poppins', sans-serif;
`

const Header = () => {
  return (
    <HeaderStyled>
      <Title>Pane</Title>
    </HeaderStyled>
  )
}

export default Header
