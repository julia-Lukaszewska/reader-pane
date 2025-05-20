// src/modules/book/hooks/useBook.js
import { useDispatch } from 'react-redux'
import {
  setActiveBookId,
  clearActiveBook,
} from '@/store/slices/bookSlice'
import {
  useGetBooksQuery,
  useGetBookQuery,
} from '@/store/api/booksApi'


const useBook = (bookId) => {
  const dispatch = useDispatch()

  // Fetch all books
  const { data: books = [], isLoading: booksLoading } = useGetBooksQuery()

  // Fetch single book
  const { data: bookById, isLoading: bookLoading } = useGetBookQuery(bookId, {
    skip: !bookId,
  })

  // Redux actions
  const activateBook   = (id) => dispatch(setActiveBookId(id))
  const deactivateBook = () => dispatch(clearActiveBook())

  return {
    books,
    booksLoading,
    bookById,
    bookLoading,
    activateBook,
    deactivateBook,
  }
}

export default useBook
