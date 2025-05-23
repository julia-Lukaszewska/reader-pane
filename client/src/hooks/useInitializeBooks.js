/**
 * @file useInitializeBooks.js
 * @description Hook that preloads static book metadata on app start.
 * Uses RTK Query to trigger background request for title, totalPages, etc.
 *
 * @returns {{ isLoading: boolean, isError: boolean }}
 */

import { useGetBooksStaticQuery } from '@/store/api/booksApi'

//-----------------------------------------------------------------------------
// Hook: useInitializeBooks
// Triggers preload of static book data (cached for 24h by RTK Query)
//-----------------------------------------------------------------------------

export default function useInitializeBooks() {
  const { isLoading, isError } = useGetBooksStaticQuery()
  return { isLoading, isError }
}
