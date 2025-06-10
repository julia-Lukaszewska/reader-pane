import { booksAdapter } from './booksAdapter'

/**
 * Defines CRUD endpoints for Books.
 * @param {import('@reduxjs/toolkit').EndpointBuilder} builder - RTK query endpoint builder
 * @returns {object} Object containing the getBooks and getBooksStatic endpoints
 */
export const bookEndpoints = (builder) => ({
  /**
   * Fetches the list of private books.
   * @type {import('@reduxjs/toolkit/query').QueryDefinition<void, unknown, any, import('normalizr').NormalizedSchema<any, any>, 'booksApi'>}
   */
  getBooks: builder.query({
    /**
     * @returns {string} API URL for fetching private books
     */
    query: () => '/books/private',
    /**
     * Transforms the raw response into normalized state.
     * @param {Array<object>} response - Raw array of book objects
     * @returns {import('@reduxjs/toolkit').EntityState<any>} Normalized books state
     */
    transformResponse: (response) =>
      booksAdapter.setAll(booksAdapter.getInitialState(), response),
    providesTags: (res) =>
      res?.ids
        ? [{ type: 'Books', id: 'LIST' }, ...res.ids.map((id) => ({ type: 'Books', id }))]
        : [{ type: 'Books', id: 'LIST' }],
  }),

  /**
   * Fetches static list of private books, cached for 24h.
   */
  getBooksStatic: builder.query({
    query: () => '/books/private/static',
    keepUnusedDataFor: 86400,
    transformResponse: (response) =>
      booksAdapter.setAll(booksAdapter.getInitialState(), response),
    providesTags: [{ type: 'BooksStatic', id: 'LIST' }],
  }),
})
