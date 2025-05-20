import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const externalApi = createApi({
  reducerPath: 'externalApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api/external',
  }),
  endpoints: builder => ({
    getWolneLektury: builder.query({
      query: () => '/wolneLektury',
    }),
  }),
})

export const { useGetWolneLekturyQuery } = externalApi
