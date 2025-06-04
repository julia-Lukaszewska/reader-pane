/**
 * @file useAuth.js
 * @description
 * Custom hook for accessing auth state and logout functionality.
 */

import { useDispatch, useSelector } from 'react-redux'
import { clearCredentials } from '@/store/slices/authSlice'

/**
 * Hook for accessing current auth state and helper actions
 *
 * @returns {{ accessToken: string|null, isLoggedIn: boolean, logout: Function }}
 */
export default function useAuth() {
  const dispatch = useDispatch()
  const accessToken = useSelector((state) => state.auth.access)
  const isLoggedIn = Boolean(accessToken)

  const logout = () => {
    dispatch(clearCredentials())
  }

  return { accessToken, isLoggedIn, logout }
}
