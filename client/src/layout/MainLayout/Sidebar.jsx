/**
 * @file Sidebar.jsx
 * @description Sidebar navigation container. Renders sidebar menu if enabled.
 */

import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { SidebarMenu } from '@/layout/MainLayout'

//-----------------------------------------------------------------------------
// Styled component
//-----------------------------------------------------------------------------

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
  
//-----------------------------------------------------------------------------
// Component: Sidebar
//-----------------------------------------------------------------------------

/**
 * Renders the sidebar layout when `sidebarOpen` is true in Redux state.
 *
 * @returns {JSX.Element}
 */
const Sidebar = () => {
  const isOpen = useSelector((state) => state.ui.sidebarOpen)

  return (
    <SidebarStyled $isOpen={isOpen}>
      <SidebarMenu />
    </SidebarStyled>
  )
}

export default Sidebar
