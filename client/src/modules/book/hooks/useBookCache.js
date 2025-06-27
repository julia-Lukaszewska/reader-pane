import { useDispatch } from 'react-redux'
import { booksApi } from '@/store/api/booksPrivateApi'

export default function useBookCache() {
  const dispatch = useDispatch()

  const patchBook = (bookId, changes) => {
    dispatch(
      booksApi.util.updateQueryData('getBooks', undefined, draft => {
        const book = draft?.data?.find(b => b._id === bookId)
        if (book) Object.assign(book, changes)
      })
    )
    dispatch(
      booksApi.util.updateQueryData('getBookById', bookId, draft => {
        if (draft) Object.assign(draft, changes)
      })
    )
  }

  return { patchBook }
}
