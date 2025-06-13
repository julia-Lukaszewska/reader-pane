import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setActiveBookId } from '@/store/slices/bookSlice'
import { useUpdateBookFlagsMutation } from '@store/api/booksPrivateApi/bookApiFlags'

/**
 * Hook providing book-related actions: open reader, toggle archive/favorite.
 * @param {object} book - Book entity with flags and _id properties
 * @returns {{openReader: function, toggleArchive: function, toggleFavorite: function}}
 */
export default function useBookActions(book) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [updateFlags] = useUpdateBookFlagsMutation()

  /**
   * Opens the book reader view for the given book.
   */
  const openReader = () => {
    dispatch(setActiveBookId(book._id))
    navigate(`/read/${book._id}`)
  }

  /**
   * Toggles the archived state of the book.
   */
  const toggleArchive = () => {
    const isArchived = book.flags?.isArchived
    updateFlags({ id: book._id, flags: { isArchived: !isArchived } })
  }

  /**
   * Toggles the favorited state of the book.
   */
  const toggleFavorite = () => {
    const isFavorited = book.flags?.isFavorited
    updateFlags({ id: book._id, flags: { isFavorited: !isFavorited } })
  }

  return { openReader, toggleArchive, toggleFavorite }
}
