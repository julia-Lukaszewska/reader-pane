/**
 * @file HomeMenu.jsx
 * @description Layout component rendering the rotated menu grid with 3 MenuTile entries.
 */

//-----------------------------------------------------
//------ HomeMenu
//-----------------------------------------------------

import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import MenuTile from './MenuTile'

//-----------------------------------------------------
//------ Styled Components
//-----------------------------------------------------


//------ Wrapper
//-----------------------------------------------------

const Wrapper = styled.div`
  position:relative ;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 50vw;
  overflow: hidden;
  padding: 10%;
`

//------ StyledHomeMenu
//-----------------------------------------------------

const StyledHomeMenu = styled.div`
  display: grid;
  width: 70%;
  height: 70%;
  grid-template-areas:
    'LT RT'
    'LB RB';
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 4%;
  place-items: center;
  transform: rotate(45deg);
  z-index: 100;
`

//-----------------------------------------------------
//------ Component
//-----------------------------------------------------

/**
 * @function HomeMenu
 * @description Main menu layout with 3 interactive tiles: Library, Reader, Settings.
 * Tiles expand and animate based on active UI state.
 *
 * @returns {JSX.Element}
 */
const HomeMenu = () => {
  const activeItem = useSelector((state) => state.ui.activeItem)
  const isAny = activeItem !== null

  return (
    <Wrapper>
      <StyledHomeMenu>

        {/*--- Library Tile */}
        <MenuTile
          name="library"
          area="LB"
          label="Library"
          isAnyTileActive={isAny}
          isActive={activeItem === 'library'}
        />

        {/*--- Reader Tile */}
        <MenuTile
          name="reader"
          area="RT"
          label="Reader"
          isAnyTileActive={isAny}
          isActive={activeItem === 'reader'}
        />

        {/*--- Settings Tile */}
        <MenuTile
          name="settings"
          area="RB"
          label="Settings"
          isAnyTileActive={isAny}
          isActive={activeItem === 'settings'}
        />

      </StyledHomeMenu>
    </Wrapper>
  )
}

export default HomeMenu
