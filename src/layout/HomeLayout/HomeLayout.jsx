/**
 * @file HomeLayout.jsx
 * @description Layout wrapper for the home page. Renders the Header and nested content via <Outlet>.
 */

import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import { Header } from '@/layout/MainLayout'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;  
  width: 100vw;
  background: var(--gradient-blue-clear);
`

//-----------------------------------------------------------------------------
// Component: HomeLayout
//-----------------------------------------------------------------------------

/**
 * Layout for the home route. Includes only the Header and the <Outlet />.
 * @returns {JSX.Element}
 */
const HomeLayout = () => {
  return (
    <Wrapper>
      <Header />
      <Outlet />
    </Wrapper>
  )
}

//-----------------------------------------------------------------------------
// Export (must be default for React.lazy to work)
//-----------------------------------------------------------------------------

export default HomeLayout
