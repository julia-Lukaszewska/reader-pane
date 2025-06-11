// src/store/api/baseAuthApiQuery.js

/**
 * @file baseAuthApiQuery.js
 * @description
 * Custom RTK Query baseQuery for authentication:
 *  - attaches JWT access token from localStorage
 *  - sends HttpOnly refresh token cookie on every request
 *  - automatically attempts token refresh on 401 responses
 *  - retries original request with new access token
 *  - clears auth and resets API state if refresh fails
 *
 * @module baseAuthApiQuery
 */

import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { saveAuth,  clearAuth } from '@/utils/storageService'
import { authApi } from './authApi'

/**
 * Low-level fetchBaseQuery configured with:
 *  - baseUrl from VITE_API_URL
 *  - credentials: 'include' (to send HttpOnly refresh cookie)
 *  - prepareHeaders to inject Authorization header
 */
const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: 'include',
prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.access
    if (token) headers.set('Authorization', `Bearer ${token}`)
    return headers
  }
})

/**
 * Enhanced baseQuery that wraps rawBaseQuery to handle 401 refresh logic.
 *
 * @async
 * @param {import('@reduxjs/toolkit/query').BaseQueryArgs} args
 * @param {import('@reduxjs/toolkit/query').BaseQueryApi} api
 * @param {object} extraOptions
 * @returns {Promise<{
 *   data?: any,
 *   error?: { status: number, data: any }
 * }>}
 */
export async function baseAuthApiQuery(args, api, extraOptions) {
  // 1) First attempt to execute the request
  let result = await rawBaseQuery(args, api, extraOptions)

  // 2) On 401, attempt token refresh
  if (result.error?.status === 401) {
    const refreshResult = await rawBaseQuery(
      { url: '/auth/refresh', method: 'POST' },
      api,
      extraOptions
    )

    if (refreshResult.data) {
      // 3) Save new access token and user data
      const { access, user } = refreshResult.data
      saveAuth(access, user)

      // 4) Retry original request with updated token
      result = await rawBaseQuery(args, api, extraOptions)
    } else {
      // 5) Refresh failed → clear auth and reset API state
      clearAuth()
      api.dispatch(authApi.util.resetApiState())
    }
  }

  return result
}
