/**
 * @file MainLayout.jsx
 * @description Global layout for all authenticated views.
 * Renders the Header, Sidebar and page content in a responsive grid.
 * Displays login modal automatically when user is not authenticated.
 */

import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Header, Sidebar } from '@/layout/MainLayout'
import { setSidebar, setAuthModalMode,  setAuthModalMessage } from '@/store/slices/mainUiSlice'
import { useAuth } from '@/modules/user/hooks'
import AuthModal from '@/modules/user/components/AuthModal'
import { selectAuthModalMode, selectAuthModalMessage } from '@/store/selectors'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

const LayoutWrapper = styled.div`
  display: grid;
  grid-template-rows: 10vh 1fr;
  grid-template-columns: ${({ $open }) => ($open ? '20rem 1fr' : '0rem 1fr')};
  width: 100vw;
  height: 100vh;  
  transition: grid-template-columns 0.4s ease;
   background: ${({ $isHome }) => $isHome ? 'var(--gradient-main-v4)' : 'var(--gradient-metal-deepblue-v7)'};
  color: var(--color-light-0);
    @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const MainContent = styled.main`
  grid-row: 2;
  grid-column: 2;
  padding: 1rem;
  overflow-y: auto;
  background-color: var(--see-07);
  z-index: 200;
`

//-----------------------------------------------------------------------------
// Component: MainLayout
//-----------------------------------------------------------------------------

/**
 * Layout component used across all app routes except home.
 * Automatically closes the sidebar on route change.
 * Displays login modal if user is not authenticated.
 *
 * @returns {JSX.Element}
 */
const MainLayout = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen)
  const authModalMode = useSelector(selectAuthModalMode)
  const authModalMessage = useSelector(selectAuthModalMessage)
   
  const { isLoggedIn } = useAuth()

  // Automatically close sidebar on route change
  useEffect(() => {
    dispatch(setSidebar(false))
  }, [location.pathname, dispatch])

  

  return (
   <LayoutWrapper $open={sidebarOpen} $isHome={isHome}>
      <Header />
      <Sidebar />
      <MainContent>
        <Outlet />
      </MainContent>

         {authModalMode && (
        <AuthModal
          mode={authModalMode}
          message={authModalMessage}
          onClose={() => {
            dispatch(setAuthModalMode(null))
            dispatch(setAuthModalMessage(null))
          }}
        />
      )}
    </LayoutWrapper>
  )
}

export default MainLayout
