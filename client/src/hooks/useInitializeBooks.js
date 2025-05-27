/**
 * @file useInitializeBooks.js
 * @description Hook that preloads static book metadata on app start.
 * Uses RTK Query to trigger background request for title, totalPages, etc.
 *
 * @returns {{ initialize: () => void }}
 */

import { useDispatch } from 'react-redux'
import { booksApi } from '@/store/api/booksApi'

//-----------------------------------------------------------------------------
// Hook: useInitializeBooks
// Triggers preload of static book data (cached for 24h by RTK Query)
//-----------------------------------------------------------------------------

export default function useInitializeBooks() {
  const dispatch = useDispatch()
  
  // initialize() will dispatch the RTK Query endpoint to fetch static books
  const initialize = () => {
    dispatch(booksApi.endpoints.getBooks.initiate(undefined, { forceRefetch: false }))
  }

  return { initialize }
}
