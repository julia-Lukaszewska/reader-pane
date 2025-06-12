// src/store/api/booksPrivateApi/booksApiCollection.js
/**
 * @file booksApiCollection.js
 * @description
 * Re-exports book collection query hooks from booksApi.
 * Hooki: useGetBooksQuery, useGetBooksStaticQuery
 */

import { booksApi } from './booksApi'

export const {
  useGetBooksQuery,
  useGetBooksStaticQuery,
} = booksApi
