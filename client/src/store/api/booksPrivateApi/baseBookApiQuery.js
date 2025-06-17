/**
 * @file src/store/api/baseBookApiQuery.js
 * @description
 * Custom baseQuery for book-related RTK Query endpoints:
 * - Attaches Bearer access token from Redux state
 * - On 401 responses, attempts to refresh access
 * - Retries original request if refresh succeeds
 * - Clears credentials if refresh fails
 */
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, clearCredentials } from '@/store/slices/authSlice'

//-----------------------------------------------------
//------ Raw Base Query
//-----------------------------------------------------

/**
 * @constant rawBaseQuery
 * @description
 * Underlying fetchBaseQuery configured with API URL and auth header prep.
 */
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
})

//-----------------------------------------------------
//------ baseBookApiQuery Function
//-----------------------------------------------------

/**
 * @async
 * @function baseBookApiQuery
 * @description
 * Wraps rawBaseQuery to handle token refresh on 401:
 * 1. Performs original request
 * 2. If 401, sends POST /auth/refresh
 * 3. On successful refresh, dispatches new credentials and retries original
 * 4. On failure, clears credentials
 *
 * @param {FetchArgs|string} args          - fetch arguments or URL
 * @param {BaseQueryApi}       api          - RTK Query baseQuery API (dispatch, getState)
 * @param {object}             extraOptions - forwarded createApi options
 * @returns {Promise<FetchBaseQueryError|{data:any}>}
 */
export const baseBookApiQuery = async (args, api, extraOptions) => {
  // 1) Send original request
  let result = await rawBaseQuery(args, api, extraOptions)

  // 2) If unauthorized, attempt token refresh
  if (result.error?.status === 401) {
    const refreshResult = await rawBaseQuery(
      { url: '/auth/refresh', method: 'POST' },
      api,
      extraOptions
    )

    if (refreshResult.data) {
      //-------------------------------------------------
      //------ Store New Access Token & Retry
      //-------------------------------------------------
      api.dispatch(setCredentials({ access: refreshResult.data.access }))
      result = await rawBaseQuery(args, api, extraOptions)
    } else {
      //-------------------------------------------------
      //------ Refresh Failed: Clear Credentials
      //-------------------------------------------------
      api.dispatch(clearCredentials())
    }
  }

  return result
}
