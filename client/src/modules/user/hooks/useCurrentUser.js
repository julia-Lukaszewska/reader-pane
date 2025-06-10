/**
 * @file useCurrentUser.js
 * @description
 * Hook to fetch and return the current logged-in user using the /auth/me endpoint.
 */

import { useSelector } from 'react-redux'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { useGetMeQuery } from '@/store/api/authApi'
import { selectAccessToken } from '@/store/selectors/authSelectors'

/**
 * Returns the current user object, loading, and error state.
 * Skips the request if no access token is available.
 * Automatically refetches when the token changes.
 * @returns {{ user: object | null, isLoading: boolean, isError: boolean }}
 */
export default function useCurrentUser() {
  const accessToken = useSelector(selectAccessToken)
  const queryArg = accessToken ? undefined : skipToken

  const { data, isFetching, isError } = useGetMeQuery(queryArg, {
    refetchOnMountOrArgChange: true,
  })

  return {
    user: data?.user ?? null,
    isLoading: isFetching,
    isError,
  }
}