/**
 * @file useEnsureBookFileUrl.js
 * @description
 * Hook that builds public file URL using filename from book.
 *
 * @param {Object} params
 * @param {Object} params.book - Book object with file.filename
 * @returns {string|null} - Public URL or null if unavailable
 */
const useEnsureBookFileUrl = ({ book }) => {
  if (!book?.file?.filename) return null
  return `/api/books/file/${book.file.filename}`
}

export default useEnsureBookFileUrl
