/**
 * @file PrivateRoute.jsx
 * @description
 * Wrapper component that protects private routes.
 * Redirects unauthenticated users to the login page.
 */

import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAuth } from '@/modules/user/hooks'
import { LoadingSpinner } from '@/components'
import { setAuthModalMode, setAuthModalMessage } from '@/store/slices/mainUiSlice'
// -----------------------------------------------------------------------------
// Component: PrivateRoute
// -----------------------------------------------------------------------------

/**
 * Protects routes by checking authentication status.
 *
 * @returns {JSX.Element}
 */
const PrivateRoute = () => {
    const dispatch = useDispatch()
  const { isLoggedIn, authChecked } = useAuth()

 useEffect(() => {
    if (authChecked && !isLoggedIn) {
      dispatch(setAuthModalMessage('Log in or register to proceed'))
      dispatch(setAuthModalMode('login'))
    }
  }, [authChecked, isLoggedIn, dispatch])

  if (!authChecked) return <LoadingSpinner fullScreen />

   return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />
}

export default PrivateRoute
