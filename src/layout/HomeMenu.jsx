import MenuTile from '../components/MenuTile'
import styled from 'styled-components'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

// -----------------------------------------------------------------------------
//------ StyledHomeMenu   
// -----------------------------------------------------------------------------

const StyledHomeMenu = styled.div`
  position: relative;  
  top: 100%;  
  left: 50%;  
  transform: translate(-50%, -50%) scale(1);  
  grid-column: 2;
  grid-row: 2;
  width: 30vh;  
  height: 30vh;
  display: flex;  

  gap: 0px;  
`

// -----------------------------------------------------------------------------
//------ HomeMenu component   
// -----------------------------------------------------------------------------

const HomeMenu = () => {
  const { state } = useContext(AppContext)
  const isAnyTileActive = state.activeItem !== null

  return (
    <StyledHomeMenu>
      <MenuTile
        name="library"
        route="/library"
        color="var(--color-metal-blue-light)"
        position={{ x: '0%', y: '0%' }}
        label="Library"
        isAnyTileActive={isAnyTileActive}
        buttonLabel="Przejdź do biblioteki"
      ></MenuTile>

      <MenuTile
        name="reader"
        route="/read"
        color="var(--color-metal-blue-dark)"
        position={{ x: '0%', y: '-105%' }}
        label="Reader"
        isAnyTileActive={isAnyTileActive}
        buttonLabel="Czytaj książkę"
      ></MenuTile>

      <MenuTile
        name="settings"
        route="/settings"
        color="var(--color-metal-blue-deep)"
        position={{ x: '-105%', y: '0%' }}
        label="Settings"
        isAnyTileActive={isAnyTileActive}
        buttonLabel="Ustawienia"
      ></MenuTile>
    </StyledHomeMenu>
  )
}

export default HomeMenu
