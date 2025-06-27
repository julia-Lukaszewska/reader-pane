import { useDispatch } from 'react-redux'
import { useUpdateBookMutation } from '@/store/api/booksPrivateApi'
import useBookCache from './useBookCache'
import { updateFormFields } from '@/store/slices/bookModalSlice'

export default function useEditBook() {
  const [updateBook, { isLoading, error }] = useUpdateBookMutation()
  const { patchBook } = useBookCache()
  const dispatch = useDispatch()

  const editBook = async (bookId, updates) => {
    try {
      patchBook(bookId, updates)
      dispatch(updateFormFields(updates))
      await updateBook({ id: bookId, changes: updates }).unwrap()
    } catch (err) {
      console.error('[EDIT BOOK ERROR]', err)
    }
  }

  return { editBook, isLoading, error }
}
