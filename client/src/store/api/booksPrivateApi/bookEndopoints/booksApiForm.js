/**
 * @file booksApiForm.js
 * @description
 * Endpoints for user form actions on existing books:
 * - getBookFileUrl: Fetches file download URL for a book
 * - addNote/deleteNote: Manage notes attached to a book
 * - addBookmark/deleteBookmark: Manage bookmarks
 * - updateBookRating: Rate a book (update flags.rating)
 */

import { booksApi } from '../booksApi'

//-----------------------------------------------------------------------------
// Endpoints: Book Form Actions (notes, bookmarks, rating)
//-----------------------------------------------------------------------------

export const booksApiForm = booksApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Fetches the file URL for downloading a book.
     * @param {string} id - Book ID
     */
    getBookFileUrl: builder.query({
      query: (id) => `/books/private/${id}/file-url`,
      refetchOnMountOrArgChange: true,
      transformResponse: (response) => response.fileUrl,
    }),

    /**
     * Adds a note to a book.
     * @param {{id: string, note: object}} param0
     */
    addNote: builder.mutation({
      query: ({ id, note }) => ({
        url: `/books/private/${id}/notes`,
        method: 'PATCH',
        body: note,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),

    /**
     * Deletes a note from a book by index.
     * @param {{id: string, index: number}} param0
     */
    deleteNote: builder.mutation({
      query: ({ id, index }) => ({
        url: `/books/private/${id}/notes/${index}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),

    /**
     * Adds a bookmark to a book.
     * @param {{id: string, bookmark: object}} param0
     */
    addBookmark: builder.mutation({
      query: ({ id, bookmark }) => ({
        url: `/books/private/${id}/bookmarks`,
        method: 'PATCH',
        body: bookmark,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),

    /**
     * Deletes a bookmark from a book by index.
     * @param {{id: string, index: number}} param0
     */
    deleteBookmark: builder.mutation({
      query: ({ id, index }) => ({
        url: `/books/private/${id}/bookmarks/${index}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),

    /**
     * Updates the book's rating (in flags).
     * @param {{id: string, rating: number}} param0
     */
    updateBookRating: builder.mutation({
      query: ({ id, rating }) => ({
        url: `/books/private/${id}`,
        method: 'PATCH',
        body: { flags: { rating } },
      }),
      async onQueryStarted({ id, rating }, { dispatch, queryFulfilled }) {
        // Optimistically update getBookById cache
        const patchOne = dispatch(
          booksApi.util.updateQueryData('getBookById', id, (draft) => {
            if (!draft.flags) draft.flags = {}
            draft.flags.rating = rating
          })
        )
        // Optimistically update getBooks cache
        const patchList = dispatch(
          booksApi.util.updateQueryData('getBooks', undefined, (draft) => {
            if (!draft.entities?.[id]?.flags) return
            draft.entities[id].flags.rating = rating
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchOne.undo()
          patchList.undo()
        }
      },
      // No invalidatesTags to avoid re-fetch
    }),
  }),
  overrideExisting: false,
})

//-----------------------------------------------------------------------------
// Exported RTK Query hooks
//-----------------------------------------------------------------------------

export const {
  useGetBookFileUrlQuery,
  useAddNoteMutation,
  useDeleteNoteMutation,
  useAddBookmarkMutation,
  useDeleteBookmarkMutation,
  useUpdateBookRatingMutation,
} = booksApiForm
