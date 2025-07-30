/**
 * @file src/components/PDFPageControls.jsx
 * @description
 * Pagination controls for the PDF viewer (← / →).
 * 
 * - Visible only on the `/read` route
 * - Requires an active book in the store
 * - Supports both single and double page modes
 * - Handles clamped navigation using the current page and total page count
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { useCallback, useState, useEffect } from 'react'
import styled from 'styled-components'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import {
  selectActiveBookId,
  selectTotalPages,
  selectPageViewMode,
  selectCurrentPage,
} from '@/store/selectors'
import { setCurrentPage } from '@/store/slices/readerSlice'

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Pagination = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  button {
    background: none;
    border: none;
    padding: 0.25rem;
    font-size: 1.5rem;
    color: #fff;
    cursor: pointer;

    &:disabled {
      opacity: 0.35;
      cursor: default;
    }
  }
`

const Info = styled.span`
  font-size: 0.9rem;
  color: #fff;
`
const PageInput = styled.input`
  width: 3rem;
  text-align: center;
  font-size: 0.9rem;
  color: #fff;
  background: transparent;
  border: 1px solid #fff;
  border-radius: 0.25rem;
  -moz-appearance: textfield;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

//-----------------------------------------------------------------------------
// Component: PDFPageControls
//-----------------------------------------------------------------------------
/**
 * Renders left/right navigation controls for the active PDF book.
 * Only visible inside the reader route and when page data is available.
 */
export default function PDFPageControls() {
  const loc = useLocation()
  const dispatch = useDispatch()

  const bookId = useSelector(selectActiveBookId)
  const totalPages = useSelector(selectTotalPages)
  const currentPage = useSelector(selectCurrentPage)
  const viewMode = useSelector(selectPageViewMode) // 'single' | 'double'

    const [value, setValue] = useState(String(currentPage))
const isScrollMode = viewMode === 'scroll'
  useEffect(() => {
    setValue(String(currentPage))
  }, [currentPage])
  const step = viewMode === 'double' ? 2 : 1
  
  /**
   * Navigate to a page number, clamped to valid range.
   * @param {number} n - Target page number
  */
const goTo = useCallback((n) => {
  if (isScrollMode) return
  const page = Math.max(1, Math.min(totalPages, n))
  dispatch(setCurrentPage(page))
}, [dispatch, totalPages, isScrollMode])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const num = parseInt(value, 10)
      if (!Number.isNaN(num)) {
        goTo(num)
      }
    }
  }

 const prevDisabled = isScrollMode || currentPage - step < 1
const nextDisabled = isScrollMode || currentPage + step > totalPages
  
  // Show only when on reader route and book/page data is valid
  if (!loc.pathname.startsWith('/read') || !bookId || totalPages < 1) {
    return null
  }
  return (
    <Pagination>
      <button onClick={() => goTo(currentPage - step)} disabled={prevDisabled}>
        <IoChevronBack />
      </button>

       <PageInput
        type='text'
        inputMode='numeric'
        value={value}
         readOnly={isScrollMode}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Info>/ {totalPages}</Info>
      

      <button onClick={() => goTo(currentPage + step)} disabled={nextDisabled}>
        <IoChevronForward />
      </button>
    </Pagination>
  )
}
