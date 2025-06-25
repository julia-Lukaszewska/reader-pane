/**
 * @file src/api/pdfStreamApi.js
 * @description
 * RTK Query API slice for interacting with GridFS PDF storage:
 * - Automatically includes JWT auth token in headers
 * - Supports listing available PDF filenames
 * - Allows streaming specific page ranges from a PDF
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { selectAccessToken } from '@/store/selectors/authSelectors'

//-----------------------------------------------------
// PDF Stream API Slice
//-----------------------------------------------------
export const pdfStreamApi = createApi({
  reducerPath: 'pdfStreamApi',

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',

    // Automatically adds the JWT token to headers
    prepareHeaders: (headers, { getState }) => {
      const token = selectAccessToken(getState())
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),

  endpoints: (builder) => ({
    //-------------------------------------------------
    //  listFiles Query
    //-------------------------------------------------
    /**
     * Fetches an array of filenames for all PDFs stored in GridFS.
     *
     * @returns {Array<string>} List of PDF filenames available for streaming
     */
    listFiles: builder.query({
      query: () => '/books/storage',
    }),

    //-------------------------------------------------
    //  fetchPageRange Query
    //-------------------------------------------------
    /**
     * Streams a specific range of pages from a PDF stored in GridFS.
     * Returns a partial PDF blob.
     *
     * Backend responds with HTTP 206 Partial Content + stream.
     *
     * @param {Object} params
     * @param {string} params.id - Book/document ID
     * @param {number} params.start - First page to stream (1-based)
     * @param {number} params.end - Last page to stream (1-based)
     * @returns {Blob} PDF fragment containing selected pages
     */
    fetchPageRange: builder.query({
      query: ({ filename, start, end }) => ({
        url: `/books/storage/${filename}/pages?start=${start}&end=${end}`,

        responseHandler: async res => {
             if (!res.ok) {
            const msg = await res.text()
            throw new Error(msg || 'stream failed')
          }
          const reader = res.body.getReader()
          const chunks = []
          for (;;) {
            const { value, done } = await reader.read()
            if (done) break
            chunks.push(value)
          }
          return new Blob(chunks, { type: 'application/pdf' })
        }
      }),
      keepUnusedDataFor: 300, // cache for 5 minutes
    }),
  }),
})

//-----------------------------------------------------
// Hooks Export
//-----------------------------------------------------
export const { 
  useListFilesQuery,
  useLazyFetchPageRangeQuery,
} = pdfStreamApi
