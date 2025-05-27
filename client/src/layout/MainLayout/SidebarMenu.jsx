/**
 * @file SidebarMenu.jsx
 * @description Menu list displayed inside the Sidebar component.
 * Includes navigation buttons for main app views and the auth modal (login/register).
 */

import styled from 'styled-components'
import { Button } from '@/components'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useAuth } from '@/modules/user/hooks'
import { useLogout } from '@/modules/user/hooks/useLogout'
import AuthModal from '@/modules/user/components/AuthModal'
import { setAuthModalMode } from '@/store/slices/mainUiSlice'
import { selectAuthModalMode, selectSidebarOpen } from '@/store/selectors/selectors'

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
 * Shows login/register if not logged in, or greeting + logout if logged in.
 *
 * @returns {JSX.Element}
 */
const SidebarMenu = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isOpen = useSelector(selectSidebarOpen)
  const { isLoggedIn, user } = useAuth()
  const logout = useLogout()

  const authModalMode = useSelector(selectAuthModalMode)

  return (
    <>
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

        {!isLoggedIn ? (
          <>
            <Button
              $variant="sidebar_btn"
              onClick={() => dispatch(setAuthModalMode('login'))}
            >
              Log In
            </Button>
            <Button
              $variant="sidebar_btn"
              onClick={() => dispatch(setAuthModalMode('register'))}
            >
              Register
            </Button>
          </>
        ) : (
          <>
            <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>
             
            </div>
            <Button $variant="sidebar_btn" onClick={logout}>
              Log out
            </Button>
          </>
        )}
      </MenuNav>

      {authModalMode && (
        <AuthModal
          mode={authModalMode}
          onClose={() => dispatch(setAuthModalMode(null))}
          enableTabs // enables tabbed interface
        />
      )}
    </>
  )
}

export default SidebarMenu
