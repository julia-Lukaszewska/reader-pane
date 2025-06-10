// src/store/api/booksPrivateApi/booksApiCollection.js
/**
 * @file booksApiCollection.js
 * @description
 * Endpoints for working with book collections (multiple books).
 * - getBooks
 * - getBooksStatic (normalized via booksAdapter)
 */

import { booksApi } from '../booksApi'
import { booksAdapter } from './booksAdapter'

const extendedApi = booksApi.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books/private',
      providesTags: (result) =>
        result
          ? [
              { type: 'Books', id: 'LIST' },
              ...result.map((book) => ({ type: 'Books', id: book._id })),
            ]
          : [{ type: 'Books', id: 'LIST' }],
    }),
    getBooksStatic: builder.query({
      query: () => '/books/private/static',
      keepUnusedDataFor: 86400,
      providesTags: [{ type: 'BooksStatic', id: 'LIST' }],
      transformResponse: (response) =>
        booksAdapter.setAll(
          booksAdapter.getInitialState(),
          response
        ),
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetBooksQuery,
  useGetBooksStaticQuery,
} = extendedApi
