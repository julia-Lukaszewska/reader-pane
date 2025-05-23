/**
 * @file SidebarMenu.jsx
 * @description Menu list displayed inside the Sidebar component.
 * Includes navigation buttons for main app views.
 */

import styled from 'styled-components'
import { Button } from '@/components'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

//-----------------------------------------------------------------------------
// Styled component: nav container with animation
//-----------------------------------------------------------------------------

const MenuNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;  
  margin: 2rem 0;
  align-items: center;
  grid-row: 2;  

  & > * {
    transform: ${({ $isOpen }) =>
      $isOpen ? 'translateX(0)' : 'translateX(10vw)'};
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    filter: ${({ $isOpen }) => ($isOpen ? 'brightness(1)' : 'brightness(1.4)')};
    transition:
      opacity 0.6s ease-out,
      transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1),
      filter 0.4s ease;
  }
`

//-----------------------------------------------------------------------------
// Nav items definition
//-----------------------------------------------------------------------------

const items = [
  { label: 'Home', path: '/' },
  { label: 'Reader', path: '/read' },
  { label: 'Library', path: '/library' },
  { label: 'Import', path: '/library/import' },
  { label: 'Archive', path: '/library/archive' },
  { label: 'Favorites', path: '/library/favorites' },
  { label: 'Settings', path: '/settings' },
]

//-----------------------------------------------------------------------------
// Component: SidebarMenu
//-----------------------------------------------------------------------------

/**
 * Renders vertical list of navigation buttons.
 * Buttons animate in/out based on sidebar state.
 *
 * @returns {JSX.Element}
 */
const SidebarMenu = () => {
  const navigate = useNavigate()
  const isOpen = useSelector((state) => state.ui.sidebarOpen)

  return (
    <MenuNav $isOpen={isOpen}>
      {items.map((item) => (
        <Button
          key={item.path}
          $variant="sidebar_btn"
          onClick={() => navigate(item.path)}
        >
          {item.label}
        </Button>
      ))}
    </MenuNav>
  )
}

export default SidebarMenu
