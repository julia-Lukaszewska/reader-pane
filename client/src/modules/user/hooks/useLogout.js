/**
 * @file useLogout.js
 * @description Custom hook for handling user logout.
 * Sends logout request to backend, clears credentials, and redirects to homepage.
 */

//-----------------------------------------------------------------------------
// Hook: useLogout
//-----------------------------------------------------------------------------

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '@/store/api/authApi'
import { clearCredentials } from '@/store/slices/authSlice'

/**
 * Returns an async function to log out the user.
 *
 * @returns {Function}
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
      navigate('/') // Redirect to homepage
    }
  }
}
