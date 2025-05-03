// src/components/PDFPageControls.jsx
import { useSelector, useDispatch } from 'react-redux'

import { setCurrentPage, selectBookById } from '@/store'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
// import styled from 'styled-components'

// const StyledPagination = styled.div`

// `
// const PageInfo = styled.span`

// `

export default function PDFPageControls() {
  const dispatch = useDispatch()
  const { currentPage, viewMode, activeBookId } = useSelector((s) => s.reader)
  const book = useSelector((s) => selectBookById(s, activeBookId))
  const totalPages = book?.totalPages ?? 1
  const step = viewMode === 'double' ? 2 : 1

  const isPrevDisabled = currentPage <= 1
  const isNextDisabled = currentPage + step - 1 >= totalPages

  const handlePrev = () => {
    if (!isPrevDisabled) dispatch(setCurrentPage(currentPage - step))
  }
  const handleNext = () => {
    if (!isNextDisabled) dispatch(setCurrentPage(currentPage + step))
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
