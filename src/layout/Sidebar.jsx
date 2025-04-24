import React from 'react'
import styled from 'styled-components'
import SidebarMenu from './SidebarMenu'

// -----------------------------------------------------------------------------
//------ SidebarStyled: Sidebar wrapper styles  
// -----------------------------------------------------------------------------

const SidebarStyled = styled.div`
  grid-column: 1;
  grid-row: 2 / 3;
  background: var(--gradient-main-v2);
  color: var(--color-dark-900);
  border-right: 3px solid var(--see-akcent-02);
  display: grid;
  grid-template-rows: 5vh auto 2fr;
  overflow: hidden;
  justify-items: center;
  z-index: 1000;
`

// -----------------------------------------------------------------------------
//------ Sidebar component definition  
// -----------------------------------------------------------------------------

const Sidebar = ({ $isOpen, bookId }) => {
  return (
    <SidebarStyled $isOpen={$isOpen}>
      <SidebarMenu $isOpen={$isOpen} bookId={bookId} />
    </SidebarStyled>
  )
}

export default Sidebar
