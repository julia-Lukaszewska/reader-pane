/**
 * @file useEditBook.js
 * @description Hook for editing a book – updates backend and synchronizes local Redux store.
 */

import { useDispatch } from 'react-redux'
import { useUpdateBookMutation, booksApi } from '@/store/api/booksApi'


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
     dispatch(
        booksApi.util.updateQueryData('getBooks', undefined, draft => {
          const book = draft.find(b => b._id === bookId)
          if (book) Object.assign(book, updates)
        })
      )
 dispatch(
        booksApi.util.updateQueryData('getBookById', bookId, draft => {
          Object.assign(draft, updates)
        })
      )
await updateBook({ id: bookId, changes: updates }).unwrap()

    } catch (err) {
      console.error('[EDIT BOOK ERROR]', err)

    }
  }

  
  return { editBook, isLoading, error }
}
