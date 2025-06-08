/**
 * @file booksApi.js
 * @description
 * RTK Query API slice for all book-related endpoints:
 * fetch, update, delete, notes, bookmarks, progress, uploads, and more.
 * Uses booksAdapter for normalized static book data.
 * Exports all query and mutation hooks for use in components.
 */

import { createApi } from '@reduxjs/toolkit/query/react'
import { createEntityAdapter } from '@reduxjs/toolkit'
import { customBaseQuery } from './baseQuery'

/**
 * Entity adapter for normalizing book data by _id.
 */
const booksAdapter = createEntityAdapter({ selectId: (book) => book._id })
export { booksAdapter }

const apiRoot = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api'

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Books', 'BooksStatic', 'Progress', 'Live'],
  endpoints: (builder) => ({
    /**
     * Fetches the static list of books (no frequent updates).
     * Caches data for 24 hours.
     * @returns {NormalizedState} Normalized state of all static books.
     */
    getBooksStatic: builder.query({
      query: () => '/books/private/${id}/static',
      keepUnusedDataFor: 86400,
      providesTags: [{ type: 'BooksStatic', id: 'LIST' }],
      transformResponse: (response) =>
        booksAdapter.setAll(booksAdapter.getInitialState(), response),
    }),

    /**
     * Fetches live data for a single book by ID.
     * @param {string} id - Book ID.
     * @returns {Book} Live book data.
     */
    getBookLive: builder.query({
      query: (id) => `/books/private/${id}/live`,
      providesTags: (_result, _error, id) => [{ type: 'Live', id }],
    }),

    /**
     * Updates live data for a single book.
     * @param {object} arg - Arguments object.
     * @param {string} arg.id - Book ID.
     * @param {object} arg.changes - Partial data to patch.
     */
    updateBookLive: builder.mutation({
      query: ({ id, changes }) => ({
        url: `/books/private/${id}/live`,
        method: 'PATCH',
        body: changes,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Live', id }],
    }),

    /**
     * Fetches all books (dynamic list).
     * Provides tags for individual books and a LIST tag.
     * @returns {Book[]} Array of book objects.
     */
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

    /**
     * Fetches a book by its ID.
     * @param {string} id - Book ID.
     * @returns {Book} Single book object.
     */
    getBookById: builder.query({
      query: (id) => `/books/private/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Books', id }],
    }),

    /**
     * Fetches cached data for a single book.
     * @param {string} id - Book ID.
     * @returns {Book} Cached book data.
     */
    getBookCache: builder.query({
      query: (id) => `/books/private/${id}/cache`,
      providesTags: (_result, _error, id) => [{ type: 'Books', id }],
    }),

    /**
     * Retrieves the file URL for a book (e.g., PDF or EPUB).
     * Always refetches when mounted or when the argument changes.
     * @param {string} id - Book ID.
     * @returns {string} File URL.
     */
    getBookFileUrl: builder.query({
      query: (id) => `/books/private/${id}/file-url`,
      refetchOnMountOrArgChange: true,
      transformResponse: (response) => response.fileUrl,
    }),

    /**
     * Archives a book (flags it as archived on the server).
     * Invalidates the individual book and the list.
     * @param {string} id - Book ID.
     */
    archiveBook: builder.mutation({
      query: (id) => ({ url: `/books/private/${id}/archive`, method: 'PATCH' }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),

    /**
     * Restores an archived book.
     * Invalidates the individual book and the list.
     * @param {string} id - Book ID.
     */
    restoreBook: builder.mutation({
      query: (id) => ({ url: `/books/private/${id}/restore`, method: 'PATCH' }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),

    /**
     * Marks a book as a favorite.
     * Invalidates the individual book and the list.
     * @param {string} id - Book ID.
     */
    favoriteBook: builder.mutation({
      query: (id) => ({ url: `/books/private/${id}/favorite`, method: 'PATCH' }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),

    /**
     * Unmarks a book as a favorite.
     * Invalidates the individual book and the list.
     * @param {string} id - Book ID.
     */
    unfavoriteBook: builder.mutation({
      query: (id) => ({ url: `/books/private/${id}/unfavorite`, method: 'PATCH' }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),

    /**
     * Deletes a book by its ID.
     * Invalidates the individual book, the dynamic list, and the static list.
     * Also optimistically removes the book from getBooks cache.
     * @param {string} id - Book ID.
     */
    deleteBook: builder.mutation({
      query: (id) => ({ url: `/books/private/${id}`, method: 'DELETE' }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
        { type: 'BooksStatic', id: 'LIST' },
      ],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          booksApi.util.updateQueryData('getBooks', undefined, (draft) => {
            return draft?.filter((book) => book._id !== id)
          })
        )
        try {
          await queryFulfilled
        } catch {
          patch.undo()
        }
      },
    }),

    /**
     * Updates arbitrary fields of a book.
     * Invalidates the individual book, the list, and its progress tag.
     * @param {object} arg - Arguments object.
     * @param {string} arg.id - Book ID.
     * @param {object} arg.changes - Partial data to patch.
     */
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

    /**
     * Adds a note to a book.
     * Invalidates the individual book and the list.
     * @param {object} arg - Arguments object.
     * @param {string} arg.id - Book ID.
     * @param {object} arg.note - Note data to append.
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
     * Invalidates the individual book and the list.
     * @param {object} arg - Arguments object.
     * @param {string} arg.id - Book ID.
     * @param {number} arg.index - Index of the note to delete.
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
     * Invalidates the individual book and the list.
     * @param {object} arg - Arguments object.
     * @param {string} arg.id - Book ID.
     * @param {object} arg.bookmark - Bookmark data to append.
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
     * Invalidates the individual book and the list.
     * @param {object} arg - Arguments object.
     * @param {string} arg.id - Book ID.
     * @param {number} arg.index - Index of the bookmark to delete.
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
     * Uploads a new book file (e.g., PDF/EPUB).
     * Invalidates both the dynamic and static book lists.
     * @param {FormData} formData - FormData containing file and metadata.
     */
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

    /**
     * Fetches reading progress for a book.
     * Provides a Progress tag for cache invalidation.
     * @param {string} id - Book ID.
     * @returns {object} Progress data (e.g., currentPage, maxVisitedPage).
     */
    getProgress: builder.query({
      query: (id) => `/books/private/${id}/progress`,
      providesTags: (_result, _error, id) => [{ type: 'Progress', id }],
    }),

    /**
     * Updates manual reading progress for a book.
     * Optimistically updates currentPage and maxVisitedPage in both the getBooks
     * list and the getBookById cache. Rolls back changes on error.
     * Invalidates the Progress tag on success.
     * @param {object} arg - Arguments object.
     * @param {string} arg.id - Book ID.
     * @param {number} arg.currentPage - New current page.
     */
    updateProgress: builder.mutation({
      query: ({ id, currentPage }) => ({
        url: `/books/private/${id}/progress`,
        method: 'PATCH',
        body: { currentPage },
      }),
      async onQueryStarted({ id, currentPage }, { dispatch, queryFulfilled }) {
        const patchBooks = dispatch(
          booksApi.util.updateQueryData('getBooks', undefined, (draft) => {
            const book = draft.find((b) => b._id === id)
            if (book) {
              book.stats.currentPage = currentPage
              book.stats.maxVisitedPage = Math.max(
                currentPage,
                book.stats.maxVisitedPage || 1
              )
            }
          })
        )

        const patchOne = dispatch(
          booksApi.util.updateQueryData('getBookById', id, (draft) => {
            if (!draft.stats) draft.stats = {}
            draft.stats.currentPage = currentPage
            draft.stats.maxVisitedPage = Math.max(
              currentPage,
              draft.stats.maxVisitedPage || 1
            )
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchBooks.undo()
          patchOne.undo()
        }
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Progress', id }],
    }),

    /**
     * Updates reading progress automatically (e.g., when user opens a page).
     * Optimistically updates currentPage and maxVisitedPage in the getBooks list.
     * Rolls back on error.
     * @param {object} arg - Arguments object.
     * @param {string} arg.id - Book ID.
     * @param {number} arg.currentPage - New current page.
     */
    updateProgressAuto: builder.mutation({
      query: ({ id, currentPage }) => ({
        url: `/books/private/${id}/progress/auto`,
        method: 'PATCH',
        body: { changes: { stats: { currentPage } } },
      }),
      async onQueryStarted({ id, currentPage }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          booksApi.util.updateQueryData('getBooks', undefined, (draft) => {
            const book = draft.find((b) => b._id === id)
            if (book) {
              book.stats.currentPage = currentPage
              book.stats.maxVisitedPage = Math.max(
                currentPage,
                book.stats.maxVisitedPage || 1
              )
            }
          })
        )
        try {
          await queryFulfilled
        } catch {
          patch.undo()
        }
      },
    }),

    /**
     * Updates the last opened timestamp for a book.
     * Invalidates the individual book and the list.
     * @param {string} id - Book ID.
     */
    updateLastOpened: builder.mutation({
      query: (id) => ({ url: `/books/private/${id}/last-opened`, method: 'PATCH' }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),

    /**
     * Updates only the rating flag for a book, with optimistic cache update.
     * Does not invalidate tags to avoid refetching entire book or list.
     * Rolls back on error.
     * @param {object} arg - Arguments object.
     * @param {string} arg.id - Book ID.
     * @param {number} arg.rating - New rating value (1–5).
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
        // Optimistically update getBooks list cache
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
      // No invalidatesTags, so no automatic refetch of progress or book data
    }),
  }),
})

export const {
  useGetBooksStaticQuery,
  useGetBookLiveQuery,
  useUpdateBookLiveMutation,
  useGetBooksQuery,
  useGetBookByIdQuery,
  useGetBookCacheQuery,
  useGetBookFileUrlQuery,
  useArchiveBookMutation,
  useRestoreBookMutation,
  useFavoriteBookMutation,
  useUnfavoriteBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useAddNoteMutation,
  useDeleteNoteMutation,
  useAddBookmarkMutation,
  useDeleteBookmarkMutation,
  useUploadBookMutation,
  useGetProgressQuery,
  useUpdateProgressMutation,
  useUpdateProgressAutoMutation,
  useUpdateLastOpenedMutation,
  useUpdateBookRatingMutation,
} = booksApi
