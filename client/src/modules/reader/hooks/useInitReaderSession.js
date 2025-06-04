/**
 * @file useInitReaderSession.js
 * @description Initializes the reader session: restores the last opened book and sets the starting page.
 */

import useStartingPage from './useStartingPage'
import useLastOpenedBook from './useLastOpenedBook'
import { useSelector } from 'react-redux'
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

  // Restore last opened book (always called at top level)
  useLastOpenedBook()
  console.log('[useInitReaderSession] called useLastOpenedBook()')

  // Get active book ID from Redux
  const activeBookId = useSelector(selectActiveBookId)
  console.log('[useInitReaderSession] activeBookId:', activeBookId)

  // Set starting page (always call hook at top level)
  useStartingPage(activeBookId)
  console.log('[useInitReaderSession] called useStartingPage() with:', activeBookId)
}