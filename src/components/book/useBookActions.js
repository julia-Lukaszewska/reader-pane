//-----------------------------------------------------------------------------
// Hook: useBookActions – logika otwierania, ulubienia, archiwizacji
//-----------------------------------------------------------------------------
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  archiveBookThunk,
  restoreBookThunk,
  favoriteBookThunk,
  unfavoriteBookThunk,
} from '@/store'

export function useBookActions(book) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //------------------------------------------------------------------------------
  //------Open reader, favorite, archive / restore book 
  //------------------------------------------------------------------------------
  const openReader = () => navigate(`/reader/${book._id}`)

  //------------------------------------------------------------------------------
  //------Toggle favorite / unfavorite book 
  //------------------------------------------------------------------------------
  const toggleFavorite = () =>
    dispatch(
      book.isFavorited
        ? unfavoriteBookThunk(book._id)
        : favoriteBookThunk(book._id)
    )

//------------------------------------------------------------------------------
  //------Toggle archive / restore book 
  //------------------------------------------------------------------------------
  const toggleArchive = () =>
    dispatch(
      book.isArchived ? restoreBookThunk(book._id) : archiveBookThunk(book._id)
    )

  return {
    openReader,
    toggleFavorite,
    toggleArchive,
    isFavorited: book.isFavorited,
    isArchived: book.isArchived,
  }
}
