/**
 * @file PDFPageControls.jsx
 * @description Pagination controls for PDF viewer, allowing navigation between pages.
 */

import React from "react"
import styled from "styled-components"
import { IoChevronBack, IoChevronForward } from "react-icons/io5"
import { useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { setCurrentPage } from "@/store/slices/readerSlice"
import {
  selectActiveBookId,
  selectTotalPages,
  selectPageViewMode,
} from "@/store/selectors"

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
 * Manages page state locally via Redux actions.
 * Hidden if not in /read route or missing book data.
 */

const PDFPageControls = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  // Selectors
  const bookId = useSelector(selectActiveBookId)
  const totalPages = useSelector(selectTotalPages)
  const currentPage = useSelector((state) => state.reader.currentPage)
  const viewMode = useSelector(selectPageViewMode)

  // Clamp helper
  const clamp = (n) => Math.max(1, Math.min(n, totalPages))

  // Navigation handlers
  const goToPage = (n) => dispatch(setCurrentPage(clamp(n)))
  const step = viewMode === "double" ? 2 : 1
  const prevPage = () => goToPage(currentPage - step)
  const nextPage = () => goToPage(currentPage + step)

  const isPrevDisabled = currentPage - step < 1
  const isNextDisabled = currentPage + step > totalPages

  // Guard: render only on /read and when we have pages
  if (!location.pathname.startsWith("/read") || !bookId || totalPages <= 0) {
    return null
  }

  return (
    <StyledPagination>
      <button onClick={prevPage} disabled={isPrevDisabled}>
        <IoChevronBack />
      </button>
      <PageInfo>
        {currentPage} of {totalPages}
      </PageInfo>
      <button onClick={nextPage} disabled={isNextDisabled}>
        <IoChevronForward />
      </button>
    </StyledPagination>
  )
}

export default PDFPageControls
