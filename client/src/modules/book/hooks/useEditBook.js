import { useDispatch } from 'react-redux'
import { useUpdateBookMutation } from '@/store/api/booksPrivateApi'
import useBookCache from './useBookCache'
import { updateFormFields } from '@/store/slices/bookModalSlice'

export default function useEditBook() {
  const [updateBook, { isLoading, error }] = useUpdateBookMutation()
  const { patchBook } = useBookCache()
  const dispatch = useDispatch()

  const editBook = async (bookId, updates) => {
    const undo = patchBook(bookId, updates)
    dispatch(updateFormFields(updates))
    try {
 
      await updateBook({ id: bookId, changes: updates }).unwrap()
       return true
    } catch (err) {
      console.error('[EDIT BOOK ERROR]', err)
      undo()
         return false
    }
  }

  return { editBook, isLoading, error }
}
