/**
 * @file MainLayout.jsx
 * @description Global layout for all authenticated views.
 * Renders the Header, Sidebar and page content in a responsive grid.
 */

import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Header, Sidebar } from '@/layout/MainLayout'
import { setSidebar } from '@/store/slices/mainUiSlice'
import { useInitializeBooks } from '@/hooks'

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
  background: var(--gradient-metal-deepblue-v7);
  color: var(--color-light-0);
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
 * Loads static book data on mount.
 *
 * @returns {JSX.Element}
 */
const MainLayout = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen)

  useInitializeBooks()

  useEffect(() => {
    dispatch(setSidebar(false))
  }, [location.pathname, dispatch])

  return (
    <LayoutWrapper $open={sidebarOpen}>
      <Header />
      <Sidebar />
      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutWrapper>
  )
}

//-----------------------------------------------------------------------------
// Export (must be default for React.lazy to work)
//-----------------------------------------------------------------------------

export default MainLayout
