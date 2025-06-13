/**
 * @file bookApiSingle.js
 * @description
 * Endpoints for single-book operations (CRUD by book ID).
 * - getBookById: Fetch a single book by ID
 * - updateBook: Update a single book's properties
 * - deleteBook: Delete a book by ID
 */

import { booksApi } from '../booksApi'

//-----------------------------------------------------------------------------
// Endpoints: Single Book (CRUD by ID)
//-----------------------------------------------------------------------------

/**
 * Injects endpoints for single book operations into the main booksApi.
 * Includes: getBookById, updateBook, deleteBook
 */
export const bookApiSingle = booksApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Fetches a single book by ID.
     * @param {string} id - Book identifier
     * @returns {object} Book object
     * @providesTags [{ type: 'Books', id }]
     */
    getBookById: builder.query({
      query: (id) => `/books/private/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Books', id }],
    }),

    /**
     * Updates properties of a single book.
     * @param {{id: string, changes: object}} params
     * @returns {object} Updated book object
     * @invalidatesTags [{ type: 'Books', id }, { type: 'Books', id: 'LIST' }, { type: 'Progress', id }]
     */
    updateBook: builder.mutation({
      query: ({ id, changes }) => ({
        url: `/books/private/${id}`,
        method: 'PATCH',
        body: changes,
      }),
      invalidatesTags: (_res, _err, { id }) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
        { type: 'Progress', id },
      ],
    }),

    /**
     * Deletes a book by ID.
     * @param {string} id - Book identifier
     * @returns {object} Deletion response
     * @invalidatesTags [{ type: 'Books', id }, { type: 'Books', id: 'LIST' }, { type: 'BooksStatic', id: 'LIST' }]
     */
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/private/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_res, _err, id) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
        { type: 'BooksStatic', id: 'LIST' },
      ],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          booksApi.util.updateQueryData('getBooks', undefined, (draft) => {
            if (!draft) return
            // Remove the deleted book from the cache
            draft.ids = draft.ids.filter((bookId) => bookId !== id)
            delete draft.entities[id]
          })
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

//-----------------------------------------------------------------------------
// Exported RTK Query hooks
//-----------------------------------------------------------------------------

export const {
  useGetBookByIdQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApiSingle

