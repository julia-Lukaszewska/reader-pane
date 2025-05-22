/**
 * @file useEditBook.js
 * @description Hook for editing a book – updates backend and synchronizes local Redux store.
 */

import { useDispatch } from 'react-redux'
import { useUpdateBookMutation } from '@/store/api/booksApi'
import { updateBookLocally } from '@/store/slices/bookSlice'

//-----------------------------------------------------------------------------
// Hook: useEditBook
//-----------------------------------------------------------------------------

/**
 * Hook for editing book data (e.g. meta, flags, stats).
 * Automatically updates Redux store after successful mutation.
 *
 * @returns {UseEditBookResult}
 */
export default function useEditBook() {
  const dispatch = useDispatch()
  const [updateBook, { isLoading, error }] = useUpdateBookMutation()

  /**
   * Edits a book by sending changes to backend and updating local state.
   *
   * @param {string} bookId - ID of the book to update
   * @param {Object} updates - Object with partial updates to book (e.g. `meta`, `flags`)
   */
  const editBook = async (bookId, updates) => {
    try {
      await updateBook({ id: bookId, changes: updates }).unwrap()
      dispatch(updateBookLocally({ id: bookId, changes: updates }))
    } catch (err) {
      console.error('[EDIT BOOK ERROR]', err)
    }
  }

  /**
   * @typedef {Object} UseEditBookResult
   * @property {Function} editBook - Edits a book (API + Redux update)
   * @property {boolean} isLoading - Indicates if update is in progress
   * @property {any} error - Error object returned by mutation (if any)
   */

  /** @type {UseEditBookResult} */
  return { editBook, isLoading, error }
}
