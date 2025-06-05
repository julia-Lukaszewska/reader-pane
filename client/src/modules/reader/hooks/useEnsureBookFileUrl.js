/**
 * @file useEnsureBookFileUrl.js
 * @description
 * Hook that fetches the fileUrl of a book given its ID and logs the process.
 * Helps ensure the file URL is ready before attempting to load the PDF.
 */

import { useEffect } from 'react'
import { useGetBookFileUrlQuery } from '@/store/api/booksApi'

/**
 * Hook to ensure `fileUrl` is fetched for a given `bookId`.
 *
 * @param {string|null} bookId - The ID of the book to fetch fileUrl for.
 * @returns {string|null} fileUrl - The fetched file URL, or null if not available.
 */
const useEnsureBookFileUrl = (bookId) => {
  const skip = !bookId
  const { data, error, isLoading, isSuccess } = useGetBookFileUrlQuery(bookId, { skip })

  useEffect(() => {
    console.log('[useEnsureBookFileUrl] bookId:', bookId)
    if (isLoading) console.log('[useEnsureBookFileUrl] Loading fileUrl...')
    if (isSuccess) console.log('[useEnsureBookFileUrl] fileUrl fetched:', data)
    if (error) console.warn('[useEnsureBookFileUrl] Error fetching fileUrl:', error)
  }, [bookId, isLoading, isSuccess, data, error])

  return data || null
}

export default useEnsureBookFileUrl
