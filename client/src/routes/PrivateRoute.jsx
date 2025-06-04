/**
 * @file PrivateRoute.jsx
 * @description
 * Wrapper for protecting private routes.
 * Redirects unauthenticated users to the login page.
 */

import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/modules/user/hooks'

// -----------------------------------------------------------------------------
// Component: PrivateRoute
// -----------------------------------------------------------------------------

/**
 * Protects routes by checking authentication status.
 *
 * @returns {JSX.Element}
 */
const PrivateRoute = () => {
  const { isLoggedIn } = useAuth()

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute
