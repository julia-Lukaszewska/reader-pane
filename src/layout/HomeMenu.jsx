import MenuTile from '../components/MenuTile'
import styled from 'styled-components'
import MenuTileBtn from '../components/MenuTileBtn'

// -----------------------------------------------------------------------------
//------ StyledHomeMenu   
// -----------------------------------------------------------------------------

const StyledHomeMenu = styled.div`
  position: absolute;  
  top: 70%;  
  left: 50%;  
  transform: translate(-50%, -50%) scale(0.7);  

  width: 50vh;  
  height: 50vh;
  display: flex;  
  flex-direction: column;
  gap: 20px;  
`

// -----------------------------------------------------------------------------
//------ HomeMenu component   
// -----------------------------------------------------------------------------

const HomeMenu = () => {
  const lastBookId = localStorage.getItem('lastBookId')
  const readerRoute = lastBookId ? `/read/${lastBookId}` : '/library'

  return (
    <StyledHomeMenu>
      <MenuTile
        name="library"
        route="/library"
        color="var(--color-metal-blue-light)"
        position={{ x: '0%', y: '0%' }}
        label="Library"
      >
        <MenuTileBtn label="Przejdź do biblioteki" route="/library" />
      </MenuTile>

      <MenuTile
        name="reader"
        route="/read/1"
        color="var(--color-metal-blue-dark)"
        position={{ x: '0%', y: '-100%' }}
        label="Reader"
      >
        <MenuTileBtn label="Czytaj książkę" route={readerRoute} />
      </MenuTile>

      <MenuTile
        name="settings"
        route="/settings"
        color="var(--color-metal-blue-deep)"
        position={{ x: '-100%', y: '0%' }}
        label="Settings"
      >
        <MenuTileBtn label="Ustawienia" route="/settings" />
      </MenuTile>
    </StyledHomeMenu>
  )
}

export default HomeMenu
