// src/store/api/baseAuthApiQuery.js

/**
 * @file baseAuthApiQuery.js
 * @description
 * Custom RTK Query baseQuery for authentication:
 * - Attaches JWT access token from localStorage
 * - Sends HttpOnly refresh token cookie on every request
 * - Automatically attempts token refresh on 401 responses
 * - Retries original request with the new access token
 * - Clears auth and resets API state if refresh fails
 */

import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { saveAuth, clearAuth } from '@/utils/storageService';
import { authApi } from './authApi';

// -----------------------------------------------------------------------------
// Raw Base Query
// -----------------------------------------------------------------------------
const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: 'include', // include HttpOnly cookie
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.access;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

// -----------------------------------------------------------------------------
// Enhanced Base Query with 401 → /auth/refresh handling
// -----------------------------------------------------------------------------
export async function baseAuthApiQuery(args, api, extraOptions) {
  // 1) Execute the initial request
  let result = await rawBaseQuery(args, api, extraOptions);
  console.log('[AUTH] initial request result:', result);

  // 2) If 401, attempt to refresh the access token
  if (result.error?.status === 401) {
    console.warn('[AUTH] 401 received – attempting /auth/refresh');

    const refreshResult = await rawBaseQuery(
      { url: '/auth/refresh', method: 'POST' },
      api,
      extraOptions
    );
    console.log('[AUTH] refresh result:', refreshResult);

    if (refreshResult.data) {
      // 3) Save the new token and user info
      const { access, user } = refreshResult.data;
      saveAuth(access, user);
      api.dispatch(authApi.util.updateQueryData('getMe', undefined, () => ({ user })));

      // 4) Retry the original request with the refreshed token
      console.log('[AUTH] retrying original request with refreshed token');
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      // 5) Refresh failed → clear auth and reset API state
      console.warn('[AUTH] refresh failed – clearing credentials and cache');
      clearAuth();
      api.dispatch(authApi.util.resetApiState());
    }
  }

  return result;
}
