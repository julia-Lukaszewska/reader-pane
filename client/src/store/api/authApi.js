/**
 * @file authApi.js
 * @description
 * RTK Query API slice for authentication endpoints: login, logout, refresh, register, and user info.
 * Uses custom baseQuery with JWT access token injection and automatic refresh.
 */

import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from './baseQuery'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    /**
     * POST /auth/login
     * Sends email and password to receive access + refresh token
     */
    login: builder.mutation({
      query: (credentials) => ({
        url: 'api/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    /**
     * POST /auth/logout
     * Clears the refresh token cookie
     */
    logout: builder.mutation({
      query: () => ({
        url: 'api/auth/logout',
        method: 'POST',
      }),
    }),

    /**
     * POST /auth/refresh
     * Requests new access token using refresh token (HttpOnly cookie)
     */
    refresh: builder.mutation({
      query: () => ({
        url: 'api/auth/refresh',
        method: 'POST',
      }),
    }),

    /**
     * GET /auth/me
     * Returns current authenticated user info
     */
    getMe: builder.query({
      query: () => 'api/auth/me',
    }),

    /**
     * POST /auth/register
     * Registers a new user and returns access + refresh token
     */
    register: builder.mutation({
      query: (userData) => ({
        url: 'api/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
  useGetMeQuery,
  useRegisterMutation,
} = authApi
