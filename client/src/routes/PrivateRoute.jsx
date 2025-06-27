/**
 * @file PrivateRoute.jsx
 * @description
 * Wrapper component that protects private routes.
 * Redirects unauthenticated users to the login page.
 */

import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/modules/user/hooks'
import { LoadingSpinner } from '@/components'

// -----------------------------------------------------------------------------
// Component: PrivateRoute
// -----------------------------------------------------------------------------

/**
 * Protects routes by checking authentication status.
 *
 * @returns {JSX.Element}
 */
const PrivateRoute = () => {
  const { isLoggedIn, authChecked } = useAuth()



  if (!authChecked) return <LoadingSpinner fullScreen />

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute
