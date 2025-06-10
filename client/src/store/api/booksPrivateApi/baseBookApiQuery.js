// src/store/api/baseBookApiQuery.js

import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, clearCredentials } from '@/store/slices/authSlice'

/**
 * Raw baseQuery for book-related endpoints.
 * Automatically attaches Bearer token from Redux state.
 */
const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: 'include', // send HttpOnly cookies (refresh token)
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.acces
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

/**
 * Custom baseQuery for all book API calls.
 * - Tries original request
 * - On 401, attempts token refresh
 * - Retries original request if refresh succeeds
 * - Clears credentials if refresh fails
 *
 * @param {import('@reduxjs/toolkit').FetchArgs|string} args
 *   fetch arguments or URL string
 * @param {import('@reduxjs/toolkit/dist/query').BaseQueryApi}
 *   api toolkit baseQuery API (dispatch, getState, etc.)
 * @param {object} extraOptions
 *   extra options forwarded from createApi
 * @returns {Promise<import('@reduxjs/toolkit/query/react').FetchBaseQueryError | { data: any }>}
 */
export const baseBookApiQuery = async (args, api, extraOptions) => {
  // 1) send original request
  let result = await rawBaseQuery(args, api, extraOptions)

  // 2) if unauthorized, attempt refresh
  if (result.error?.status === 401) {
    const refreshResult = await rawBaseQuery(
      { url: '/auth/refresh', method: 'POST' },
      api,
      extraOptions
    )

    if (refreshResult.data) {
      // store new access token
      api.dispatch(setCredentials({ token: refreshResult.data.accessToken }))
      // retry original request
      result = await rawBaseQuery(args, api, extraOptions)
    } else {
      // refresh failed → clear auth state
      api.dispatch(clearCredentials())
    }
  }

  return result
}
