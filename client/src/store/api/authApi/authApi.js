// src/store/api/authApi.js
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
 * All requests use a custom baseQuery with:
 *  1. JWT access token injection
 *  2. HttpOnly refresh cookie
 *  3. Automatic token refresh handling
 */

import { createApi } from '@reduxjs/toolkit/query/react'
import { baseAuthApiQuery } from './baseAuthApiQuery'

// -----------------------------------------------------------------------------
// API: authApi
// -----------------------------------------------------------------------------
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseAuthApiQuery,
  tagTypes: ['Auth'],
  endpoints: builder => ({
    /**
     * Login mutation
     * POST /auth/login
     * @param {{ email: string, password: string }} credentials
     * @returns {{ access: string, user: object }}
     */
    login: builder.mutation({
      query: credentials => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: ['Auth']
    }),

    /**
     * Logout mutation
     * POST /auth/logout
     */
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST'
      }),
      invalidatesTags: ['Auth']
    }),

    /**
     * Refresh mutation
     * POST /auth/refresh
     * @returns {{ access: string, user: object }}
     */
    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST'
        
      })
      // no invalidatesTags to avoid auto refetch
    }),

    /**
     * Get current user
     * GET /auth/me
     * @returns {object}
     */
    getMe: builder.query({
      query: () => ({ url: '/auth/me' }),
      providesTags: ['Auth'],
      keepUnusedDataFor: 0
    }),

    /**
     * Register mutation
     * POST /auth/register
     * @param {{ email: string, password: string, name: string }} userData
     * @returns {{ access: string }}
     */
    register: builder.mutation({
      query: userData => ({
        url: '/auth/register',
        method: 'POST',
        body: userData
      }),
      invalidatesTags: ['Auth']
    })
  })
})

// -----------------------------------------------------------------------------
// Exported hooks
// -----------------------------------------------------------------------------
export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
  useGetMeQuery,
  useRegisterMutation
} = authApi

export default authApi
