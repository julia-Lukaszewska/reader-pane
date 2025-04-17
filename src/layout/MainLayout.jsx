// -----------------------------------------------------------------------------
//------ MainLayout: Page structure with header, sidebar and main content  
// -----------------------------------------------------------------------------

import React, { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Header from './Header'
import Sidebar from './Sidebar'

// -----------------------------------------------------------------------------
//------ StyledMainLayout: Main grid layout wrapper  
// -----------------------------------------------------------------------------

const StyledMainLayout = styled.div`
  display: grid;
  grid-template-rows: 10vh auto;
  grid-template-columns: ${({ $isSidebarOpen }) =>
    $isSidebarOpen ? '20rem auto 20rem' : '0 auto 0'};
  transition: grid-template-columns 0.4s ease;
  overflow: hidden;
  background: var(--gradient-metal-deepblue-v7);
  color: var(--color-light-0);
`

// -----------------------------------------------------------------------------
//------ StyledMain: Main content area  
// -----------------------------------------------------------------------------

const StyledMain = styled.main`
  width: 100%;
  height: 100%;
  grid-row: 2;
  grid-column: 2;
  background-color: var(--see-07);
  z-index: 200;
`

// -----------------------------------------------------------------------------
//------ MainLayout component definition  
// -----------------------------------------------------------------------------

const MainLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const isHomeView = location.pathname === '/'  

  useEffect(() => {
    setSidebarOpen(false)  
  }, [location.pathname])

  return (
    <StyledMainLayout $isSidebarOpen={!isHomeView && isSidebarOpen}>
      <Header onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

      {!isHomeView && <Sidebar $isOpen={isSidebarOpen} />}

      <StyledMain>
        <Outlet />
      </StyledMain>
    </StyledMainLayout>
  )
}

export default MainLayout
