/**
 * @file booksApiForm.js
 * @description
 * Endpoints related to form actions, notes, bookmarks, rating, and upload:
 * - uploadBook
 * - getBookFileUrl
 * - addNote / deleteNote
 * - addBookmark / deleteBookmark
 * - updateBookRating
 */

import { booksApi } from '../booksApi'

const extendedApi = booksApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadBook: builder.mutation({
      query: (formData) => ({
        url: '/books/storage',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [
        { type: 'Books', id: 'LIST' },
        { type: 'BooksStatic', id: 'LIST' },
      ],
    }),

    getBookFileUrl: builder.query({
      query: (id) => `/books/private/${id}/file-url`,
      refetchOnMountOrArgChange: true,
      transformResponse: (response) => response.fileUrl,
    }),

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

    updateBookRating: builder.mutation({
      query: ({ id, rating }) => ({
        url: `/books/private/${id}`,
        method: 'PATCH',
        body: { flags: { rating } },
      }),
      async onQueryStarted({ id, rating }, { dispatch, queryFulfilled }) {
        const patchOne = dispatch(
          booksApi.util.updateQueryData('getBookById', id, (draft) => {
            if (!draft.flags) draft.flags = {}
            draft.flags.rating = rating
          })
        )
        const patchList = dispatch(
          booksApi.util.updateQueryData('getBooks', undefined, (draft) => {
            const book = draft.find((b) => b._id === id)
            if (book) {
              if (!book.flags) book.flags = {}
              book.flags.rating = rating
            }
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchOne.undo()
          patchList.undo()
        }
      },
      // intentionally no invalidatesTags to avoid re-fetches
    }),
  }),
  overrideExisting: false,
})

export const {
  useUploadBookMutation,
  useGetBookFileUrlQuery,
  useAddNoteMutation,
  useDeleteNoteMutation,
  useAddBookmarkMutation,
  useDeleteBookmarkMutation,
  useUpdateBookRatingMutation,
} = extendedApi
