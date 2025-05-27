// src/store/api/booksApi.js
/**
 * @file booksApi.js
 * @description
 * RTK Query API slice for all book-related endpoints:
 * fetch, update, delete, notes, bookmarks, progress, uploads, and more.
 * Uses booksAdapter for normalized static books.
 * Exports all query and mutation hooks for use in components.
 */

import { createApi } from '@reduxjs/toolkit/query/react'
import { createEntityAdapter } from '@reduxjs/toolkit'
import { customBaseQuery } from './baseQuery'

const booksAdapter = createEntityAdapter({ selectId: b => b._id })
export { booksAdapter }

const apiRoot = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api'

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Books', 'BooksStatic', 'Progress', 'Live'],
  endpoints: builder => ({
    // Static books list
    getBooksStatic: builder.query({
      query: () => '/books/static',
      keepUnusedDataFor: 86400,
      providesTags: [{ type: 'BooksStatic', id: 'LIST' }],
      transformResponse: response =>
        booksAdapter.setAll(booksAdapter.getInitialState(), response),
    }),
    // Live book data
    getBookLive: builder.query({
      query: id => `/books/${id}/live`,
      providesTags: (_r, _e, id) => [{ type: 'Live', id }],
    }),
    updateBookLive: builder.mutation({
      query: ({ id, changes }) => ({
        url: `/books/${id}/live`,
        method: 'PATCH',
        body: changes,
      }),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'Live', id }],
    }),
    // CRUD operations
    getBooks: builder.query({
      query: () => '/books',
      providesTags: result =>
        result
          ? [
              { type: 'Books', id: 'LIST' },
              ...result.map(b => ({ type: 'Books', id: b._id })),
            ]
          : [{ type: 'Books', id: 'LIST' }],
    }),
    getBook: builder.query({
      query: id => `/books/${id}`,
      providesTags: (_r, _e, id) => [{ type: 'Books', id }],
    }),
    getBookCache: builder.query({
      query: id => `/books/${id}/cache`,
      providesTags: (_r, _e, id) => [{ type: 'Books', id }],
    }),
    getBookFileUrl: builder.query({
      query: id => `/books/${id}/file-url`,
      keepUnusedDataFor: 600,
      refetchOnMountOrArgChange: false,
      transformResponse: response => response.fileUrl,
    }),
    archiveBook: builder.mutation({
      query: id => ({ url: `/books/${id}/archive`, method: 'PATCH' }),
      invalidatesTags: (_r, _e, id) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),
    restoreBook: builder.mutation({
      query: id => ({ url: `/books/${id}/restore`, method: 'PATCH' }),
      invalidatesTags: (_r, _e, id) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),
    favoriteBook: builder.mutation({
      query: id => ({ url: `/books/${id}/favorite`, method: 'PATCH' }),
      invalidatesTags: (_r, _e, id) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),
    unfavoriteBook: builder.mutation({
      query: id => ({ url: `/books/${id}/unfavorite`, method: 'PATCH' }),
      invalidatesTags: (_r, _e, id) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),
    deleteBook: builder.mutation({
      query: id => ({ url: `/books/${id}`, method: 'DELETE' }),
      invalidatesTags: (_r, _e, id) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),
    updateBook: builder.mutation({
      query: ({ id, changes }) => ({
        url: `/books/${id}`,
        method: 'PATCH',
        body: changes,
      }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
        { type: 'Progress', id },
      ],
    }),
    // Notes and bookmarks
    addNote: builder.mutation({
      query: ({ id, note }) => ({
        url: `/books/${id}/notes`,
        method: 'PATCH',
        body: note,
      }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),
    deleteNote: builder.mutation({
      query: ({ id, index }) => ({
        url: `/books/${id}/notes/${index}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),
    addBookmark: builder.mutation({
      query: ({ id, bookmark }) => ({
        url: `/books/${id}/bookmarks`,
        method: 'PATCH',
        body: bookmark,
      }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),
    deleteBookmark: builder.mutation({
      query: ({ id, index }) => ({
        url: `/books/${id}/bookmarks/${index}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),
    // Uploads
    uploadBook: builder.mutation({
      query: formData => ({ url: '/books/upload', method: 'POST', body: formData }),
      invalidatesTags: [
        { type: 'Books', id: 'LIST' },
        { type: 'BooksStatic', id: 'LIST' },
      ],
    }),
    // Progress tracking
    getProgress: builder.query({
      query: id => `/books/${id}/progress`,
      providesTags: (_r, _e, id) => [{ type: 'Progress', id }],
    }),
    updateProgress: builder.mutation({
      query: ({ id, currentPage }) => ({
        url: `/books/${id}/progress`,
        method: 'PATCH',
        body: { currentPage },
      }),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'Progress', id }],
    }),
    updateProgressAuto: builder.mutation({
      query: ({ id, currentPage }) => ({
        url: `/books/${id}/progress/auto`,
        method: 'PATCH',
        body: { changes: { stats: { currentPage } } },
      }),
      async onQueryStarted({ id, currentPage }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          booksApi.util.updateQueryData('getBooks', undefined, draft => {
            const book = draft.find(b => b._id === id)
            if (book) {
              book.stats.currentPage = currentPage
              book.stats.maxVisitedPage = Math.max(currentPage, book.stats.maxVisitedPage || 1)
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
    // Last opened timestamp
    updateLastOpened: builder.mutation({
      query: id => ({ url: `/books/${id}/last-opened`, method: 'PATCH' }),
      invalidatesTags: (_r, _e, id) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),
  }),
})

export const {
  useGetBooksStaticQuery,
  useGetBookLiveQuery,
  useUpdateBookLiveMutation,
  useGetBooksQuery,
  useGetBookQuery,
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
} = booksApi
