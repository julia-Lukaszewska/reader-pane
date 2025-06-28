/**
 * @file useOpenReader.js
 * @description Returns a callback that navigates to reader view for the given book.
 */

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useUpdateLastOpenedMutation } from '@/store/api/booksPrivateApi'
import { setLastOpenedBookId } from '@/store/slices/bookSlice'
/**
 * Provides a function to open the reader for a book.
 *
 * @param {string} bookId - Identifier of the book to open
 * @returns {Function} - Callback that navigates to `/read/{bookId}`
 */
export default function useOpenReader(bookId) {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const [updateLastOpened] = useUpdateLastOpenedMutation()

  return async () => {
    if (bookId) {
      dispatch(setLastOpenedBookId(bookId))
      try {
        await updateLastOpened(bookId).unwrap()
      } catch (err) {
        console.error('[LAST OPENED UPDATE]', err)
      }
    }
    navigate(`/read/${bookId}`)
  }
}