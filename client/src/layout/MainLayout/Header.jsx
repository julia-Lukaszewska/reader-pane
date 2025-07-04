/**
 * @file Header.jsx
 * @description Top navigation bar rendered across all views.
 * Shows title and action buttons (home, sidebar toggle, theme switch).
 */

import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { toggleTheme, toggleSidebar, setAuthModalMode } from '@/store/slices/mainUiSlice'
import { Switch } from '@/components'
import { SlHome, SlMenu, SlUser } from 'react-icons/sl'
import Button,{$variants} from '@/components/common/Button'
import useLogout from '@/modules/user/hooks/useLogout'
import { useAuth } from '@/modules/user/hooks'
import useCurrentUser from '@/modules/user/hooks/useCurrentUser'
import { getAuth } from '@/utils/storageService'
import logo from '@/assets/logo.svg'

// -----------------------------------------------------------------------------
// Styled components
// -----------------------------------------------------------------------------

const HeaderStyled = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  background: var(--header-gradient-01);
  grid-row: 1;
  grid-column: 1 / 3;
 
  font-size: var(--text-01);
  justify-content: space-between;
  padding: var(--padding-03);
  border-bottom: var(--border-01);
  z-index: var(--index-default);
`

const TitleWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--space-sm);
  transform: translate(-50%, -50%);
`

const Title = styled.h1`
  position: relative;
  font-size: var(--space-lg);
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing:var(--space-xs);
  font-family: var(--font-family-01);
  color: var(--text-color-01);
  /* text-shadow: var(--shadow-02); */
  filter: drop-shadow(var(--shadow-02));
 
`

const UserInfo = styled.div`
position: relative;
  display: flex;
  align-items: center;
  font-size: var(--space-lg);
  margin: var(--space-m);
  gap: var(--space-md);
  color: var(--text-color-01);
  text-shadow: var(--shadow-02);
`

const BtnGroup = styled.div`
position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-lg);
`

const LogoImg = styled.img`
  height: var(--space-lg);
  margin-right: var(--space-xs);
  opacity: 1;
  filter: drop-shadow(var(--shadow-02));
`


// -----------------------------------------------------------------------------
// Component: Header
// -----------------------------------------------------------------------------

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
  const { isLoggedIn } = useAuth()
  const { user } = useCurrentUser()
  const logout = useLogout()
  const storedUser = getAuth()?.user

  const isHomeView = location.pathname === '/'

  const goHome = () => navigate('/')
  const handleToggleSidebar = () => dispatch(toggleSidebar())
  const handleToggleTheme = () => dispatch(toggleTheme())

  return (
    <HeaderStyled>
      <BtnGroup>  
       
          <Button
            $variant="circle_icon_btn"
            onClick={handleToggleSidebar}
            ariaLabel="Open menu"
          >
            <SlMenu />
          </Button>
        
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
            <Button $variant="header_btn" onClick={logout}>
              logout
            </Button>
          </>
        )}
        <Switch variant="theme" onClick={handleToggleTheme} />
      </BtnGroup>
    </HeaderStyled>
  )
}

export default Header
