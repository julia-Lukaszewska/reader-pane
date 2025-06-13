/**
 * @file booksApiCollection.js
 * @description
 * Endpoints for fetching book collections (multiple books).
 * - getBooks: Fetches all user's private books (normalized with booksAdapter)
 * - getBooksStatic: Fetches static book list, cached for 24h (normalized with booksAdapter)
 */

import { booksApi } from '../booksApi'
import { booksAdapter } from '../booksAdapter'

//-----------------------------------------------------------------------------
// Endpoints: Book Collections (Lists of Books)
//-----------------------------------------------------------------------------

/**
 * Injects endpoints for fetching book collections into the main booksApi.
 * @see getBooks         Fetch all user's books, normalized.
 * @see getBooksStatic   Fetch static book list, cached for 24h, normalized.
 */
export const booksApiCollection = booksApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Fetches all user's private books (GET /books/private).
     * Normalizes result with booksAdapter for fast access by ID.
     *
     * @returns {object} Normalized books state: { ids, entities }
     * @providesTags [{ type: 'Books', id: 'LIST' }, { type: 'Books', id }]
     */
    getBooks: builder.query({
      query: () => '/books/private',
      transformResponse: (response) =>
        booksAdapter.setAll(booksAdapter.getInitialState(), response),
      providesTags: (result) =>
        result?.ids
          ? [
              { type: 'Books', id: 'LIST' },
              ...result.ids.map((id) => ({ type: 'Books', id })),
            ]
          : [{ type: 'Books', id: 'LIST' }],
    }),

    /**
     * Fetches a static list of books (GET /books/private/static).
     * Cached for 24 hours. Normalizes result with booksAdapter.
     *
     * @returns {object} Normalized books state: { ids, entities }
     * @providesTags [{ type: 'BooksStatic', id: 'LIST' }]
     */
    getBooksStatic: builder.query({
      query: () => '/books/private/static',
      keepUnusedDataFor: 86400, // 24 hours in seconds
      transformResponse: (response) =>
        booksAdapter.setAll(booksAdapter.getInitialState(), response),
      providesTags: [{ type: 'BooksStatic', id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
})

//-----------------------------------------------------------------------------
// Exported RTK Query hooks
//-----------------------------------------------------------------------------

export const {
  useGetBooksQuery,
  useGetBooksStaticQuery,
} = booksApiCollection

