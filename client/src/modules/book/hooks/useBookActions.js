import { useOpenReader } from '@/modules/reader/hooks'
import { useUpdateBookFlagsMutation } from '@/store/api/booksPrivateApi'

/**
 * Hook providing book-related actions: open reader, toggle archive/favorite.
 * @param {object} book - Book entity with flags and _id properties
 * @returns {{openReader: function, toggleArchive: function, toggleFavorite: function}}
 */
export default function useBookActions(book) {

  const [updateFlags] = useUpdateBookFlagsMutation()

 const openReader = useOpenReader(book._id)

  /**
   * Toggles the archived state of the book.
   */
const toggleArchive = () => {
  const isArchived = book.flags?.isArchived
  updateFlags({
    id: book._id,
    flags: {
      isArchived: !isArchived,
      isFavorited: false // reset favorites in archive
    }
  })
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
