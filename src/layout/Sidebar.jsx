// ***************************************************************************
import React from 'react'  
import styled from 'styled-components'  
import SidebarMenu from './SidebarMenu'  

// -----------------------------------------------------------------------------
//------ SidebarStyled   
// -----------------------------------------------------------------------------

const SidebarStyled = styled.div`
  grid-column: 1;  
  grid-row: 2 / 3;  
  background: var(
    --gradient-blue-light
  );  
  color: white;  
  display: grid;  
  overflow: hidden;  
`

// -----------------------------------------------------------------------------
//------ Sidebar Component   
// -----------------------------------------------------------------------------

const Sidebar = () => {
  return (
     
    <SidebarStyled>
      <SidebarMenu $isOpen={true} />
    </SidebarStyled>
  )
}

 
export default Sidebar
