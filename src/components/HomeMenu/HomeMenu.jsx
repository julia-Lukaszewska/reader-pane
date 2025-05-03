import { MenuTile } from '@/components'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { getLastBookId } from '@/utils'

// -----------------------------------------------------------------------------
//------ StyledHomeMenu – wrapper for main menu tiles 
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
//------ HomeMenu – displays main navigation tiles 
// -----------------------------------------------------------------------------

const HomeMenu = () => {
  const activeItem = useSelector((state) => state.ui.activeItem) 
  const isAnyTileActive = activeItem !== null
  const lastBookId = getLastBookId()

  return (
    <StyledHomeMenu>
      <MenuTile
        name="library"
        route="/library"
        color="var(--color-metal-blue-light)"
        position={{ x: '0%', y: '0%' }}
        label="Library"
        isAnyTileActive={isAnyTileActive}
        buttonLabel="Go to library"
      />

      <MenuTile
        name="reader"
        route={lastBookId ? `/read/${lastBookId}` : '/read'}
        color="var(--color-metal-blue-dark)"
        position={{ x: '0%', y: '-105%' }}
        label="Reader"
        isAnyTileActive={isAnyTileActive}
        buttonLabel="Start reading"
      />

      <MenuTile
        name="settings"
        route="/settings"
        color="var(--color-metal-blue-deep)"
        position={{ x: '-105%', y: '0%' }}
        label="Settings"
        isAnyTileActive={isAnyTileActive}
        buttonLabel="Settings"
      />
    </StyledHomeMenu>
  )
}

export default HomeMenu
