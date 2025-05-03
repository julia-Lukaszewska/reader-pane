//-----------------------------------------------------------------------------
//------ HomeView – main landing view with interactive menu tiles 
//-----------------------------------------------------------------------------

import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import HomeMenu from '@/components/HomeMenu/HomeMenu' // Home menu component 

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
  const activeItem = useSelector((state) => state.ui.activeItem)
  const isTileActive = activeItem !== null

  return (
    <StyledHomeView $blurred={isTileActive}>
      {/* Render home menu with animated tiles  */}
      <HomeMenu />
    </StyledHomeView>
  )
}

export default HomeView
