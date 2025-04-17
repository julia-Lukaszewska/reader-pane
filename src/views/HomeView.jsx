//-----------------------------------------------------------------------------
//------ HomeView – main landing view with interactive menu tiles  
//-----------------------------------------------------------------------------

import React, { useContext } from 'react'
import styled from 'styled-components'
import HomeMenu from '../layout/HomeMenu' // Home menu component  
import { AppContext } from '../context/AppContext' // App context for global state  

//-----------------------------------------------------------------------------
//------ StyledHomeView – grid layout with center tiles  
//-----------------------------------------------------------------------------

const StyledHomeView = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: 1fr auto 1fr;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100%;
  background: var(--gradient-metal-deepblue-v7);
  color: var(--color-light-0);

  ${({ $blurred }) =>
    $blurred &&
    `
    transition: backdrop-filter 0.6s ease, background 0.6s ease;
  `}
`

//-----------------------------------------------------------------------------
//------ HomeView component definition  
//-----------------------------------------------------------------------------

const HomeView = () => {
  const { state } = useContext(AppContext)
  const isTileActive = state.activeItem !== null

  return (
    <StyledHomeView $blurred={isTileActive}>
      {/* Render home menu with animated tiles   */}
      <HomeMenu />
    </StyledHomeView>
  )
}

export default HomeView
