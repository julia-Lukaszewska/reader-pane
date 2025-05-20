import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createEntityAdapter } from '@reduxjs/toolkit'

// Adapter for normalizing static books
const booksAdapter = createEntityAdapter({ selectId: (b) => b._id })
export { booksAdapter }

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api/books',
    credentials: 'include',
  }),
  tagTypes: ['Books', 'Progress', 'Live'],
  endpoints: (builder) => ({

    // GET /static — static metadata
    getBooksStatic: builder.query({
      query: () => '/static',
      keepUnusedDataFor: 86400, // cache 24h
      transformResponse: (response) =>
        booksAdapter.setAll(booksAdapter.getInitialState(), response),
    }),

    // GET /:id/live — flags + stats
    getBookLive: builder.query({
      query: (id) => `/${id}/live`,
      providesTags: (_r, _e, id) => [{ type: 'Live', id }],
    }),
    updateBookLive: builder.mutation({
      query: ({ id, changes }) => ({ url: `/${id}/live`, method: 'PATCH', body: changes }),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'Live', id }],
    }),

    // GET / — all books
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

    // GET /:id — single book
    getBook: builder.query({
      query: (id) => `/${id}`,
      providesTags: (_r, _e, id) => [{ type: 'Books', id }],
    }),

    // GET /:id/cache — PDF cache
    getBookCache: builder.query({
      query: (id) => `/${id}/cache`,
      providesTags: (_r, _e, id) => [{ type: 'Books', id }],
    }),

    // GET /:id/file-url — file URL only
    getBookFileUrl: builder.query({
      query: (id) => `/${id}/file-url`,
      keepUnusedDataFor: 600,
      refetchOnMountOrArgChange: false,
      transformResponse: (response) => response.fileUrl,
    }),

    // PATCH /:id/archive
    archiveBook: builder.mutation({
      query: (id) => ({ url: `/${id}/archive`, method: 'PATCH' }),
      invalidatesTags: (_r, _e, id) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),

    // PATCH /:id/restore
    restoreBook: builder.mutation({
      query: (id) => ({ url: `/${id}/restore`, method: 'PATCH' }),
      invalidatesTags: (_r, _e, id) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),

    // PATCH /:id/favorite
    favoriteBook: builder.mutation({
      query: (id) => ({ url: `/${id}/favorite`, method: 'PATCH' }),
      invalidatesTags: (_r, _e, id) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),

    // PATCH /:id/unfavorite
    unfavoriteBook: builder.mutation({
      query: (id) => ({ url: `/${id}/unfavorite`, method: 'PATCH' }),
      invalidatesTags: (_r, _e, id) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),

    // DELETE /:id
    deleteBook: builder.mutation({
      query: (id) => ({ url: `/${id}`, method: 'DELETE' }),
      invalidatesTags: (_r, _e, id) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),

    // PATCH /:id — update meta, flags, stats
    updateBook: builder.mutation({
      query: ({ id, changes }) => ({ url: `/${id}`, method: 'PATCH', body: changes }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
        { type: 'Progress', id },
      ],
    }),

    // PATCH /:id/notes — add note
    addNote: builder.mutation({
      query: ({ id, note }) => ({ url: `/${id}/notes`, method: 'PATCH', body: note }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),

    // DELETE /:id/notes/:index
    deleteNote: builder.mutation({
      query: ({ id, index }) => ({ url: `/${id}/notes/${index}`, method: 'DELETE' }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),

    // PATCH /:id/bookmarks — add bookmark
    addBookmark: builder.mutation({
      query: ({ id, bookmark }) => ({ url: `/${id}/bookmarks`, method: 'PATCH', body: bookmark }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),

    // DELETE /:id/bookmarks/:index
    deleteBookmark: builder.mutation({
      query: ({ id, index }) => ({ url: `/${id}/bookmarks/${index}`, method: 'DELETE' }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),

    // POST /upload — upload new book
    uploadBook: builder.mutation({
      query: (formData) => ({ url: `/upload`, method: 'POST', body: formData }),
      invalidatesTags: [{ type: 'Books', id: 'LIST' }],
    }),

    // GET /:id/progress
    getProgress: builder.query({
      query: (id) => `/${id}/progress`,
      providesTags: (_r, _e, id) => [{ type: 'Progress', id }],
    }),

    // PATCH /:id/progress — manual update
    updateProgress: builder.mutation({
      query: ({ id, currentPage }) => ({
        url: `/${id}/progress`,
        method: 'PATCH',
        body: { currentPage },
      }),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'Progress', id }],
    }),

    // PATCH /:id/progress/auto — optimistic update
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

    // PATCH /:id/last-opened
    updateLastOpened: builder.mutation({
      query: (id) => ({ url: `/${id}/last-opened`, method: 'PATCH' }),
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
