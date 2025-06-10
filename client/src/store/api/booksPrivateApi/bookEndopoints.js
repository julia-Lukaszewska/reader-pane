import { booksAdapter } from './booksAdapter'

export const buildBooksEndpoints = (builder) => ({
  getBooks: builder.query({
    query: () => '/books/private',
    transformResponse: (resp) =>
      booksAdapter.setAll(booksAdapter.getInitialState(), resp),
    providesTags: (res) =>
      res?.ids
        ? [
            { type: 'Books', id: 'LIST' },
            ...res.ids.map((id) => ({ type: 'Books', id })),
          ]
        : [{ type: 'Books', id: 'LIST' }],
  }),

  getBooksStatic: builder.query({
    query: () => '/books/private/static',
    keepUnusedDataFor: 86400,
    transformResponse: (resp) =>
      booksAdapter.setAll(booksAdapter.getInitialState(), resp),
    providesTags: [{ type: 'BooksStatic', id: 'LIST' }],
  }),
})
