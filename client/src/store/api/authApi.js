/**
 * @file authApi.js
 * @description
 * RTK Query API slice for authentication endpoints:
 * - login
 * - logout
 * - refresh
 * - register
 * - get current user info (/auth/me)
 *
 * All requests use a custom baseQuery with JWT access token injection
 * and automatic token refresh handling.
 */

import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from './baseQuery'

// -----------------------------------------------------------------------------
// API: authApi
// -----------------------------------------------------------------------------

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({

    /**
     * POST /auth/login
     * Logs in the user using email and password.
     * Returns access + refresh tokens.
     *
     * @example
     * const [login, { data, error }] = useLoginMutation()
     * login({ email, password })
     */
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
        credentials: 'include', //  Important for setting refresh-token cookie
      }),
    }),

    /**
     * POST /auth/logout
     * Logs out the user and clears the refresh token cookie.
     *
     * @example
     * const [logout] = useLogoutMutation()
     * logout()
     */
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        credentials: 'include', //  Needed to clear the cookie
      }),
    }),

    /**
     * POST /auth/refresh
     * Requests a new access token using the refresh token (HttpOnly cookie).
     * Usually triggered automatically by baseQuery.
     *
     * @example
     * const [refresh] = useRefreshMutation()
     * refresh()
     */
    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
        credentials: 'include', //  Needed to read the refresh-token cookie
      }),
    }),

    /**
     * GET /auth/me
     * Fetches the current logged-in user (based on access token).
     * Skipped if no token available (see `useCurrentUser()`).
     *
     * @example
     * const { data: user, isLoading } = useGetMeQuery()
     */
    getMe: builder.query({
      query: () => '/auth/me',
      keepUnusedDataFor: 0, // Always refetch on mount/arg change
    }),

    /**
     * POST /auth/register
     * Creates a new user account and returns access + refresh tokens.
     *
     * @example
     * const [register] = useRegisterMutation()
     * register({ email, password, name })
     */
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
        credentials: 'include', //  Needed to set the refresh-token cookie
      }),
    }),
  }),
})

// -----------------------------------------------------------------------------
// Exported Hooks
// -----------------------------------------------------------------------------

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
  useGetMeQuery,
  useRegisterMutation,
} = authApi
