/**
 * @file useAuth.js
 * @description
 * Custom hook for accessing authentication state and logout functionality.
 */

import { useDispatch, useSelector } from 'react-redux'
import { clearCredentials } from '@/store/slices/authSlice'
import { selectAccessToken, selectAuthChecked, selectIsLoggedIn } from '@/store/selectors/authSelectors'
import { useNavigate } from 'react-router-dom'

/**
 * Provides access to authentication state and helper actions.
 * @returns {{ accessToken: string | null, isLoggedIn: boolean, authChecked: boolean, logout: Function }}
 */
export default function useAuth() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const accessToken = useSelector(selectAccessToken)
  const authChecked = useSelector(selectAuthChecked)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  /**
   * Logs out the user by clearing credentials and redirecting to home.
   */
  const logout = () => {
    dispatch(clearCredentials())
    navigate('/')
  }

  return { accessToken, isLoggedIn, authChecked, logout }
}