/**
 * @file useOpenReader.js
 * @description Returns a callback that navigates to reader view for the given book.
 */

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useUpdateLastOpenedMutation } from '@/store/api/booksPrivateApi'
import { setLastOpenedBookId, clearPreviewBook  } from '@/store/slices/bookSlice'
import { updateFormFields } from '@/store/slices/bookModalSlice'
import { useBookCache } from '@/modules/book/hooks'
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
  const { patchBook } = useBookCache()
 return async () => {
    if (bookId) {
      dispatch(setLastOpenedBookId(bookId))
      const timestamp = new Date().toISOString()
      const changes = { stats: { lastOpenedAt: timestamp } }
      const undo = patchBook(bookId, changes)
      dispatch(updateFormFields(changes))
      try {
        await updateLastOpened(bookId).unwrap()
      } catch (err) {
        console.error('[LAST OPENED UPDATE]', err)
        undo()
      }
      dispatch(clearPreviewBook())
    }
    navigate(`/read/${bookId}`)
  }
}