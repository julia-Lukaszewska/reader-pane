/**
 * @file AuthPanel.jsx
 * @description Displays authentication panel. Shows login/register buttons when user is not logged in,
 * and greeting with logout button when user is authenticated. Designed to be reusable in various layout positions.
 */

import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import  useLogout  from '../hooks/useLogout'
import useCurrentUser from '../hooks/useCurrentUser'

//-----------------------------------------------------------------------------
// Styled wrapper
//-----------------------------------------------------------------------------

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.95rem;
`

//-----------------------------------------------------------------------------
// Component: AuthPanel
//-----------------------------------------------------------------------------

const AuthPanel = () => {
  const navigate = useNavigate()
  const logout = useLogout()
  const { isLoggedIn } = useAuth()

const { user } = useCurrentUser()

if (isLoggedIn) {
  return (
    <Wrapper>
      <p>Welcome, {user?.name || 'User'}</p>
      <button onClick={logout}>Log out</button>
    </Wrapper>
  )
}


return (
  <Wrapper>
    <button onClick={() => navigate('/login')}>Login</button>
    <button onClick={() => navigate('/register')}>Register</button>
  </Wrapper>
)

}

export default AuthPanel
