
/**
 * @file
 * Custom baseQuery for book-related RTK Query endpoints:
 * - Attaches Bearer access token from Redux state
 * - On 401 responses, attempts to refresh access
 * - Retries original request if refresh succeeds
 * - Clears credentials if refresh fails
 * - Safely parses JSON or plain text
 */

import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, clearCredentials } from '@/store/slices/authSlice'

//-----------------------------------------------------
// Raw Base Query with responseHandler
//-----------------------------------------------------
const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: 'include', // include HttpOnly cookies for refresh
  prepareHeaders: (headers, { getState }) => {
    const access = getState().auth.access
    if (access) {
      headers.set('Authorization', `Bearer ${access}`)
    }
    return headers
  },
  responseHandler: async response => {
    // always handle 401 as text
    if (response.status === 401) {
      const text = await response.text()
      return { data: text }
    }
    // detect JSON by header
    const contentType = response.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      return response.json()
    }
    // fallback to text for other content-types
    return response.text()
  }
})

//-----------------------------------------------------
// baseBookApiQuery Function
//-----------------------------------------------------
export const baseBookApiQuery = async (args, api, extraOptions) => {
  // 1) Initial request
  let result = await rawBaseQuery(args, api, extraOptions)
  console.log('[BOOK] initial request result:', result)

  // 2) If 401, attempt token refresh
  if (result.error?.status === 401) {
    console.warn('[BOOK] 401 received – attempting /auth/refresh')

    const refreshResult = await rawBaseQuery(
      { url: '/auth/refresh', method: 'POST' },
      api,
      extraOptions
    )
    console.log('[BOOK] refresh result:', refreshResult)

    if (refreshResult.data) {
      // store new token and retry original request
      api.dispatch(setCredentials({ access: refreshResult.data.access }))
      console.log('[BOOK] retrying original request with refreshed token')
      result = await rawBaseQuery(args, api, extraOptions)
    } else {
      // refresh failed – clear credentials
      api.dispatch(clearCredentials())
      console.warn('[BOOK] refresh failed – credentials cleared')
    }
  }

  return result
}
