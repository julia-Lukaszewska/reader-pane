import { booksApi } from './booksApi'

/**
 * Injects the updateBookFlags mutation into the booksApi.
 */
const flagsApi = booksApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    /**
     * Mutates flags on a single book (e.g., archive, favorite).
     * @param {{id: string, flags: Record<string, boolean>}} params - Identifier and flags to update
     */
    updateBookFlags: builder.mutation({
      /**
       * @param {{id: string, flags: Record<string, boolean>}} arg
       * @returns {object} Query config for patching book flags
       */
      query: ({ id, flags }) => ({
        url: `/books/private/${id}`,
        method: 'PATCH',
        body: { flags },
      }),
      /**
       * Optimistically updates the cache for getBooks and getBookById.
       */
      async onQueryStarted({ id, flags }, { dispatch, queryFulfilled }) {
        const patchList = dispatch(
          booksApi.util.updateQueryData('getBooks', undefined, (draft) => {
            if (draft.entities?.[id]?.flags) Object.assign(draft.entities[id].flags, flags)
          })
        )
        const patchOne = dispatch(
          booksApi.util.updateQueryData('getBookById', id, (draft) => {
            if (draft.flags) Object.assign(draft.flags, flags)
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
})

export const { useUpdateBookFlagsMutation } = flagsApi
