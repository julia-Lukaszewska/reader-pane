/**
 * @file PDFPageControls.jsx
 * @description Pagination controls for PDF viewer, allowing navigation between pages.
 */
import React from 'react'
import styled from 'styled-components'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentPage } from '@/store/slices/readerSlice'
import { selectActiveBookId, selectTotalPages } from '@/store/selectors'

//-----------------------------------------------------
//------ Styled Components
//-----------------------------------------------------
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

//-----------------------------------------------------
//------ PDFPageControls Component
//-----------------------------------------------------
/**
 * @component PDFPageControls
 * @description Renders back/next buttons and current page info.
 *              Manages page state via Redux. Hidden if not on /read route or missing data.
 * @returns {React.ReactNode|null}
 */
const PDFPageControls = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  //-----------------------------------------------------
  //------ Redux State Selectors
  //-----------------------------------------------------
  const bookId      = useSelector(selectActiveBookId)
  const totalPages  = useSelector(selectTotalPages)
  const currentPage = useSelector(state => state.reader.currentPage)

  //-----------------------------------------------------
  //------ Navigation Helpers
  //-----------------------------------------------------
  const clamp = n => Math.max(1, Math.min(n, totalPages))
  const goToPage = n => dispatch(setCurrentPage(clamp(n)))
  const prevPage = () => goToPage(currentPage - 1)
  const nextPage = () => goToPage(currentPage + 1)

  const isPrevDisabled = currentPage <= 1
  const isNextDisabled = currentPage >= totalPages

  //-----------------------------------------------------
  //------ Guard: Only Render on /read with Valid Data
  //-----------------------------------------------------
  if (
    !location.pathname.startsWith('/read') ||
    !bookId ||
    totalPages <= 0
  ) {
    return null
  }

  //-----------------------------------------------------
  //------ Render Pagination Controls
  //-----------------------------------------------------
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

export default React.memo(PDFPageControls)
