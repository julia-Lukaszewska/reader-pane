/**
 * @file booksApi.js
 * @description
 * Main RTK Query API slice for all book-related endpoints.
 * - Extended by feature modules via `injectEndpoints`:
 *   • booksApiCollection.js (list & static queries)
 *   • bookApiSingle.js      (single book CRUD)
 *   • bookApiFlags.js       (flag mutations: archive, favorite)
 *   • booksApiForm.js       (notes, bookmarks, ratings, file URL)
 *   • booksApiStats.js      (progress, live stats, last opened)
 *
 * All endpoint hooks are exported from their respective modules.
 */
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseBookApiQuery } from './baseBookApiQuery'

//-----------------------------------------------------
//------ Main booksApi Slice
//-----------------------------------------------------
/**
 * @constant booksApi
 * @description
 * RTK Query API slice for books.  
 * Uses `baseBookApiQuery` and defines common tagTypes.  
 * Endpoints are injected in feature modules.
 * @type {import('@reduxjs/toolkit/query').Api<{}>}
 */
export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: baseBookApiQuery,
  tagTypes: ['Books', 'BooksStatic', 'Progress', 'Live'],
  endpoints: () => ({}), // injected by feature modules
})

//-----------------------------------------------------
//------ Note on Endpoint Hooks
//-----------------------------------------------------
/*
  All endpoint hooks (useGetBooksQuery, useUpdateBookMutation, etc.)
  are exported from their individual feature files under ./bookEndopoints/
*/
