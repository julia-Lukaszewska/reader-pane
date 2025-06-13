/**
 * @file useRegister.js
 * @description
 * Hook to handle user registration via /auth/register endpoint.
 */

import { useRegisterMutation } from '@/store/api/authApi/authApi'
import { useDispatch } from 'react-redux'
import { setCredentials } from '@/store/slices/authSlice'

/**
 * Returns registration function, loading, and error state.
 * @returns {{ register: Function, isLoading: boolean, error: any }}
 */
export default function useRegister() {
  const dispatch = useDispatch()
  const [registerMutation, { isLoading, error }] = useRegisterMutation()

  const register = async ({ email, password, name }) => {
    const response = await registerMutation({ email, password, name }).unwrap()
    dispatch(setCredentials({ access: response.access }))
  }

  return { register, isLoading, error }
}
