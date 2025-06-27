import { useUpdateBookMutation } from '@/store/api/booksPrivateApi'
import  useBookCache  from './useBookCache'

export default function useEditBook() {
  const [updateBook, { isLoading, error }] = useUpdateBookMutation()
  const { patchBook } = useBookCache()

  const editBook = async (bookId, updates) => {
    try {
      patchBook(bookId, updates)
      await updateBook({ id: bookId, changes: updates }).unwrap()
    } catch (err) {
      console.error('[EDIT BOOK ERROR]', err)
    }
  }

  return { editBook, isLoading, error }
}
