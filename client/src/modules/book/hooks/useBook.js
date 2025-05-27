/**
 * @file useBook.js
 * @description Custom hook for fetching book data and managing active book state in Redux.
 */

import { useDispatch } from 'react-redux'
import {
  setActiveBookId,
  clearActiveBook,
} from '@/store/slices/bookSlice'
import {
  useGetBooksQuery,
  useGetBookQuery,
} from '@/store/api/booksApi'
import { useAuth } from '@/modules/user/hooks'

//-----------------------------------------------------------------------------
// Hook: useBook
//-----------------------------------------------------------------------------

/**
 * Hook to handle fetching books and managing active book state.
 *
 * @param {string} bookId - Optional ID of the book to fetch individually
 * @returns {UseBookResult}
 */
const useBook = (bookId) => {
  const dispatch = useDispatch()
  const { isLoggedIn } = useAuth()

  //--- Fetch all books if logged in
  const { data: books = [], isLoading: booksLoading } = useGetBooksQuery(undefined, {
    skip: !isLoggedIn,
  })

  //--- Fetch a single book (conditionally)
  const { data: bookById, isLoading: bookLoading } = useGetBookQuery(bookId, {
    skip: !bookId,
  })

  //--- Set active book in Redux
  const activateBook = (id) => dispatch(setActiveBookId(id))

  //--- Clear active book
  const deactivateBook = () => dispatch(clearActiveBook())

  /**
   * @typedef {Object} UseBookResult
   * @property {Array} books - List of all books
   * @property {boolean} booksLoading - Loading state for all books
   * @property {Object} [bookById] - Fetched book data by ID
   * @property {boolean} bookLoading - Loading state for single book
   * @property {Function} activateBook - Sets a book as active in Redux
   * @property {Function} deactivateBook - Clears the active book from Redux
   */

  /** @type {UseBookResult} */
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
