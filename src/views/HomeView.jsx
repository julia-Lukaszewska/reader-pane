//-----------------------------------------------------------------------------
//------ HomeView – main landing view with interactive menu tiles 
//-----------------------------------------------------------------------------

/**
 * @file HomeView.jsx
 * @description Main landing view displaying interactive menu tiles.
 */
import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { HomeMenu } from '@/components'

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
//------ Component: HomeView 
//-----------------------------------------------------------------------------

/**
 * Renders the HomeView with a blurred background when a menu tile is active.
 *
 * @component
 * @returns {JSX.Element}
 */
const HomeView = () => {
  const activeItem = useSelector(state => state.ui.activeItem)
  const isTileActive = activeItem !== null

  return (
    <StyledHomeView $blurred={isTileActive}>
      <HomeMenu />
    </StyledHomeView>
  )
}

export default HomeView