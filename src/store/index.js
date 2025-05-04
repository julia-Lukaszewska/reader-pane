//-----------------------------------------------------------------------------
//------ API definition before store setup 
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

//-----------------------------------------------------------------------------
//------ Store configuration 
//-----------------------------------------------------------------------------

import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './books/slice'
import externalBooksReducer from './externalBooks/slice'
import uploadReducer from './upload/slice'
import readerReducer from './reader/slice'
import uiReducer from './ui/slice'

export const store = configureStore({
  reducer: {
    library: booksReducer,
    externalBooks: externalBooksReducer,
    upload: uploadReducer,
    reader: readerReducer,
    ui: uiReducer,
    [booksApi.reducerPath]: booksApi.reducer, // RTK Query
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
  devTools: import.meta.env.MODE !== 'production',
})

//-----------------------------------------------------------------------------
//------ Barrel export 
//-----------------------------------------------------------------------------

export * from './books'
export * from './externalBooks'
export * from './upload'
export * from './reader'
export * from './ui'

export default store
