import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pdfStreamApi = createApi({
  reducerPath: 'pdfStreamApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getPdfFile: builder.query({
      query: (filename) => `/books/storage/${filename}`,
      responseHandler: (response) => response.blob(), 
    }),
  }),
})

export const { useGetPdfFileQuery } = pdfStreamApi
