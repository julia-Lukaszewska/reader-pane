import React from 'react'

import styled from 'styled-components'
import Header from './Header'
import Sidebar from './Sidebar'

const StyledMainLayout = styled.div`
  display: grid;
  grid-template-rows: 10vh auto;
  grid-template-columns: 20rem auto;
  overflow: hidden;
  background: var(--gradient-blue-dark);
`

const StyledMain = styled.main`
  width: 100%;
  height: 100%;
  grid-row: 2;
  grid-column: 2;
  background: var(--gradient-blue-light);
`

const MainLayout = () => {
  return (
    <StyledMainLayout>
      <Header />
      <Sidebar />
      <StyledMain>
        <Outlet />
      </StyledMain>
    </StyledMainLayout>
  )
}

export default MainLayout
