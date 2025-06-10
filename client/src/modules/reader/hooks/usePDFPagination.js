/**
 * @file usePDFPagination.js
 * @description Custom hook for handling PDF pagination logic including double-page mode and state updates.
 */

import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useUpdateProgressMutation } from '@/store/api/booksPrivateApi/booksApi'
import { selectCurrentPageById } from '@/store/selectors/selectors'

//-----------------------------------------------------------------------------//
// Hook: usePDFPagination
//-----------------------------------------------------------------------------//
/**
 * Returns pagination controls and state for a given book and view mode.
 *
 * @param {string} bookId - ID of the book
 * @param {number} totalPages - Total number of pages in the PDF
 * @param {string} viewMode - 'single' | 'double' | 'scroll' (default: 'single')
 */
export default function usePDFPagination(bookId, totalPages, viewMode = 'single') {
  console.log('[usePDFPagination] bookId', bookId)

  const [updateProgress] = useUpdateProgressMutation()

  // Force 'single' mode for 1-page documents
  const safeViewMode = totalPages <= 1 ? 'single' : viewMode
  const isDouble = safeViewMode === 'double'
  const step = isDouble ? 2 : 1

  // Get current page from Redux (via RTK Query cache)
  const currentPage = useSelector(state => selectCurrentPageById(state, bookId))

  // Log current page from store
  useEffect(() => {
    console.log('[usePDFPagination] currentPage from store:', currentPage)
  }, [currentPage])

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
    updateProgress({ id: bookId, currentPage: newPage })
  }, [updateProgress, bookId, normalized, step, isPrevDisabled])

  // Go to next page(s)
  const handleNext = useCallback(() => {
    if (isNextDisabled) return
    const newPage = Math.min(totalPages, normalized + step)
    updateProgress({ id: bookId, currentPage: newPage })
  }, [updateProgress, bookId, normalized, step, totalPages, isNextDisabled])

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
