import React from 'react'
import styled from 'styled-components'
import HomeMenu from '../layout/HomeMenu' // Home menu component  
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

// -----------------------------------------------------------------------------
//------------- StyledHomeView   
// -----------------------------------------------------------------------------

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
    // background: var(--gradient-metal-deepblue-v9);

    transition: backdrop-filter 0.6s ease, background 0.6s ease;
  `}
`

// -----------------------------------------------------------------------------
//------ HomeView component   
// -----------------------------------------------------------------------------S

const HomeView = () => {
  const { state } = useContext(AppContext)
  const isTileActive = state.activeItem !== null
  return (
    <StyledHomeView $blurred={isTileActive}>
      {/* Renderuje menu główne aplikacji   */}
      <HomeMenu />
    </StyledHomeView>
  )
}

export default HomeView
