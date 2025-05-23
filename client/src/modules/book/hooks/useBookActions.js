/**
 * @file useBookActions.js
 * @description Hook providing actions for a single book: open reader, toggle archive, toggle favorite.
 */

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  useArchiveBookMutation,
  useFavoriteBookMutation,
  useRestoreBookMutation,
} from '@/store/api/booksApi'
import {
  setActiveBookId,   
  updateBookLocally,
} from '@/store/slices/bookSlice'

//-----------------------------------------------------------------------------
// Hook: useBookActions
//-----------------------------------------------------------------------------

/**
 * Hook that returns handlers for book-related actions:
 * - opening reader
 * - archiving/unarchiving
 * - favoriting/unfavoriting
 *
 * @param {Object} book - Book object with `_id` and `flags`
 * @returns {UseBookActionsResult}
 */
export default function useBookActions(book) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [archiveBook] = useArchiveBookMutation()
  const [restoreBook] = useRestoreBookMutation()
  const [favoriteBook] = useFavoriteBookMutation()

  /**
   * Navigate to the reader view and set the book as active
   */
  const openReader = () => {
    dispatch(setActiveBookId(book._id))
    navigate(`/read/${book._id}`)
  }

   /**
   * Toggle archive status (archived ↔ unarchived) in backend and locally
   */
  const toggleArchive = async () => {
    const isCurrentlyArchived = book.flags?.isArchived
    const mutation = isCurrentlyArchived ? restoreBook : archiveBook

    try {
      await mutation(book._id).unwrap()

      dispatch(updateBookLocally({
        id: book._id,
        changes: {
          flags: { ...book.flags, isArchived: !isCurrentlyArchived },
        },
      }))
    } catch (err) {
      console.error('Failed to toggle archive status', err)
    }
  }
  /**
   * Toggle favorite status (favorited ↔ unfavorited) in backend and locally
   */
  const toggleFavorite = async () => {
    try {
      await favoriteBook(book._id).unwrap()

      dispatch(updateBookLocally({
        id: book._id,
        changes: {
          flags: { ...book.flags, isFavorited: !book.flags?.isFavorited },
        },
      }))
    } catch (err) {
      console.error('Failed to favorite book', err)
    }
  }

  /**
   * @typedef {Object} UseBookActionsResult
   * @property {Function} openReader - Navigates to reader view and sets active book
   * @property {Function} toggleArchive - Archives or unarchives the book
   * @property {Function} toggleFavorite - Marks or unmarks the book as favorite
   */

  /** @type {UseBookActionsResult} */
  return { openReader, toggleArchive, toggleFavorite }
}
