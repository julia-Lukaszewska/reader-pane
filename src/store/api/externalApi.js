/**
 * @file externalApi.js
 * @description RTK Query slice for external API (Wolne Lektury).
 * @todo Add more endpoints, handle errors.
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const externalApi = createApi({
  reducerPath: 'externalApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api/external',
  }),
  endpoints: builder => ({
    /**
     * Fetches books from Wolne Lektury.
     * @returns {Object} Query result
     * @todo Add transformation if needed.
     */
    getWolneLektury: builder.query({
      query: () => '/wolneLektury',
    }),
  }),
})

/**
 * RTK Query hook for Wolne Lektury endpoint.
 * @returns {Object}
 */
export const { useGetWolneLekturyQuery } = externalApi
