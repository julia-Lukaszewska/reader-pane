/**
 * @file baseQuery.js
 * @description
 * Custom baseQuery function for RTK Query with JWT access token support.
 * Automatically handles 401 errors by attempting token refresh using a
 * refresh token stored in an HttpOnly cookie, then retries the original request.
 */

import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, clearCredentials } from '@/store/slices/authSlice'

/**
 * Configured baseQuery for API requests
 * - Adds Authorization header with access token
 * - Includes credentials for cross-origin cookie support
 */
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.access
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

/**
 * Custom baseQuery wrapper with token refresh logic
 *
 * @param {*} args - original request arguments
 * @param {*} api - RTK Query API helpers
 * @param {*} extraOptions - additional request options
 * @returns {*} - response or result after retrying
 */
export const customBaseQuery = async (args, api, extraOptions) => {
  console.log('[BASE QUERY] Request:', args)

  let result = await baseQuery(args, api, extraOptions)

  if (result?.error) {
    console.warn('[BASE QUERY] Error status:', result.error.status)
    console.warn('[BASE QUERY] Error data:', result.error.data)
  }

  // If unauthorized, attempt token refresh
  if (result?.error?.status === 401) {
    console.log('[BASE QUERY] Access token expired. Attempting refresh...')

    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

    if (refreshResult?.data?.access) {
      console.log('[BASE QUERY] Refresh successful. New access token:', refreshResult.data.access)

      api.dispatch(setCredentials({ access: refreshResult.data.access }))
      result = await baseQuery(args, api, extraOptions)
    } else {
      console.error('[BASE QUERY] Refresh failed. Clearing credentials.')

      // Log unexpected refresh errors only
      if (
        refreshResult?.error?.status &&
        ![401, 403, 404].includes(refreshResult.error.status)
      ) {
        console.error('[BASE QUERY] Unexpected refresh error:', refreshResult.error)
      }

      api.dispatch(clearCredentials())
    }
  }

  console.log('[BASE QUERY] Final result:', result)
  return result
}
