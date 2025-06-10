
/**
 * @file booksApi.js
 * @description
 * Empty RTK Query slice for book-related endpoints.
 * Endpoints are injected from dedicated files:
 * - booksApiCollection.js
 * - bookApiSingle.js
 * - bookApiStats.js
 * - bookApiForm.js
 */

import { createApi } from '@reduxjs/toolkit/query/react'
import { baseBookApiQuery } from './baseBookApiQuery'
import { bookEndpoints } from './bookEndopoints'

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: baseBookApiQuery,
  tagTypes: ['Books', 'BooksStatic', 'Progress', 'Live'],
  endpoints: bookEndpoints,
})
