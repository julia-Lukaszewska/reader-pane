/**
 * @file useInitReaderSession.js
 * @description Initializes reader session: sets last opened book and starting page.
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
 * - restoring the last opened book (if any)
 * - setting the starting page for the active book
 *
 * Should be called once when mounting the PDF reader view.
 */
export default function useInitReaderSession() {
  console.log('[useInitReaderSession] mounted')

  //--- Restore last opened book
  useLastOpenedBook()
  console.log('[useInitReaderSession] called useLastOpenedBook()')

  //--- Get active book ID from Redux
  const activeBookId = useSelector(selectActiveBookId)
  console.log('[useInitReaderSession] activeBookId:', activeBookId)

  //--- Set the initial page for this book
if (activeBookId) {
  useStartingPage(activeBookId)
  console.log('[useInitReaderSession] called useStartingPage() with:', activeBookId)
}

}
