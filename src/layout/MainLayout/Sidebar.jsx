// src/layout/Sidebar/Sidebar.jsx

import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { SidebarMenu } from '@/layout/MainLayout'

// -----------------------------------------------------------------------------
//-------SidebarStyled – wrapper for sidebar menu 
// -----------------------------------------------------------------------------
const SidebarStyled = styled.div`
  grid-column: 1;
  grid-row: 2 / 3;
  background: var(--gradient-main-v2);
  color: var(--color-dark-900);
  border-right: 3px solid var(--see-akcent-02);
  display: ${({ $isOpen }) => ($isOpen ? 'grid' : 'none')};
  grid-template-rows: 5vh auto 2fr;
  overflow: hidden;
  justify-items: center;
  z-index: 1000;
  transition: all 0.4s ease;
`

// -----------------------------------------------------------------------------
//-------Sidebar – displays the sidebar menu 
// -----------------------------------------------------------------------------
const Sidebar = () => {
  const isOpen = useSelector((state) => state.ui.sidebarOpen)

  return (
    <SidebarStyled $isOpen={isOpen}>
      <SidebarMenu />
    </SidebarStyled>
  )
}

export default Sidebar
