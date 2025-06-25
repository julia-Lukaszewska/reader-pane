//-----------------------------------------------------------------------------
// src/api/pdfStreamApi.js
//-----------------------------------------------------------------------------
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { selectAccessToken } from '@/store/selectors/authSelectors'

//-----------------------------------------------------------------------------
// PDF Stream API Slice
//-----------------------------------------------------------------------------
export const pdfStreamApi = createApi({
  reducerPath: 'pdfStreamApi',

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',

    prepareHeaders: (headers, { getState }) => {
      const token = selectAccessToken(getState())
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),

  endpoints: (builder) => ({
    //-------------------------------------------------------------------------
    // listFiles Query
    //-------------------------------------------------------------------------
    listFiles: builder.query({
      query: () => '/books/storage',
    }),

    //-------------------------------------------------------------------------
    // fetchPageRange Query – manual Authorization
    //-------------------------------------------------------------------------
    fetchPageRange: builder.query({
      query: ({ filename, start, end }, api) => {
        const token = selectAccessToken(api.getState())
        return {
          url: `/books/storage/${filename}/pages?start=${start}&end=${end}`,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
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
          },
        }
      },
      keepUnusedDataFor: 300,
    }),
  }),
})

//-----------------------------------------------------------------------------
// Hooks Export
//-----------------------------------------------------------------------------
export const {
  useListFilesQuery,
  useLazyFetchPageRangeQuery,
} = pdfStreamApi
