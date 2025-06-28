/**
 * @file useRegister.js
 * @description
 * Hook to handle user registration via /auth/register endpoint.
 */

import { useRegisterMutation } from '@/store/api/authApi/authApi'

/**
 * Returns registration function, loading, and error state.
 * @returns {{ register: Function, isLoading: boolean, error: any }}
 */
export default function useRegister() {
  const [registerMutation, { isLoading, error }] = useRegisterMutation()

  const register = async ({ email, password, name }) => {
    await registerMutation({ email, password, name }).unwrap()
  }

  return { register, isLoading, error }
}
