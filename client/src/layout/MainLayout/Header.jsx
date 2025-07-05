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
import Button from '@/components/common/Button'
import useLogout from '@/modules/user/hooks/useLogout'
import { useAuth } from '@/modules/user/hooks'
import useCurrentUser from '@/modules/user/hooks/useCurrentUser'
import { getAuth } from '@/utils/storageService'
import logo from '@/assets/logo.svg'

// -----------------------------------------------------------------------------
// Styled components
// -----------------------------------------------------------------------------

const HeaderStyled = styled.header`
  display: grid; 
  width:100vw;
   gap: var(--space-xxl);
  grid-template-areas: "left center right";
grid-template-columns: 1fr 1fr 1fr;


  align-items: center;
  background: var(--header-gradient-01);
  padding: var(--padding-03);
  border-bottom: var(--border-01);
  z-index: var(--index-default);
`

const BtnGroup = styled.div`
  grid-area: left;
  display: flex;
  
  align-items: center;
  gap: var(--space-l);
  flex-shrink: 0;
`

const TitleWrapper = styled.div`
  grid-area: center;
  display: flex;
  padding:var(--padding-01);
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: var(--space-sm);
  flex-shrink: 0;
`

const RightGroup = styled.div`
  grid-area: right;
  display: flex;
  font-size: var(--text-01);
  align-items: center;
  gap: var(--space-lg);
  justify-content: end;
  flex-shrink: 0;
`

const Title = styled.h1`
  font-size: var(--space-lg);
  font-weight: 300;
  
  text-transform: uppercase;
  letter-spacing: var(--space-xs);
  font-family: var(--font-family-01);
  color: var(--text-color-01);
  filter: drop-shadow(var(--shadow-02));
`

const LogoImg = styled.img`
  height: var(--space-lg);
  opacity: 1;
  filter: drop-shadow(var(--shadow-02));
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--text-02);
  gap: var(--space-md);
  color: var(--text-color-01);
  text-shadow: var(--shadow-02);
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

      <RightGroup>
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
      </RightGroup>
    </HeaderStyled>
  )
}

export default Header
