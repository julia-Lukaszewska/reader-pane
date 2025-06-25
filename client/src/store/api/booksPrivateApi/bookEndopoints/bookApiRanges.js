/**
 * @file bookApiRanges.js
 * @description
 * Endpoint for fetching pre-generated page ranges for a book.
 */
import { booksApi } from '../booksApi'

export const bookApiRanges = booksApi.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    getBookRanges: builder.query({
      query: id => `/books/private/${id}/ranges`,
      providesTags: (_r, _e, id) => [{ type: 'Books', id }],
    })
  })
})

export const { useGetBookRangesQuery } = bookApiRanges