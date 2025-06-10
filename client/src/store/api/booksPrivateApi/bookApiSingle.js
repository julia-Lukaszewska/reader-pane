/**
 * @file bookApiSingle.js
 * @description
 * Endpoints for operations on a single book:
 * - getBookById
 * - getBookCache
 * - updateBook
 * - deleteBook
 */

import { booksApi } from '../booksApi'

const extendedApi = booksApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookById: builder.query({
      query: (id) => `/books/private/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Books', id }],
    }),

    getBookCache: builder.query({
      query: (id) => `/books/private/${id}/cache`,
      providesTags: (_result, _error, id) => [{ type: 'Books', id }],
    }),

    updateBook: builder.mutation({
      query: ({ id, changes }) => ({
        url: `/books/private/${id}`,
        method: 'PATCH',
        body: changes,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
        { type: 'Progress', id },
      ],
    }),

    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/private/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
        { type: 'BooksStatic', id: 'LIST' },
      ],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          booksApi.util.updateQueryData('getBooks', undefined, (draft) =>
            draft?.filter((book) => book._id !== id)
          )
        )
        try {
          await queryFulfilled
        } catch {
          patch.undo()
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetBookByIdQuery,
  useGetBookCacheQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = extendedApi
