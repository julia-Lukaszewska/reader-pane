/**
 * @file Header.jsx
 * @description Top navigation bar rendered across all views.
 * Shows title and action buttons (home, sidebar toggle, theme switch).
 */

import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useNavigate, useLocation } from 'react-router-dom'
import { toggleTheme, toggleSidebar, setAuthModalMode  } from '@/store/slices/mainUiSlice'
import { Switch, Button } from '@/components'
import { SlHome, SlMenu } from 'react-icons/sl'
import useLogout from '@/modules/user/hooks/useLogout'
import { getAuth } from '@/utils/storageService'
import { useAuth } from '@/modules/user/hooks'
import useCurrentUser from '@/modules/user/hooks/useCurrentUser'
//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

const HeaderStyled = styled.header`  
  position: relative;
  background:
    linear-gradient(
      37deg,
      #2f6eb23a 20%,
      #6fafe642 45%,
      #9bd4ff1c 70%,
      #417cbf2f 100%
    ),
    linear-gradient(
      125deg,
      rgba(64, 172, 255, 0.549) 0%,
      rgba(30, 32, 106, 0.47) 50%,
      rgba(61, 105, 171, 0.08) 100%
    ),
    repeating-linear-gradient(
      70deg,
      rgba(255, 255, 255, 0.04) 0px,
      rgba(8, 75, 88, 0.578) 2px,
      rgba(0, 0, 0, 0.03) 2px,
      rgba(222, 222, 222, 0.03) 4px
    ),
    repeating-linear-gradient(
      -45deg,
      rgba(255, 255, 255, 0.02) 0px,
      rgba(127, 196, 198, 0.441) 20%,
      rgba(0, 0, 0, 0.02) 1px,
      rgba(0, 0, 0, 0.02) 2px
    );
  grid-row: 1;
  grid-column: 1 / 3;
  height: 10vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3rem;
  border-bottom: 0.2rem solid rgba(150, 232, 255, 0.315);
  z-index: 1;
`

const Title = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.4rem;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  font-family: 'Poppins', sans-serif;
  color: white;
  text-shadow: var(--color-);
  transition: color 0.3s ease;
`

const BtnGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`

//-----------------------------------------------------------------------------
// Component: Header
//-----------------------------------------------------------------------------

/**
 * Renders a header with title and action buttons depending on route.
 * - On non-home pages shows menu and home buttons.
 * - Always shows theme switch on the right.
 *
 * @returns {JSX.Element}
 */
const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const isHomeView = location.pathname === '/'
 const { isLoggedIn } = useAuth()
  const { user } = useCurrentUser()
    const logout = useLogout()
  const storedUser = getAuth()?.user
  const goHome = () => navigate('/')
  const handleToggleSidebar = () => dispatch(toggleSidebar())
  const handleToggleTheme = () => dispatch(toggleTheme())

  return (
    <HeaderStyled>
      <BtnGroup>
        {!isHomeView && (
          <Button
            $variant="circle_icon_btn"
            onClick={handleToggleSidebar}
            ariaLabel="Open menu"
          >
            <SlMenu />
          </Button>
        )}
        {!isHomeView && (
          <Button
            $variant="circle_icon_btn"
            onClick={goHome}
            ariaLabel="Go to home"
          >
            <SlHome />
          </Button>
        )}
      </BtnGroup>

      <Title>Pane</Title>

      <BtnGroup>
           {!isLoggedIn ? (
           <Button
            $variant="header_btn"
            onClick={() => dispatch(setAuthModalMode('login'))}
          >
            login
          </Button>
        ) : (
             <>
            <span>{user?.name || storedUser?.name}</span>
              <Button $variant="header_btn" onClick={logout}>logout</Button>
          </>
        )}
        <Switch variant="theme" onClick={handleToggleTheme} />
      </BtnGroup>
    </HeaderStyled>
  )
}

export default Header
