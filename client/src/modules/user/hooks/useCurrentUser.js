/**
 * @file useCurrentUser.js
 * @description
 * Hook to fetch current user details using /auth/me endpoint.
 */

import { useGetMeQuery } from '@/store/api/authApi'

/**
 * Hook for accessing current logged-in user data
 *
 * @returns {{ user: object|null, isLoading: boolean, isError: boolean }}
 */
export default function useCurrentUser() {
  const { data, isLoading, isError } = useGetMeQuery()
  return { user: data?.user ?? null, isLoading, isError }
}
