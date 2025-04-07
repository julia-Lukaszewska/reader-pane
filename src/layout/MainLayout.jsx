// -----------------------------------------------------------------------------
//------ MainLayout: Page structure with header, sidebar and main content  
// -----------------------------------------------------------------------------

import React, { useState, useEffect } from 'react' // React core with hooks  
import { Outlet, useLocation } from 'react-router-dom' // Routing tools  

import styled from 'styled-components' // Styling using styled-components  
import Header from './Header' // Header component  
import Sidebar from './Sidebar' // Sidebar component  
import Toolbar from './Toolbar' // Toolbar component (reserved)  

// -----------------------------------------------------------------------------
//------ StyledMainLayout  
// -----------------------------------------------------------------------------

const StyledMainLayout = styled.div`
  display: grid;
  grid-template-rows: 10vh auto;
  grid-template-columns: ${({ $isSidebarOpen }) =>
    $isSidebarOpen
      ? '20rem auto'
      : '0 auto'}; // Conditional sidebar width  
  transition: grid-template-columns 0.4s ease;
  overflow: hidden;
  background: var(
    --gradient-metal-blue-dark
  );  
  color: var(
    --color-light-0
  );  
`

// -----------------------------------------------------------------------------
//------ StyledMain  
// -----------------------------------------------------------------------------

const StyledMain = styled.main`
  width: 100%;  
  height: 100%;  
  grid-row: 2;  
  grid-column: 2;  
  background-image: var(--gradient-metal-blue-light);
  background-size: cover;  
  background-position: center;  
  background-repeat: no-repeat;  
  background-color: var(--main-layout-background);  
  z-index: 200;  
`

// -----------------------------------------------------------------------------
//------ MainLayout Component  
// -----------------------------------------------------------------------------

const MainLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false) // Sidebar open/close state  
  const location = useLocation() // Access current path  
  const isReaderView = location.pathname.startsWith('/read') // Check if in reader view  

  useEffect(() => {
    setSidebarOpen(false) // Auto-close sidebar on route change  
  }, [location.pathname])

  return (
    <StyledMainLayout $isSidebarOpen={!isReaderView && isSidebarOpen}>
      <Header onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
      {/* Header with toggle function for sidebar   */}

      {!isReaderView && <Sidebar $isOpen={isSidebarOpen} />}
      {/* Sidebar only outside reader view   */}

      <StyledMain>
        <Outlet />
        {/* Render child route content   */}
      </StyledMain>
    </StyledMainLayout>
  )
}

// -----------------------------------------------------------------------------
//------ Export MainLayout  
// -----------------------------------------------------------------------------

export default MainLayout
