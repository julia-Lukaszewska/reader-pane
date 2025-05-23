/**
 * @file useLastOpenedBook.js
 * @description Initializes or restores the last opened book based on route or persisted state.
 */

import { useEffect } from 'react'   
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useUpdateLastOpenedMutation } from '@/store/api/booksApi'
import {
  setActiveBookId,
  setLastOpenedBookId,
} from '@/store/slices/bookSlice'

//-----------------------------------------------------------------------------
// Hook: useLastOpenedBook
//-----------------------------------------------------------------------------

/**
 * Handles logic for:
 * 1. Setting the active book based on `bookId` from route or lastOpened state
 * 2. Redirecting if necessary
 * 3. Updating `lastOpenedAt` timestamp in backend
 *
 * Called once in reader layout on mount.
 */
export default function useLastOpenedBook() {
  console.log('[useLastOpenedBook]')

  const { bookId: routeBookId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const lastOpenedBookId = useSelector((state) => state.book.lastOpenedBookId)
  const [updateLastOpened] = useUpdateLastOpenedMutation()

  //--- Prefer book from URL, fallback to last opened from state
  const id = routeBookId ?? lastOpenedBookId

  //-----------------------------------------------------------------------------
  // Effect: Set active book and navigate if needed
  //-----------------------------------------------------------------------------
  useEffect(() => {
    if (routeBookId) {
      dispatch(setActiveBookId(routeBookId))
      dispatch(setLastOpenedBookId(routeBookId))
      return
    }

    if (lastOpenedBookId) {
      dispatch(setActiveBookId(lastOpenedBookId))
      navigate(`/read/${lastOpenedBookId}`, { replace: true })
    } else {
      navigate('/', { replace: true })
    }
  }, [routeBookId, lastOpenedBookId, dispatch, navigate])

  //-----------------------------------------------------------------------------
  // Effect: Update backend with lastOpenedAt timestamp
  //-----------------------------------------------------------------------------
  useEffect(() => {
    if (!id) return

    dispatch(setLastOpenedBookId(id))
    updateLastOpened(id)
      .unwrap()
      .catch((err) =>
        console.error('Failed to update lastOpenedAt', err)
      )
  }, [id, dispatch, updateLastOpened])
}
