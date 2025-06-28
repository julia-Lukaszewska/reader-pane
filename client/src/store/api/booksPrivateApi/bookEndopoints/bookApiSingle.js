/**
 * @file bookApiSingle.js
 * @description
 * Endpoints for single-book operations (CRUD by book ID):
 * - getBookById: Fetch a single book by ID
 * - updateBook: Update a single book's properties
 * - deleteBook: Delete a book by ID
 */
import { booksApi } from '../booksApi'

//-----------------------------------------------------
//------ bookApiSingle Endpoints
//-----------------------------------------------------
/**
 * @constant bookApiSingle
 * @description Injects endpoints for single-book CRUD into the main booksApi.
 */
export const bookApiSingle = booksApi.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    //-------------------------------------------------
    //------ getBookById Query
    //-------------------------------------------------
    /**
     * @function getBookById
     * @description Fetches a single book by ID.
     * @param {string} id - Book identifier
     * @returns {object} Book object
     * @providesTags [{ type: 'Books', id }]
     */
    getBookById: builder.query({
      query: id => `/books/private/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Books', id }],
    }),

    //-------------------------------------------------
    //------ updateBook Mutation
    //-------------------------------------------------
    /**
     * @function updateBook
     * @description Updates properties of a single book.
     * @param {{id: string, changes: object}} params
     * @returns {object} Updated book object
     * @invalidatesTags [
     *   { type: 'Books', id },
     *   { type: 'Books', id: 'LIST' },
     *   { type: 'Progress', id }
     * ]
     */
    updateBook: builder.mutation({
      query: ({ id, changes }) => ({
        url: `/books/private/${id}`,
        method: 'PATCH',
        body: changes,
      }),
     
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' },
        { type: 'BooksStatic', id: 'LIST' }, 
        { type: 'Progress', id },
      ],

     
      async onQueryStarted({ id, changes }, { dispatch, queryFulfilled }) {
        // 1) pojedyncza książka
        const patchSingle = dispatch(
          booksApi.util.updateQueryData('getBookById', id, draft => {
            if (draft?.data) Object.assign(draft.data, changes)
          })
        )

      
        const patchList = dispatch(
          booksApi.util.updateQueryData('getBooks', undefined, draft => {
            const book = draft?.entities?.[id]
            if (book) Object.assign(book, changes)
          })
        )

        try {
          await queryFulfilled           
        } catch {
          patchSingle.undo()             
          patchList.undo()
        }
      },
    }),

    //-------------------------------------------------
    //------ deleteBook Mutation
    //-------------------------------------------------
    /**
     * @function deleteBook
     * @description Deletes a book by ID.
     * @param {string} id - Book identifier
     * @returns {object} Deletion response
     * @invalidatesTags [
     *   { type: 'Books', id },
     *   { type: 'Books', id: 'LIST' },
     *   { type: 'BooksStatic', id: 'LIST' }
     * ]
     */
    deleteBook: builder.mutation({
      query: id => ({
        url: `/books/all/book/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_res, _err, id) => [
        { type: 'Books', id },
   
      ],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          booksApi.util.updateQueryData('getBooks', undefined, draft => {
            if (!draft) return
            draft.ids = draft.ids.filter(bookId => bookId !== id)
            delete draft.entities[id]
          })
        )
      
        try {
          await queryFulfilled
        } catch {
          patch.undo()
        }
      },
    }),
  }),
})

//-----------------------------------------------------
//------ Hooks Export
//-----------------------------------------------------
export const {
  useGetBookByIdQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApiSingle
