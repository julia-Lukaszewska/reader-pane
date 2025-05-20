// src/modules/book/hooks/useBookActions.js
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  useArchiveBookMutation,
  useFavoriteBookMutation,
 
} from '@/store/api/booksApi'
import { setActiveBookId } from '@/store/slices/bookSlice'
import { useUpdateLastOpenedMutation } from '@/store/api/booksApi'

console.log({ useUpdateLastOpenedMutation, useFavoriteBookMutation, useArchiveBookMutation })

export default function useBookActions(book) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [archiveBook]      = useArchiveBookMutation()
  const [favoriteBook]     = useFavoriteBookMutation()
  const [updateLastOpened] = useUpdateLastOpenedMutation()

  const openReader = async () => {
    dispatch(setActiveBookId(book._id))
    try {
      await updateLastOpened(book._id).unwrap()
    } catch (err) {
      console.error(' Failed to update lastOpenedAt', err)
    }
    navigate(`/read/${book._id}`)
  }

  const toggleArchive = async () => {
    try {
      await archiveBook(book._id).unwrap()
    } catch (err) {
      console.error(' Failed to archive book', err)
    }
  }

  const toggleFavorite = async () => {
    try {
      await favoriteBook(book._id).unwrap()
    } catch (err) {
      console.error(' Failed to favorite book', err)
    }
  }

  return { openReader, toggleArchive, toggleFavorite }
}
