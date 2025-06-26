import { useOpenReader } from '@/modules/reader/hooks'
import { useUpdateBookFlagsMutation } from '@/store/api/booksPrivateApi'

/**
 * Returns helpers for opening the reader and toggling archive / favorite flags.
 *
 * @param {object | undefined} book
 * @returns {{
 *   openReader: () => void,
 *   toggleArchive: () => void,
 *   toggleFavorite: () => void
 * }}
 */
export default function useBookActions(book) {
  const id    = book?._id
  const flags = book?.flags ?? {}

  const [updateFlags] = useUpdateBookFlagsMutation()

  // Call hook unconditionally (rules of hooks); id may be undefined
  const readerHook = useOpenReader(id)

  const openReader = () => {
    if (id) readerHook()
  }

  const toggleArchive = () => {
    if (!id) return
    updateFlags({
      id,
      flags: {
        isArchived: !flags.isArchived,
        isFavorited: false, // clear favorite when archiving
      },
    })
  }

  const toggleFavorite = () => {
    if (!id) return
    updateFlags({
      id,
      flags: { isFavorited: !flags.isFavorited },
    })
  }

  return { openReader, toggleArchive, toggleFavorite }
}
