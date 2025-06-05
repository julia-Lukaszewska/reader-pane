import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setBookFileUrl } from '@/store/slices/readerSlice'

/**
 * Ensures fileUrl is available in Redux based on book data.
 * Builds the correct public file URL using filename from GridFS.
 *
 * @param {Object} params
 * @param {Object} params.book - Book object containing .file.filename
 */
 const useEnsureBookFileUrl = ({ book }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!book?.file?.filename) return

    const fileUrl = `/api/books/file/${book.file.filename}`
    dispatch(setBookFileUrl(fileUrl))
  }, [book, dispatch])
}
export default useEnsureBookFileUrl