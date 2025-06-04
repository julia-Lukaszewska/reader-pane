/**
 * @file useRequireAuth.js
 * @description
 * Hook for protecting private views. Redirects to login if not authenticated.
 */

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import  useAuth  from './useAuth'

/**
 * Hook that redirects unauthenticated users to a login page
 *
 * @param {{ redirectTo?: string, fallback?: React.ReactNode }} options
 * @returns {null|React.ReactNode}
 */
export default function useRequireAuth({ redirectTo = '/login', fallback = null } = {}) {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) navigate(redirectTo)
  }, [isLoggedIn, navigate, redirectTo])

  return isLoggedIn ? null : fallback
}
