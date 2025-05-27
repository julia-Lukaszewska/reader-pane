/**
 * @file HomeMenu.jsx
 * @description Displays the main navigation tiles: Library, Reader, and Settings.
 * Uses MenuTile components positioned in a grid layout, each with 4 personalized sub-tiles.
 */

import MenuTile from './MenuTile'
import styled , { css } from 'styled-components'
import { useSelector } from 'react-redux'
import { getLastBookId } from '@/utils'

// -----------------------------------------------------------------------------
// Styled components
// -----------------------------------------------------------------------------

const StyledHomeMenu = styled.div`
  position: relative;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  grid-column: 2;
  display: grid;
  grid-row: 2;
  width: 30vh;
  height: 30vh;
  display: flex;
  gap: 0px;

   ${({ $activeItem }) =>
    $activeItem &&
    css`
      & > [data-name]:not([data-name="${$activeItem}"]) {
        filter: blur(4px);
      }
    `}
`

// -----------------------------------------------------------------------------
// Component: HomeMenu
// -----------------------------------------------------------------------------

/**
 * Renders the main home menu with 3 tiles: Library, Reader, Settings.
 * Each tile gets 4 sub-tiles (MenuSubTile) positioned in a 2×2 grid.
 */
const HomeMenu = () => {
  const activeItem = useSelector((state) => state.ui.activeItem)
  const isAnyTileActive = activeItem !== null
  const lastBookId = getLastBookId()

  return (
    <StyledHomeMenu $activeItem={activeItem}>
      <MenuTile
        name="library"
        route="/library"
        color="var(--color-metal-blue-light)"
        position={{ x: '0%', y: '0%' }}
        label="Library"
        isAnyTileActive={isAnyTileActive}
        subTiles={[
          { label: 'Last Read',    route: lastBookId ? `/read/${lastBookId}` : '/read',     area: 'LT' },
          { label: 'All Books',    route: '/library',                                   area: 'RT' },
          { label: 'Add New',      route: '/library/import',                            area: 'LB' },
          { label: 'Favorites',    route: '/library/favorites',                         area: 'RB' },
        ]}
      />

      <MenuTile
        name="reader"
        route={lastBookId ? `/read/${lastBookId}` : '/read'}
        color="var(--color-metal-blue-dark)"
        position={{ x: '0%', y: '-105%' }}
        label="Reader"
        isAnyTileActive={isAnyTileActive}
        subTiles={[
          { label: 'Continue',    route: lastBookId ? `/read/${lastBookId}` : '/read', area: 'LT' },
          { label: 'Select Book', route: '/library',                                    area: 'RT' },
          { label: 'Bookmarks',   route: '/library/favorites',                          area: 'LB' },
          { label: 'Progress',    route: '/library',                                    area: 'RB' },
        ]}
      />

      <MenuTile
        name="settings"
        route="/settings"
        color="var(--color-metal-blue-deep)"
        position={{ x: '-105%', y: '0%' }}
        label="Settings"
        isAnyTileActive={isAnyTileActive}
        subTiles={[
          { label: 'Theme',        route: '/settings/theme',      area: 'LT' },
          { label: 'Language',     route: '/settings/language',   area: 'RT' },
          { label: 'Backup',       route: '/settings/backup',     area: 'LB' },
          { label: 'All Settings', route: '/settings',            area: 'RB' },
        ]}
      />
    </StyledHomeMenu>
  )
}

export default HomeMenu
