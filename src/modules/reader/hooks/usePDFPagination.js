/**
 * @file usePDFPagination.js
 * @description Custom hook for handling PDF pagination logic including double-page mode and state updates.
 */

import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setBookStats } from '@/store/slices/bookSlice'
import { selectCurrentPageById } from '@/store/selectors'

//-----------------------------------------------------------------------------
// Hook: usePDFPagination
//-----------------------------------------------------------------------------

/**
 * Returns pagination controls and state for a given book and view mode.
 *
 * @param {string} bookId - ID of the book
 * @param {number} totalPages - Total number of pages in the PDF
 * @param {string} viewMode - 'single' | 'double' | 'scroll' (default: 'single')
 */
export default function usePDFPagination(bookId, totalPages, viewMode = 'single') {
  console.log('[usePDFPagination] bookId', bookId)

  const dispatch = useDispatch()

  // Force 'single' mode for 1-page documents
  const safeViewMode = totalPages <= 1 ? 'single' : viewMode
  const isDouble = safeViewMode === 'double'
  const step = isDouble ? 2 : 1

  // Get current page from Redux
  const currentPage = useSelector(state => selectCurrentPageById(state, bookId))

  // Normalize page for double-page display (left-aligned)
  const normalized = isDouble && currentPage % 2 === 0
    ? currentPage - 1
    : currentPage

  const isPrevDisabled = normalized <= 1
  const isNextDisabled = normalized + step - 1 >= totalPages

  // Go to previous page(s)
  const handlePrev = useCallback(() => {
    if (isPrevDisabled) return
    const newPage = Math.max(1, normalized - step)
    dispatch(setBookStats({ id: bookId, stats: { currentPage: newPage } }))
  }, [dispatch, bookId, normalized, step, isPrevDisabled])

  // Go to next page(s)
  const handleNext = useCallback(() => {
    if (isNextDisabled) return
    const newPage = Math.min(totalPages, normalized + step)
    dispatch(setBookStats({ id: bookId, stats: { currentPage: newPage } }))
  }, [dispatch, bookId, normalized, step, totalPages, isNextDisabled])

  return {
    currentPage: normalized,
    totalPages,
    isPrevDisabled,
    isNextDisabled,
    handlePrev,
    handleNext,
    viewMode: safeViewMode,
  }
}
