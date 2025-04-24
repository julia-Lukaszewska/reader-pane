// -----------------------------------------------------------------------------
//------ MainLayout: Page structure with header, sidebar and main content  
// -----------------------------------------------------------------------------

import React, { useContext, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Header from './Header'
import Sidebar from './Sidebar'

import { AppContext } from '../context/AppContext'
// -----------------------------------------------------------------------------
//------ StyledMainLayout: Main grid layout wrapper  
// -----------------------------------------------------------------------------

const StyledMainLayout = styled.div`
  display: grid;
  grid-template-rows: 10vh 1fr;
  grid-template-columns: ${({ $isSidebarOpen }) =>
    $isSidebarOpen ? '20rem 1fr' : '0rem 1fr'};
  width: 100vw;
  height: 100vh;
  transition: grid-template-columns 0.4s ease;
  overflow: visible;
  background: var(--gradient-metal-deepblue-v7);
  color: var(--color-light-0);
`

// -----------------------------------------------------------------------------
//------ StyledMain: Main content area  
// -----------------------------------------------------------------------------

const StyledMain = styled.main`
  transition: width 0.4s ease;
  /* width: ${({ $isSidebarOpen }) =>
    $isSidebarOpen ? 'calc(100vw - 20rem)' : '100vw'}; */
  width: 100%;
  height: 100%;
  grid-row: 2;
  grid-column: 2;
  padding-bottom: 2rem;

  background-color: var(--see-07);
  z-index: 200;
  justify-content: center;
  overflow: visible;
`

// -----------------------------------------------------------------------------
//------ MainLayout component definition  
// -----------------------------------------------------------------------------

const MainLayout = () => {
  const { state, dispatch } = useContext(AppContext)  
  const isSidebarOpen = state.isSidebarOpen

  const location = useLocation()
  const isHomeView = location.pathname === '/'  

  useEffect(() => {
    dispatch({ type: 'SET_SIDEBAR', payload: false })  
  }, [location.pathname, dispatch])

  return (
    <StyledMainLayout $isSidebarOpen={!isHomeView && isSidebarOpen}>
      <Header />
      {!isHomeView && <Sidebar $isOpen={isSidebarOpen} />}
      <StyledMain $isSidebarOpen={!isHomeView && isSidebarOpen}>
        <Outlet />
      </StyledMain>
    </StyledMainLayout>
  )
}

export default MainLayout
