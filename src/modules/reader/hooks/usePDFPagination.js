// src/modules/pdfView/hooks/usePDFPagination.js
import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setCurrentPage } from '@/store/slices/readerSlice'

export default function usePDFPagination(bookId, totalPages, viewMode = 'single') {
  const dispatch = useDispatch()
  const isDouble = viewMode === 'double'
  const step     = isDouble ? 2 : 1

  //  Get currentPage from slice (default is 1)
  const currentPage = useSelector(state => state.reader.currentPage) || 1

  //  Normalize for double-page view
  const normalized = isDouble && currentPage % 2 === 0
    ? currentPage - 1
    : currentPage

  const isPrevDisabled = normalized <= 1
  const isNextDisabled = normalized + step - 1 >= totalPages

  //  Go to previous page
  const handlePrev = useCallback(() => {
    if (isPrevDisabled) return
    const newPage = Math.max(1, normalized - step)
    dispatch(setCurrentPage(newPage))
  }, [dispatch, normalized, step, isPrevDisabled])

  //  Go to next page
  const handleNext = useCallback(() => {
    if (isNextDisabled) return
    const newPage = Math.min(totalPages, normalized + step)
    dispatch(setCurrentPage(newPage))
  }, [dispatch, normalized, step, totalPages, isNextDisabled])

  return {
    currentPage:   normalized,
    totalPages,
    isPrevDisabled,
    isNextDisabled,
    handlePrev,
    handleNext,
  }
}
