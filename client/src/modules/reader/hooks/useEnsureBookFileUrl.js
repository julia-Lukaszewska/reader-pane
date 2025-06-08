/**
 * @file useEnsureBookFileUrl.js
 * @description React hook to generate the correct PDF file URL for private books (auth required).
 */

import { useMemo } from 'react'

/**
 * Returns the proper endpoint URL for fetching a book's PDF file (private only).
 * @param {object} book - Book object containing file metadata.
 * @param {object} book.file - File metadata with `filename` property.
 * @returns {string} - URL to fetch the PDF file.
 */
function useEnsureBookFileUrl(book) {
  return useMemo(() => {
    if (!book?.file?.filename) return ''
  
    return `/books/storage/${encodeURIComponent(book.file.filename)}`
  }, [book?.file?.filename])
}

export default useEnsureBookFileUrl
