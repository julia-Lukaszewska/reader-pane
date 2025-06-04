/**
 * @file useStartingPage.js
 * @description
 * Sets the reader's currentPage from backend progress,
 * only if currentPage is still the default (1).
 */

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useGetProgressQuery, useUpdateProgressMutation } from '@/store/api/booksApi'
import { selectCurrentPageById } from '@/store/selectors/selectors'

/**
 * Retrieves last saved reading position from backend
 * and applies it only if current page is still at default (1).
 *
 * @param {string} bookId - ID of the active book
 */
export default function useStartingPage(bookId) {
  const currentPage = useSelector(state => selectCurrentPageById(state, bookId))
  const isInitial = !bookId || currentPage !== 1

  const { data: progressData } = useGetProgressQuery(bookId, { skip: isInitial })
  const [updateProgress] = useUpdateProgressMutation()

  useEffect(() => {
    if (!bookId) {
      console.log('[useStartingPage] No bookId – skipping')
      return
    }

    if (currentPage !== 1) {
      console.log('[useStartingPage] currentPage !== 1 – no need to load progress')
      return
    }

    if (!progressData?.currentPage || progressData.currentPage === 1) {
      console.log('[useStartingPage] No backend progress to apply')
      return
    }

    console.log(`[useStartingPage] Setting currentPage from backend to ${progressData.currentPage}`)

    updateProgress({ id: bookId, currentPage: progressData.currentPage })
  }, [bookId, currentPage, progressData, updateProgress])
}
