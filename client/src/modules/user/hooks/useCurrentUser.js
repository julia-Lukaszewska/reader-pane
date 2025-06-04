// -----------------------------------------------------------------------------
// useCurrentUser.js
// -----------------------------------------------------------------------------
// Hook to fetch and return the current logged-in user using the /auth/me endpoint
//-----------------------------------------------------------------------------  

import { useSelector } from 'react-redux'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { useGetMeQuery } from '@/store/api/authApi'

/**
 * Returns the current user object, loading and error state.
 * Skips the request if no access token is available.
 * Automatically refetches when the token changes.
 *
 * @returns {{ user: object | null, isLoading: boolean, isError: boolean }}
 */
export default function useCurrentUser() {
  // Get the access token from Redux store
  const accessToken = useSelector(state => state.auth.access)

  // Determine whether to skip the query
  const queryArg = accessToken ? undefined : skipToken

  // Execute the query for /auth/me
  const { data, isFetching, isError } = useGetMeQuery(queryArg, {
    refetchOnMountOrArgChange: true,
  })
if (import.meta.env.DEV) {
  console.log('[useCurrentUser] accessToken:', accessToken)
  console.log('[useCurrentUser] user:', data?.user)
}

  return {
    user: data?.user ?? null,
    isLoading: isFetching,
    isError,
  }
}
