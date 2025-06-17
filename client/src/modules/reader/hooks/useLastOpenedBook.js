/**
 * @file useLastOpenedBook.js
 * @description Initializes or restores the last opened book based on route or persisted state.
 */

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

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
 *
 * @param {string|null} routeBookId – bookId from route (or null)
 * @returns {string|null} – resolved bookId (from route or fallback)
 */
export default function useLastOpenedBook(routeBookId) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const lastOpenedBookId = useSelector((state) => state.book.lastOpenedBookId)

  const resolvedId = routeBookId ?? lastOpenedBookId

  useEffect(() => {
    if (routeBookId) {
      dispatch(setActiveBookId(routeBookId))
      dispatch(setLastOpenedBookId(routeBookId))
    } else if (lastOpenedBookId) {
      dispatch(setActiveBookId(lastOpenedBookId))
      navigate(`/read/${lastOpenedBookId}`, { replace: true })
    } else {
      navigate('/', { replace: true })
    }
  }, [routeBookId, lastOpenedBookId, dispatch, navigate])

  return resolvedId
}
