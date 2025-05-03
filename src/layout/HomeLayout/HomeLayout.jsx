//-----------------------------------------------------------------------------
//------ HomeLayout – layout for the home page: renders only the Header and the main content Outlet 
//-----------------------------------------------------------------------------

import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import { Header } from '@/layout'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background: var(--gradient-blue-clear);
` 

const HomeLayout = () => {
  return (
    <Wrapper>
      <Header />
      <Outlet />
    </Wrapper>
  )
}

export default HomeLayout
