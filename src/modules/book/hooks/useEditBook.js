// src/modules/book/hooks/useEditBook.js
import { useUpdateBookMutation } from '@/store/api/booksApi'


export default function useEditBook() {
  const [updateBook, { isLoading, error }] = useUpdateBookMutation()

 
  const editBook = async (bookId, updates) => {
    try {
      await updateBook({ id: bookId, changes: updates }).unwrap()
    } catch (err) {
      console.error('[EDIT BOOK ERROR]', err)
    }
  }

  return { editBook, isLoading, error }
}
