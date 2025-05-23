/**
 * @file PDFPageControls.jsx
 * @description Pagination controls for PDF viewer, allowing navigation between pages.
 */

import React from 'react'
import styled from 'styled-components'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { usePDFPagination } from '@reader/hooks'
import {
  selectActiveBookId,
  selectPageViewMode,
  selectBookStaticById,
} from '@/store/selectors'

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
  
const StyledPagination = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  button {
    background: none;
    border: none;
    padding: 0.25rem;
    font-size: 1.5rem;
    color: white;
    cursor: pointer;

    &:disabled {
      opacity: 0.4;
      cursor: default;
    }
  }
`

const PageInfo = styled.span`
  font-size: 0.9rem;
  color: #fff;
`

//-----------------------------------------------------------------------------
// Component: PDFPageControls
//-----------------------------------------------------------------------------

/**
 * Renders back/next buttons and current page info.
 * Uses `usePDFPagination` to determine logic based on view mode and total pages.
 *
 * Hidden if not in /read route or missing book data.
 */
const PDFPageControls = () => {
  console.log('PDFPageControls')

  const location = useLocation()
  const bookId = useSelector(selectActiveBookId)
  const viewMode = useSelector(selectPageViewMode)

  // Pobieramy totalPages z cache statycznych danych książki
  const staticBook = useSelector(selectBookStaticById(bookId))
  const totalPages = staticBook?.meta?.totalPages ?? 0

  const {
    currentPage,
    isPrevDisabled,
    isNextDisabled,
    handlePrev,
    handleNext,
  } = usePDFPagination(bookId, totalPages, viewMode)

  // Ukryj, jeśli poza /read, brak książki lub brak stron
  if (
    !location.pathname.startsWith('/read') ||
    !bookId ||
    totalPages <= 0
  ) {
    return null
  }

  return (
    <StyledPagination>
      <button onClick={handlePrev} disabled={isPrevDisabled}>
        <IoChevronBack />
      </button>
      <PageInfo>
        {currentPage} of {totalPages}
      </PageInfo>
      <button onClick={handleNext} disabled={isNextDisabled}>
        <IoChevronForward />
      </button>
    </StyledPagination>
  )
}

export default PDFPageControls
