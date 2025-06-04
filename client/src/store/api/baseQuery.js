/**
 * @file baseQuery.js
 * @description
 * Custom baseQuery function for RTK Query with JWT access token support
 * and automatic token refresh using refresh token from HttpOnly cookie.
 * Handles 401 errors by attempting refresh and retrying original request.
 */

import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, clearCredentials } from '@/store/slices/authSlice'

/**
 * Base query with Authorization header and credentials for cookies
 */
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.access
    if (token) headers.set('authorization', `Bearer ${token}`)
    return headers
  },
})

/**
 * Custom baseQuery wrapper with automatic refresh token handling
 * @param {*} args
 * @param {*} api - RTK Query API helpers
 * @param {*} extraOptions
 * @returns {*} API response or retry result after refresh
 */
export const customBaseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 401) {
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

    if (refreshResult?.data?.access) {
      api.dispatch(setCredentials({ access: refreshResult.data.access }))
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(clearCredentials())
    }
  }

  return result
}
