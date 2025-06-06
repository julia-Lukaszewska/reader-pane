/**
 * @file useEnsureBookFileUrl.js
 * @description
 * Hook that ensures public file URL for given bookId.
 * Falls back to fetch from RTK Query if book not found in store.
 */

import { useSelector } from 'react-redux'
import { useGetBookByIdQuery } from '@/store/api/booksApi'
import { selectBookByIdFromCache } from '@/store/selectors/selectors'

const useEnsureBookFileUrl = (bookId) => {
  const cachedBook = useSelector((state) => selectBookByIdFromCache(bookId)(state))
  const { data: fetchedBook } = useGetBookByIdQuery(bookId, {
    skip: !!cachedBook,
  })

  const book = cachedBook || fetchedBook

  if (!book?.file?.filename) return null
  return `/books/file/${book.file.filename}`
}

export default useEnsureBookFileUrl
