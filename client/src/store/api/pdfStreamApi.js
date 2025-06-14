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
    /**
     * Pobiera plik PDF jako Blob.
     * @param {string} filename – dokładna nazwa pliku w GridFS
     * @returns {Blob}
     */
    getPdfFile: builder.query({
      query: (filename) => ({
        url: `/books/storage/${encodeURIComponent(filename)}`,
        responseHandler: 'blob',   // <-- RTK Query zwróci Blob w data
        cache: 'no-store',         // (opcjonalnie) wyłącz cache przeglądarki
      }),
      extraOptions: { maxRetries: 2 },
    }),
  }),
})

export const { useGetPdfFileQuery } = pdfStreamApi
