/**
 * @file booksApiStats.js
 * @description
 * Endpoints related to book statistics and reading progress:
 * - getBookLive
 * - updateBookLive
 * - getProgress
 * - updateProgress
 * - updateProgressAuto
 * - updateLastOpened
 */

import { booksApi } from '../booksApi'

const extendedApi = booksApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookLive: builder.query({
      query: (id) => `/books/private/${id}/live`,
      providesTags: (_result, _error, id) => [{ type: 'Live', id }],
    }),

    updateBookLive: builder.mutation({
      query: ({ id, changes }) => ({
        url: `/books/private/${id}/live`,
        method: 'PATCH',
        body: { stats: changes },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Live', id }],
    }),

    getProgress: builder.query({
      query: (id) => `/books/private/${id}/progress`,
      providesTags: (_result, _error, id) => [{ type: 'Progress', id }],
    }),

    updateProgress: builder.mutation({
      query: ({ id, currentPage }) => ({
        url: `/books/private/${id}/progress`,
        method: 'PATCH',
        body: { currentPage },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Progress', id }],
      async onQueryStarted({ id, currentPage }, { dispatch, queryFulfilled }) {
        const patchBooks = dispatch(
          booksApi.util.updateQueryData('getBooks', undefined, (draft) => {
            const book = draft.find((b) => b._id === id)
            if (book) {
              book.stats.currentPage = currentPage
              book.stats.maxVisitedPage = Math.max(currentPage, book.stats.maxVisitedPage || 1)
            }
          })
        )

        const patchOne = dispatch(
          booksApi.util.updateQueryData('getBookById', id, (draft) => {
            if (!draft.stats) draft.stats = {}
            draft.stats.currentPage = currentPage
            draft.stats.maxVisitedPage = Math.max(currentPage, draft.stats.maxVisitedPage || 1)
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchBooks.undo()
          patchOne.undo()
        }
      },
    }),

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
      query: (id) => ({
        url: `/books/private/${id}/last-opened`,
        method: 'PATCH',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetBookLiveQuery,
  useUpdateBookLiveMutation,
  useGetProgressQuery,
  useUpdateProgressMutation,
  useUpdateProgressAutoMutation,
  useUpdateLastOpenedMutation,
} = extendedApi
