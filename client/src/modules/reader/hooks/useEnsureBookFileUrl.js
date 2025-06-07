/**
 * @file useEnsureBookFileUrl.js
 * @description React hook to generate the correct PDF file URL based on book's public/private status.
 */

import { useMemo } from 'react';

/**
 * Returns the proper endpoint URL for fetching a book's PDF file.
 * @param {object} book - Book object containing file metadata and access flag.
 * @param {object} book.file - File metadata with `filename` property.
 * @param {boolean} book.isPublic - Flag indicating if the book is publicly accessible.
 * @returns {string} - URL to fetch the PDF file.
 */
function useEnsureBookFileUrl(book) {
  return useMemo(() => {
    const filename = encodeURIComponent(book.file.filename);
    if (book.isPublic) {
      // Public route does not require authentication
      return `/api/books/public/file/${filename}`;
    }
    // Protected route requires valid token
    return `/api/books/file/${filename}`;
  }, [book.file.filename, book.isPublic]);
}

export default useEnsureBookFileUrl;
