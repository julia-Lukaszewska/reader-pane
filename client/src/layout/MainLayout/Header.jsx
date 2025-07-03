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
import { SlUser } from 'react-icons/sl'

import { getAuth } from '@/utils/storageService'
import { useAuth } from '@/modules/user/hooks'
import useCurrentUser from '@/modules/user/hooks/useCurrentUser'
import logo from '@/assets/logo.svg'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

const HeaderStyled = styled.header`  
  position: relative;
  background: var(--header-gradient-01);
   
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
const TitleWrapper = styled.div`
   position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  transform: translate(-50%, -50%);
  font-size: 2.4rem;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  font-family: 'Poppins', sans-serif;
  color: var(--text-color-01);
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
  transition: color 0.3s ease;
  
`

const Title = styled.h1`
  position: relative;
  
  
  font-size: 2.4rem;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  font-family: 'Poppins', sans-serif;
  color: var(--text-color-01);
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
  transition: color 0.3s ease;
`
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1.2em;
  color: var(--text-color-01);
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
`

const BtnGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`
const LogoImg = styled.img`
  height: 1.2em;
  margin-right: 0.53rem;
  opacity: 1;
  filter: drop-shadow(2px 2px 3px rgba(5, 23, 46, 0.25));
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
      <TitleWrapper>
        <LogoImg src={logo} alt="Reader-App Logo" />
        <Title>Pane</Title>
      </TitleWrapper>
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
             <UserInfo>
    <SlUser aria-label="User icon" />
    <span>{user?.name || storedUser?.name}</span>
  </UserInfo>

              <Button $variant="header_btn" onClick={logout}>logout</Button>
          </>
        )}
        <Switch variant="theme" onClick={handleToggleTheme} />
      </BtnGroup>
    </HeaderStyled>
  )
}

export default Header
