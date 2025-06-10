/**
 * @file useBookActions.js
 * @description Hook providing actions for a single book: open reader, toggle archive, toggle favorite.
 */

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setActiveBookId } from '@/store/slices/bookSlice'

import {
  useArchiveBookMutation,
  useFavoriteBookMutation,
  useRestoreBookMutation,
  useUnfavoriteBookMutation,
  booksApi,
} from '@/store/api/booksPrivateApi/booksApi'

// -----------------------------------------------------------------------------
// Hook: useBookActions
// -----------------------------------------------------------------------------
/**
 * Hook that returns handlers for book-related actions:
 * - opening reader
 * - archiving / unarchiving
 * - favoriting / unfavoriting
 *
 * @param {Object} book - Book object with `_id` and `flags`
 * @returns {UseBookActionsResult}
 */
export default function useBookActions(book) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [archiveBook]   = useArchiveBookMutation()
  const [restoreBook]   = useRestoreBookMutation()
  const [favoriteBook]  = useFavoriteBookMutation()
  const [unfavoriteBook] = useUnfavoriteBookMutation()

  /**
   * Navigate to reader view using book._id
   */
  const openReader = () => {
     dispatch(setActiveBookId(book._id)) 
    navigate(`/read/${book._id}`)
  }

  /**
   * Helper – optimistic update for a flag (isArchived / isFavorited)
   * @param {string} flag - "isArchived" or "isFavorited"
   * @param {boolean} value - new value
   */
  const optimisticallyUpdateFlag = (flag, value) => {
    dispatch(
      booksApi.util.updateQueryData('getBooks', undefined, draft => {
        const target = draft.find(b => b._id === book._id)
        if (target && target.flags) target.flags[flag] = value
      })
    )

    dispatch(
      booksApi.util.updateQueryData('getBookById', book._id, draft => {
        if (draft.flags) draft.flags[flag] = value
      })
    )
  }

  /**
   * Toggle archive status (archived ↔ unarchived)
   */
  const toggleArchive = async () => {
    const isArchived = book.flags?.isArchived
    const mutation = isArchived ? restoreBook : archiveBook

    // Optimistic cache change
    optimisticallyUpdateFlag('isArchived', !isArchived)

    try {
      await mutation(book._id).unwrap()
    } catch (error) {
      // Rollback in case of failure
      optimisticallyUpdateFlag('isArchived', isArchived)
      console.error('Failed to toggle archive status', error)
    }
  }

  /**
   * Toggle favorite status (favorited ↔ unfavorited)
   */
  const toggleFavorite = async () => {
    const isFavorited = book.flags?.isFavorited
    const mutation = isFavorited ? unfavoriteBook : favoriteBook

    // Optimistic cache change
    optimisticallyUpdateFlag('isFavorited', !isFavorited)

    try {
      await mutation(book._id).unwrap()
    } catch (error) {
      // Rollback in case of failure
      optimisticallyUpdateFlag('isFavorited', isFavorited)
      console.error('Failed to toggle favorite status', error)
    }
  }

  /**
   * @typedef {Object} UseBookActionsResult
   * @property {Function} openReader       - Navigates to reader view and sets active book
   * @property {Function} toggleArchive    - Archives or unarchives the book
   * @property {Function} toggleFavorite   - Marks or unmarks the book as favorite
   */

  /** @type {UseBookActionsResult} */
  return { openReader, toggleArchive, toggleFavorite }
}
