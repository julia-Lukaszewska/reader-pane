//-----------------------------------------------------------------------------
//------Component actions buttons 
//-----------------------------------------------------------------------------
import { useSelector } from 'react-redux'
import { selectBookById } from '@/store'
import { useBookActions } from './useBookActions'

export default function Actions({ bookId }) {
  const book = useSelector((s) => selectBookById(s, bookId))
  const { openReader, toggleFavorite, toggleArchive, isFavorited, isArchived } =
    useBookActions(book)

  return (
    <div className="flex gap-2">
      <button onClick={openReader} title="Open">
        📖
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          toggleFavorite()
        }}
        title="Favorite"
      >
        {isFavorited ? '❤️' : '♡'}
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          toggleArchive()
        }}
        title="Archive"
      >
        {isArchived ? '📦' : '🗃️'}
      </button>
    </div>
  )
}
