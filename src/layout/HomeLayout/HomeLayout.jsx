//-----------------------------------------------------------------------------
//------ HomeLayout – layout for the home page: renders only the Header and the main content Outlet 
//-----------------------------------------------------------------------------

import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import { Header } from '@/layout/MainLayout'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background: var(--gradient-blue-clear);
` 
// Layout component for the Home page — must be default export for React.lazy to work

const HomeLayout = () => {
  return (
    <Wrapper>
      <Header />
      <Outlet />
    </Wrapper>
  )
}

export default HomeLayout // Do not use `export const`, or React.lazy will fail

