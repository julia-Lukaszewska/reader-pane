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
 * All requests use a custom baseQuery with JWT access token injection
 * and automatic token refresh handling.
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
  endpoints: (builder) => ({
    /**
     * POST /auth/login
     * Logs in the user using email and password.
     * Returns access + refresh tokens.
     */
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
        credentials: 'include',
      }),
      invalidatesTags: ['Auth'],
    }),

    /**
     * POST /auth/logout
     * Logs out the user and clears the refresh token cookie.
     */
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        credentials: 'include',
      }),
      invalidatesTags: ['Auth'],
    }),

    /**
     * POST /auth/refresh
     * Requests a new access token using the refresh token (HttpOnly cookie).
     */
    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
        credentials: 'include',
      }),
      // do not automatically invalidate Auth tag to avoid unnecessary refetches
    }),

    /**
     * GET /auth/me
     * Fetches the current logged-in user (based on access token).
     */
    getMe: builder.query({
      query: () => ({ url: '/auth/me', credentials: 'include' }),
      keepUnusedDataFor: 0,
      providesTags: ['Auth'],
    }),

    /**
     * POST /auth/register
     * Creates a new user account and returns access + refresh tokens.
     */
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
        credentials: 'include',
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
})

// -----------------------------------------------------------------------------
// Exported Hooks & API object
// -----------------------------------------------------------------------------

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
  useGetMeQuery,
  useRegisterMutation,
} = authApi

export default authApi
