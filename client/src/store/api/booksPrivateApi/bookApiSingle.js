import { booksApi } from './booksApi'

/**
 * Extends booksApi with single-book operations.
 */
const extendedApi = booksApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    /**
     * Get a single book by ID.
     * @param {string} id - Book identifier
     */
    getBookById: builder.query({
      query: (id) => `/books/private/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Books', id }],
    }),

    /**
     * Updates a book's properties.
     * @param {{id: string, changes: object}} params
     */
    updateBook: builder.mutation({
      query: ({ id, changes }) => ({ url: `/books/private/${id}`, method: 'PATCH', body: changes }),
      invalidatesTags: (_res, _err, { id }) => [
        { type: 'Books', id }, { type: 'Books', id: 'LIST' }, { type: 'Progress', id },
      ],
    }),

    /**
     * Deletes a book by ID.
     * @param {string} id
     */
    deleteBook: builder.mutation({
      query: (id) => ({ url: `/books/private/${id}`, method: 'DELETE' }),
      invalidatesTags: (_res, _err, id) => [
        { type: 'Books', id }, { type: 'Books', id: 'LIST' }, { type: 'BooksStatic', id: 'LIST' },
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
})

export const {
  useGetBookByIdQuery,
  useGetBookCacheQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = extendedApi
