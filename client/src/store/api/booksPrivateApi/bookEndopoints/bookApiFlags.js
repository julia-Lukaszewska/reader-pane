/**
 * @file bookApiFlags.js
 * @description
 * Endpoints for mutating book flags (e.g., archive, favorite).
 * - updateBookFlags: PATCH flags on a single book (e.g., isArchived, isFavorited)
 */

import { booksApi } from '../booksApi'

//-----------------------------------------------------------------------------
// Endpoints: Book Flags (archive, favorite, downloaded, etc.)
//-----------------------------------------------------------------------------

/**
 * Injects the updateBookFlags mutation into the main booksApi.
 * Use for updating flags on a single book (e.g., archive, favorite).
 */
export const bookApiFlags = booksApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Mutates flags on a single book (PATCH /books/private/:id).
     * Sends only the changed flags, e.g. { flags: { isArchived: true } }
     * Optimistically updates the cache for both getBooks and getBookById.
     *
     * @param {{id: string, flags: Record<string, boolean>}} params - Book ID and flags object
     * @returns {object} Updated book with new flags
     * @invalidatesTags [{ type: 'Books', id }]
     */
    updateBookFlags: builder.mutation({
      query: ({ id, flags }) => ({
        url: `/books/private/${id}`,
        method: 'PATCH',
        body: { flags },
      }),
      async onQueryStarted({ id, flags }, { dispatch, queryFulfilled }) {
        // Optimistically update getBooks cache
        const patchList = dispatch(
          booksApi.util.updateQueryData('getBooks', undefined, (draft) => {
            if (draft.entities?.[id]?.flags) Object.assign(draft.entities[id].flags, flags)
          })
        )
        // Optimistically update getBookById cache
        const patchOne = dispatch(
          booksApi.util.updateQueryData('getBookById', id, (draft) => {
            if (draft?.flags) Object.assign(draft.flags, flags)
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchList.undo()
          patchOne.undo()
        }
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Books', id }],
    }),
  }),
  overrideExisting: false,
})

//-----------------------------------------------------------------------------
// Exported RTK Query hooks
//-----------------------------------------------------------------------------

export const { useUpdateBookFlagsMutation } = bookApiFlags

