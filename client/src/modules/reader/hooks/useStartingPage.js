/**
 * @file useStartingPage.js
 * @description Sets the reader's currentPage from backend progress,
 *              only if currentPage is still the default (1).
 */

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useGetProgressQuery } from '@/store/api/booksApi'
import { setBookStats } from '@/store/slices/bookSlice'
import { selectCurrentPageById } from '@/store/selectors'

//-----------------------------------------------------------------------------
// Hook: useStartingPage
//-----------------------------------------------------------------------------

/**
 * Retrieves last saved reading position from backend
 * and applies it only if current page is still at default (1).
 *
 * @param {string} bookId - ID of the active book
 */
export default function useStartingPage(bookId) {
  console.log('[useStartingPage] bookId', bookId)

  const dispatch = useDispatch()
  const currentPage = useSelector(state => selectCurrentPageById(state, bookId))

  // Only fetch progress if current page is still 1 (initial state)
  const { data: progressData } = useGetProgressQuery(bookId, {
    skip: !bookId || currentPage !== 1,
  })

  //-----------------------------------------------------------------------------  
  // Effect: apply saved progress if available
  //-----------------------------------------------------------------------------  
  useEffect(() => {
    if (!bookId || !progressData || currentPage <= 1) return

    console.log('[useStartingPage] setting start page to', progressData.currentPage)

    dispatch(setBookStats({
      id: bookId,
      stats: { currentPage: progressData.currentPage }
    }))
  }, [bookId, currentPage, progressData, dispatch])
}
