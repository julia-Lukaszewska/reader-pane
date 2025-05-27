/**
 * @file useLogout.js
 * @description Custom hook for handling user logout. 
 * Sends logout request to the backend, clears credentials from store, and redirects to login page.
 */

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '@/store/api/authApi'
import { clearCredentials } from '@/store/slices/authSlice'

//-----------------------------------------------------------------------------
// Hook: useLogout
//-----------------------------------------------------------------------------

/**
 * Handles user logout:
 * - Sends POST /logout request
 * - Clears auth state
 * - Redirects to /login
 *
 * @returns {Function} async function to trigger logout
 */
export const useLogout = () => {
  const [logoutRequest] = useLogoutMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return async () => {
    try {
      await logoutRequest()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      dispatch(clearCredentials())
      navigate('/login')
    }
  }
}
