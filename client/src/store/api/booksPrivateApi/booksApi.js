/**
 * @file booksApi.js
 * @description
 * Main RTK Query API slice for all book-related endpoints.
 * 
 * This slice is extended by endpoint modules using injectEndpoints:
 * - booksApiCollection.js (fetch lists of books)
 * - bookApiSingle.js      (CRUD for single book)
 * - bookApiFlags.js       (mutations for flags like archive/favorite)
 * - booksApiForm.js       (notes, bookmarks, rating, file URL)
 * - booksApiStats.js      (progress, live stats, last opened)
 * 
 * All endpoint hooks are exported from their respective files.
 */

import { createApi } from '@reduxjs/toolkit/query/react'
import { baseBookApiQuery } from './baseBookApiQuery'

//-----------------------------------------------------------------------------
// RTK Query API slice for books (empty endpoints, extended elsewhere)
//-----------------------------------------------------------------------------

/**
 * Main books API slice, to be extended by feature endpoint modules.
 * 
 * @type {import('@reduxjs/toolkit/query').Api<{}>}
 */
export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: baseBookApiQuery,
  tagTypes: ['Books', 'BooksStatic', 'Progress', 'Live'],
  endpoints: () => ({}), // Endpoints are injected in separate files!
})

//-----------------------------------------------------------------------------
// All endpoint hooks are exported from individual feature files
//-----------------------------------------------------------------------------
