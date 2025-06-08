/**
 * @file HomeView.jsx
 * @description Main landing view displaying interactive menu tiles.
 */

//-----------------------------------------------------
//------ HomeView – main landing view with interactive menu tiles
//-----------------------------------------------------

import React from 'react'
import styled from 'styled-components'
import  {HomeMenu}  from '@home/HomeMenu/components/HomeMenu'
import { useDispatch, useSelector } from 'react-redux'
import { clearActiveItem } from '@/store/slices/mainUiSlice'

//-----------------------------------------------------
//------ Styled Components
//-----------------------------------------------------




//------ StyledHomeView
//-----------------------------------------------------
const StyledHomeView = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--gradient-main-v22);
  filter: brightness(1) contrast(1.2);
  color: var(--color-light-9);
  z-index: 100;

  ${({ $blurred }) =>
    $blurred &&
    `
    transition: backdrop-filter 0.6s ease, background 0.6s ease;
  `}
`

//------ StyledMenu
//-----------------------------------------------------
const StyledMenu = styled(HomeMenu)`
  display: grid;
  position: relative;
  width: 60vh;
  height: 60vh;
  transform: rotate(45deg);
  align-items: center;
  justify-content: center;
`

//-----------------------------------------------------
//------ Component
//-----------------------------------------------------

/**
 * @component HomeView
 * @description Main view rendering HomeMenu with blur effect when a tile is active.
 *
 * @returns {JSX.Element}
 */
const HomeView = () => {
  const activeItem = useSelector((state) => state.ui.activeItem)
  const isTileActive = activeItem !== null
  const dispatch = useDispatch()

  return (
    <StyledHomeView
      $blurred={isTileActive}
      onClick={() => {
        if (isTileActive) dispatch(clearActiveItem())
      }}
    >
      <StyledMenu />
    </StyledHomeView>
  )
}

export default HomeView
