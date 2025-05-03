//-----------------------------------------------------------------------------
//------ usePDFPagination.js – Hook that provides logic for PDF pagination 
//-----------------------------------------------------------------------------

import { useCallback } from 'react' 
import { useSelector, useDispatch } from 'react-redux' 
import { setCurrentPage } from '@/store' 

const usePDFPagination = () => {
  const dispatch = useDispatch() 
  const currentPage = useSelector((state) => state.reader.currentPage) 
  const viewMode = useSelector((state) => state.reader.viewMode) 
  const totalPages = useSelector(
    (state) => state.reader.activeBook?.totalPages || 1
  ) 

  const isDouble = viewMode === 'double' // Double page mode 
  const step = isDouble ? 2 : 1 // Pages to move on navigation 

  const isPrevDisabled = currentPage <= 1 // Disable "previous" button if at start 
  const isNextDisabled = currentPage + step - 1 >= totalPages // Disable "next" button if at end 

  //-----------------------------------------------------------------------------
  //– Navigate to previous page(s) if allowed 
  //-----------------------------------------------------------------------------
  const handlePrev = useCallback(() => {
    if (!isPrevDisabled) {
      const clamped = Math.max(1, currentPage - step) // Clamp to first page
      dispatch(setCurrentPage(clamped))
    }
  }, [dispatch, currentPage, step, isPrevDisabled])

  //-----------------------------------------------------------------------------
  //– Navigate to next page(s) if allowed 
  //-----------------------------------------------------------------------------
  const handleNext = useCallback(() => {
    if (!isNextDisabled) {
      const clamped = Math.min(totalPages, currentPage + step) // Clamp to last page
      dispatch(setCurrentPage(clamped))
    }
  }, [dispatch, currentPage, step, isNextDisabled, totalPages])

  return {
    currentPage, // Current page number 
    totalPages, // Total number of pages 
    isPrevDisabled, // Disable "previous" button if needed 
    isNextDisabled, // Disable "next" button if needed 
    handlePrev, // Go to previous page(s) 
    handleNext, // Go to next page(s) 
  }
}

export default usePDFPagination 
