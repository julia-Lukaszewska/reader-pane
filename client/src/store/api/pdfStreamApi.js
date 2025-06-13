import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { selectAccessToken } from '@/store/selectors/authSelectors'

export const pdfStreamApi = createApi({
  reducerPath: 'pdfStreamApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
       prepareHeaders: (h, { getState }) => {
     const token = selectAccessToken(getState())
     if (token) h.set('Authorization', `Bearer ${token}`)
     return h
   },
  }),
  endpoints: (builder) => ({
    getPdfFile: builder.query({
     query: (filename) => `/books/storage/${encodeURIComponent(filename)}`,
     responseHandler: (r) => r.blob(),   
extraOptions: {
    maxRetries: 2, 
  },
    }),
  }),
})

export const { useGetPdfFileQuery } = pdfStreamApi
