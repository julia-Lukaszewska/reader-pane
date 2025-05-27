/**
 * @file AuthPanel.jsx
 * @description Displays authentication panel. Shows login/register buttons when user is not logged in,
 * and greeting with logout button when user is authenticated. Designed to be reusable in various layout positions.
 */

import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useLogout } from '../hooks/useLogout'

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
  const { user, isLoggedIn } = useAuth()

  if (!isLoggedIn) {
    return (
      <Wrapper>
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/register')}>Register</button>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <span>Hello, {user?.name || user?.email}</span>
      <button onClick={logout}>Log out</button>
    </Wrapper>
  )
}

export default AuthPanel
