import { useContext, useCallback } from 'react'
import { AppContext } from '../context/AppContext'

/**
 * Hook that provides logic for PDF pagination.
 * Handles single and double-page modes, navigation and boundary validation.
 */
export function usePDFPagination() {
  const { state, dispatch } = useContext(AppContext)
  const { currentPage, viewMode, activeBook } = state
  const totalPages = activeBook?.totalPages ?? 0  

  const isDouble = viewMode === 'double'  
  const step = isDouble ? 2 : 1  

  const isPrevDisabled = currentPage <= 1  
  const isNextDisabled = currentPage + step - 1 >= totalPages  

  /**
   * Navigate to previous page(s) if allowed.
   */
  const handlePrev = useCallback(() => {
    if (!isPrevDisabled) {
      dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPage - step })  
    }
  }, [dispatch, currentPage, step, isPrevDisabled])

  /**
   * Navigate to next page(s) if allowed.
   */
  const handleNext = useCallback(() => {
    if (!isNextDisabled) {
      dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPage + step })  
    }
  }, [dispatch, currentPage, step, isNextDisabled])

  return {
    currentPage, // Current page number  
    totalPages, // Total number of pages  
    isPrevDisabled, // Boolean flag for disabling "previous" button  
    isNextDisabled, // Boolean flag for disabling "next" button  
    handlePrev, // Function to go to previous page(s)  
    handleNext, // Function to go to next page(s)  
  }
}
