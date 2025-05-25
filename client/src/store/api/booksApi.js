/**
 * @file booksApi.js
 * @description
 * RTK Query API slice for all book-related endpoints:
 * fetch, update, delete, notes, bookmarks, progress, uploads, and more.
 * Uses booksAdapter for normalized static books.
 * Exports all query and mutation hooks for use in components.
 */

//------------------------------------------------------------------  
//---- Adapter & base API root                                      
//------------------------------------------------------------------  
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createEntityAdapter } from '@reduxjs/toolkit'

const booksAdapter = createEntityAdapter({ selectId: (b) => b._id })
export { booksAdapter }

const apiRoot = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api'

//------------------------------------------------------------------  
//---- booksApi slice (RTK Query)                                    
//------------------------------------------------------------------  
export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiRoot}/books`,
    credentials: 'include',
  }),
  tagTypes: ['Books', 'Progress', 'Live'],
  endpoints: (builder) => ({
    //------------------------------------------------------------------  
    //---- Queries & mutations                                         
    //------------------------------------------------------------------  

    getBooksStatic: builder.query({
      query: () => '/static',
      keepUnusedDataFor: 86400,
      providesTags: [{ type: 'BooksStatic', id: 'LIST' }],
      transformResponse: (response) =>
        booksAdapter.setAll(booksAdapter.getInitialState(), response),
    }),

    getBookLive: builder.query({
      query: (id) => `/${id}/live`,
      providesTags: (_r, _e, id) => [{ type: 'Live', id }],
    }),

    updateBookLive: builder.mutation({
      query: ({ id, changes }) => ({ url: `/${id}/live`, method: 'PATCH', body: changes }),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'Live', id }],
    }),

    getBooks: builder.query({
      query: () => '/',
      providesTags: (result) =>
        result
          ? [
              { type: 'Books', id: 'LIST' },
              ...result.map((b) => ({ type: 'Books', id: b._id })),
            ]
          : [{ type: 'Books', id: 'LIST' }],
    }),

    getBook: builder.query({
      query: (id) => `/${id}`,
      providesTags: (_r, _e, id) => [{ type: 'Books', id }],
    }),

    getBookCache: builder.query({
      query: (id) => `/${id}/cache`,
      providesTags: (_r, _e, id) => [{ type: 'Books', id }],
    }),

    getBookFileUrl: builder.query({
      query: (id) => `/${id}/file-url`,
      keepUnusedDataFor: 600,
      refetchOnMountOrArgChange: false,
      transformResponse: (response) => response.fileUrl,
    }),

    archiveBook: builder.mutation({
      query: (id) => ({ url: `/${id}/archive`, method: 'PATCH' }),
      invalidatesTags: (_r, _e, id) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),

    restoreBook: builder.mutation({
      query: (id) => ({ url: `/${id}/restore`, method: 'PATCH' }),
      invalidatesTags: (_r, _e, id) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),

    favoriteBook: builder.mutation({
      query: (id) => ({ url: `/${id}/favorite`, method: 'PATCH' }),
      invalidatesTags: (_r, _e, id) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),

    unfavoriteBook: builder.mutation({
      query: (id) => ({ url: `/${id}/unfavorite`, method: 'PATCH' }),
      invalidatesTags: (_r, _e, id) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),

    deleteBook: builder.mutation({
      query: (id) => ({ url: `/${id}`, method: 'DELETE' }),
      invalidatesTags: (_r, _e, id) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),

    updateBook: builder.mutation({
      query: ({ id, changes }) => ({ url: `/${id}`, method: 'PATCH', body: changes }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
        { type: 'Progress', id },
      ],
    }),

    addNote: builder.mutation({
      query: ({ id, note }) => ({ url: `/${id}/notes`, method: 'PATCH', body: note }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),

    deleteNote: builder.mutation({
      query: ({ id, index }) => ({ url: `/${id}/notes/${index}`, method: 'DELETE' }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),

    addBookmark: builder.mutation({
      query: ({ id, bookmark }) => ({ url: `/${id}/bookmarks`, method: 'PATCH', body: bookmark }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),

    deleteBookmark: builder.mutation({
      query: ({ id, index }) => ({ url: `/${id}/bookmarks/${index}`, method: 'DELETE' }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),

    uploadBook: builder.mutation({
      query: (formData) => ({ url: '/upload', method: 'POST', body: formData }),
      invalidatesTags: [
        { type: 'Books', id: 'LIST' },
        { type: 'BooksStatic', id: 'LIST' },
    ],
    }),

    getProgress: builder.query({
      query: (id) => `/${id}/progress`,
      providesTags: (_r, _e, id) => [{ type: 'Progress', id }],
    }),

    updateProgress: builder.mutation({
      query: ({ id, currentPage }) => ({
        url: `/${id}/progress`,
        method: 'PATCH',
        body: { currentPage },
      }),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'Progress', id }],
    }),

    updateProgressAuto: builder.mutation({
      query: ({ id, currentPage }) => ({
        url: `/${id}/progress/auto`,
        method: 'PATCH',
        body: { changes: { stats: { currentPage } } },
      }),
      async onQueryStarted({ id, currentPage }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          booksApi.util.updateQueryData('getBooks', undefined, (draft) => {
            const book = draft.find((b) => b._id === id)
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

    updateLastOpened: builder.mutation({
      query: (id) => ({ url: `/${id}/last-opened`, method: 'PATCH' }),
      invalidatesTags: (_r, _e, id) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),
  }),
})

//------------------------------------------------------------------  
//---- Export query and mutation hooks                               
//------------------------------------------------------------------  
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
