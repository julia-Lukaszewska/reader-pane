/**
 * @file src/api/pdfStreamApi.js
 * @description
 * RTK Query API slice for interacting with GridFS PDF storage:
 * - Automatically includes JWT auth token in headers
 * - Supports listing available PDF filenames
 */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { selectAccessToken } from '@/store/selectors/authSelectors'

//-----------------------------------------------------
//------ PDF Stream API Slice
//-----------------------------------------------------
export const pdfStreamApi = createApi({
  reducerPath: 'pdfStreamApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = selectAccessToken(getState())
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
    credentials: 'include',
  }),
  endpoints: builder => ({
    //-------------------------------------------------
    //------ listFiles Query
    //-------------------------------------------------
    /**
     * @function listFiles
     * @description Fetches an array of filenames for all PDFs stored in GridFS.
     * @memberof pdfStreamApi.endpoints
     * @returns {Array<string>} An array of PDF filenames available for streaming.
     */
    listFiles: builder.query({
      query: () => '/books/storage',
    }),
  }),
})

//-----------------------------------------------------
//------ Hooks Export
//-----------------------------------------------------
export const { useListFilesQuery } = pdfStreamApi
