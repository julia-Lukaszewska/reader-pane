// ***************************************************************************
//------ Sidebar: Vertical navigation panel  
// ***************************************************************************

import React from 'react' // React library for component creation  
import styled from 'styled-components' // Styled-components for scoped CSS  
import SidebarMenu from './SidebarMenu' // Sidebar menu component  

// -----------------------------------------------------------------------------
//------ SidebarStyled  
// -----------------------------------------------------------------------------

const SidebarStyled = styled.div`
  grid-column: 1; // First column in layout  
  grid-row: 2 / 3; // Second row only  
  background: var(
    --gradient-blue-light
  ); // Background gradient  
  color: var(--color-dark-900); // Text color  

  display: grid;
  grid-template-rows: 5vh auto 2fr; // Top spacing, content, spacer  
  overflow: hidden;
  justify-items: center; // Center contents horizontally  
`

// -----------------------------------------------------------------------------
//------ Sidebar component  
// -----------------------------------------------------------------------------

const Sidebar = ({ $isOpen }) => {
  return (
    <SidebarStyled $isOpen={$isOpen}>
      {/* Sidebar menu component with visibility state   */}
      <SidebarMenu $isOpen={$isOpen} />
    </SidebarStyled>
  )
}

// -----------------------------------------------------------------------------
//------ Export Sidebar  
// -----------------------------------------------------------------------------

export default Sidebar
