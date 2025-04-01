import React from 'react'
import styled from 'styled-components'

const SidebarStyled = styled.div`
  grid-column: 1;
  grid-row: 2 / 3;
  background: var(--gradient-blue-dark);
  color: white;
  display: grid;
  overflow: hidden;
`

const Sidebar = () => {
  return <SidebarStyled />
}

export default Sidebar
