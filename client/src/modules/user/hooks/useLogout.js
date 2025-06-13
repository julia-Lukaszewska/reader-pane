
/**
 * @file useLogout.js
 * @description
 * Custom hook for handling user logout.
 */

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '@/store/api/authApi/authApi'
import { clearCredentials } from '@store/slices/authSlice'

/**
 * Returns an async function to log out the user.
 * Sends logout request to backend, clears credentials, and redirects to homepage.
 * @returns {Function}
 */
export default function useLogout() {
  const [logoutRequest] = useLogoutMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return async () => {
    try {
      await logoutRequest().unwrap()
    } catch {
      // handle error if needed
    } finally {
      dispatch(clearCredentials())
      navigate('/')
    }
  }
}