//-----------------------------------------------------------------------------
//------ booksApi.js – RTK Query API for fetching books 
//-----------------------------------------------------------------------------

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), 
  endpoints: (builder) => ({
    getBook: builder.query({
      query: (id) => `/books/${id}`, 
    }),
    
  }),
})


export const { useGetBookQuery } = booksApi
