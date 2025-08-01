/**
 * @file booksApiStats.js
 * @description
 * Endpoints related to book statistics and reading progress:
 * - getBookLive:       Get real-time ("live") book stats
 * - updateBookLive:    Update real-time stats
 * - getProgress:       Get reading progress for a book
 * - updateProgress:    Update progress (current page, max page)
 * - updateProgressAuto:Update progress automatically (background/save-on-exit)
 * - updateLastOpened:  Update last opened timestamp for a book
 */

import { booksApi } from '../booksApi'

//-----------------------------------------------------------------------------
// Endpoints: Book Statistics & Reading Progress
//-----------------------------------------------------------------------------

/**
 * Injects endpoints for book statistics and progress management into booksApi.
 */
export const booksApiStats = booksApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Gets live stats for a book (real-time progress, activity, etc).
     * @param {string} id - Book ID
     * @returns {object} Live stats for the book
     * @providesTags [{ type: 'Live', id }]
     */
    getBookLive: builder.query({
      query: (id) => `/books/private/${id}/live`,
      providesTags: (_result, _error, id) => [{ type: 'Live', id }],
    }),

    /**
     * Updates live stats for a book (real-time).
     * @param {{id: string, changes: object}} params
     * @returns {object} Updated live stats
     * @invalidatesTags [{ type: 'Live', id }]
     */
    updateBookLive: builder.mutation({
      query: ({ id, changes }) => ({
        url: `/books/private/${id}/live`,
        method: 'PATCH',
        body: { stats: changes },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Live', id }],
    }),

    /**
     * Gets reading progress for a book.
     * @param {string} id - Book ID
     * @returns {object} Progress object (currentPage, maxVisitedPage, etc.)
     * @providesTags [{ type: 'Progress', id }]
     */
    getProgress: builder.query({
      query: (id) => `/books/private/${id}/progress`,
      providesTags: (_result, _error, id) => [{ type: 'Progress', id }],
    }),

    /**
     * Updates reading progress (current page, max visited page).
     * Optimistically updates cache for getBooks and getBookById.
     * @param {{id: string, currentPage: number}} params
     * @returns {object} Updated progress
     * @invalidatesTags [{ type: 'Progress', id }]
     */
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
            // If using adapter:
            if (draft.entities?.[id]) {
              draft.entities[id].stats.currentPage = currentPage
              draft.entities[id].stats.maxVisitedPage = Math.max(
                currentPage,
                draft.entities[id].stats.maxVisitedPage || 1
              )
            } else {
              // For legacy: array
              const book = draft.find((b) => b._id === id)
              if (book) {
                book.stats.currentPage = currentPage
                book.stats.maxVisitedPage = Math.max(
                  currentPage,
                  book.stats.maxVisitedPage || 1
                )
              }
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
    }),

    /**
     * Automatically updates progress (e.g. background or on unmount).
     * Optimistically updates cache for getBooks.
     * @param {{id: string, currentPage: number}} params
     * @returns {object} Updated progress
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
            if (draft.entities?.[id]) {
              draft.entities[id].stats.currentPage = currentPage
              draft.entities[id].stats.maxVisitedPage = Math.max(
                currentPage,
                draft.entities[id].stats.maxVisitedPage || 1
              )
            } else {
              const book = draft.find((b) => b._id === id)
              if (book) {
                book.stats.currentPage = currentPage
                book.stats.maxVisitedPage = Math.max(
                  currentPage,
                  book.stats.maxVisitedPage || 1
                )
              }
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
     * Updates the "last opened" timestamp for a book.
     * @param {string} id - Book ID
     * @returns {object} Updated book object with new lastOpenedAt
     * @invalidatesTags [{ type: 'Books', id }, { type: 'Books', id: 'LIST' }]
     */
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

//-----------------------------------------------------------------------------
// Exported RTK Query hooks
//-----------------------------------------------------------------------------

export const {
  useGetBookLiveQuery,
  useUpdateBookLiveMutation,
  useGetProgressQuery,
  useUpdateProgressMutation,
  useUpdateProgressAutoMutation,
  useUpdateLastOpenedMutation,
} = booksApiStats

