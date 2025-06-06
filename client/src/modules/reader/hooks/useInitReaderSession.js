/**
 * @file useInitReaderSession.js
 * @description Initializes the reader session: restores the last opened book and sets the starting page.
 */

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import useStartingPage from './useStartingPage'
import useLastOpenedBook from './useLastOpenedBook'
import { setActiveBookId } from '@/store/slices/bookSlice'
import { selectActiveBookId } from '@/store/selectors/selectors'

//-----------------------------------------------------------------------------
// Hook: useInitReaderSession
//-----------------------------------------------------------------------------  

/**
 * Initializes the reader session by:
 * - restoring the last opened book
 * - setting the starting page for the active book
 *
 * This hook must call custom hooks at the top level to comply with the Rules of Hooks.
 */
export default function useInitReaderSession() {
  console.log('[useInitReaderSession] hook mounted')

  const { bookId } = useParams()
  const dispatch = useDispatch()
  const activeBookId = useSelector(selectActiveBookId)

  // Restore last opened book (always called at top level)
  useLastOpenedBook()
  console.log('[useInitReaderSession] called useLastOpenedBook()')

  useEffect(() => {
    if (bookId && !activeBookId) {
      console.log('[useInitReaderSession] syncing route bookId → Redux store:', bookId)
      dispatch(setActiveBookId(bookId))
    }
  }, [bookId, activeBookId, dispatch])

  // Set starting page (always call hook at top level)
  useStartingPage(activeBookId)
  console.log('[useInitReaderSession] called useStartingPage() with:', activeBookId)
}
