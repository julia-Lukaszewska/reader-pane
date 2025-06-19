/**
 * @file booksApiCollection.js
 * @description
 * Endpoints for fetching book collections (multiple books):
 * - getBooks: Fetches all user's private books (normalized with booksAdapter)
 * - getBooksStatic: Fetches static book list, cached for 24h (normalized with booksAdapter)
 */
import { booksApi }      from '../booksApi'
import { booksAdapter }  from '../booksAdapter'

//-----------------------------------------------------
//------ booksApiCollection Endpoints
//-----------------------------------------------------
/**
 * @constant booksApiCollection
 * @description Injects collection endpoints into the main booksApi.
 * @see getBooks
 * @see getBooksStatic
 */
export const booksApiCollection = booksApi.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    //-------------------------------------------------
    //------ getBooks Query
    //-------------------------------------------------
    /**
     * @function getBooks
     * @description Fetches all user's private books (GET /books/private).
     *              Normalizes result using booksAdapter.
     * @returns {{ids: string[], entities: object}}
     * @providesTags Books LIST and individual book IDs
     */
    getBooks: builder.query({
      query: () => '/books/private',
      keepUnusedDataFor: 86400, // cache for 24 hours
      transformResponse: response =>
        booksAdapter.setAll(booksAdapter.getInitialState(), response),
      providesTags: result =>
        result?.ids
          ? [
              { type: 'Books', id: 'LIST' },
              ...result.ids.map(id => ({ type: 'Books', id })),
            ]
          : [{ type: 'Books', id: 'LIST' }],
    }),

    //-------------------------------------------------
    //------ getBooksStatic Query
    //-------------------------------------------------
    /**
     * @function getBooksStatic
     * @description Fetches a static list of books (GET /books/private/static),
     *              cached for 24 hours. Normalizes result using booksAdapter.
     * @returns {{ids: string[], entities: object}}
     * @providesTags BooksStatic LIST
     */
    getBooksStatic: builder.query({
      query: () => '/books/private/static',
      keepUnusedDataFor: 86400, // 24 hours
      transformResponse: response =>
        booksAdapter.setAll(booksAdapter.getInitialState(), response),
      providesTags: [{ type: 'BooksStatic', id: 'LIST' }],
    }),
  }),
})

//-----------------------------------------------------
//------ Hooks Export
//-----------------------------------------------------
export const {
  useGetBooksQuery,
  useGetBooksStaticQuery,
} = booksApiCollection
