//-----------------------------------------------------------------------------
// useInitializeBooks: preload static book metadata on app start
//-----------------------------------------------------------------------------

import { useGetBooksStaticQuery } from '@/store/api/booksApi'

/**
 * Preloads static book metadata (title, totalPages, etc.)
 * Returns { isLoading, isError } flags from RTK Query.
 */
export default function useInitializeBooks() {
  const { isLoading, isError } = useGetBooksStaticQuery()
  return { isLoading, isError }
}
