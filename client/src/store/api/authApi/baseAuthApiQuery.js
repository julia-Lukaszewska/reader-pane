// src/store/api/baseApiAuth.js

import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

/**
 * BaseQuery for authentication-related endpoints.
 * Uses `include` to ensure HttpOnly refresh cookies are sent.
 */
export const baseAuthApiQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: 'include',
})
