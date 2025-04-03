 

import React from 'react'  
import { Outlet } from 'react-router-dom'  

import styled from 'styled-components'  
import Header from './Header'  
import Sidebar from './Sidebar'  

// -----------------------------------------------------------------------------
// ------ StyledMainLayout   
// -----------------------------------------------------------------------------

const StyledMainLayout = styled.div`
  display: grid;  
  grid-template-rows: 10vh auto;  
  grid-template-columns: 20rem auto;  
  overflow: hidden;  
  background: var(
    --gradient-blue-dark
  );  
`
//'-----------------------------------------------------------------------------
// StyledMain   
//'-----------------------------------------------------------------------------

const StyledMain = styled.main`
  width: 100%;  
  height: 100%;  
  grid-row: 2;  
  grid-column: 2;  
  background: var(
    --gradient-blue-light
  );  
`

// -----------------------------------------------------------------------------
// ------ MainLayout Component   
// -----------------------------------------------------------------------------

const MainLayout = () => {
  return (
    <StyledMainLayout>
      {/* Header component   */}
      <Header />

      {/* Sidebar component   */}
      <Sidebar />

      <StyledMain>
        {/* Outlet for nested routes   */}
        <Outlet />
      </StyledMain>
    </StyledMainLayout>
  )
}

 
export default MainLayout
