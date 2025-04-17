//-----------------------------------------------------------------------------
//------ PDFPageControls: Page navigation buttons for PDF view  
//-----------------------------------------------------------------------------

import { usePDFPagination } from '../hooks/usePDFPagination'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
//------ Styled container  
//-----------------------------------------------------------------------------

const StyledPagination = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`

const PageInfo = styled.span`
  font-size: 0.85rem;
  color: #fff;
`

//-----------------------------------------------------------------------------
//------ Component: PDFPageControls  
//-----------------------------------------------------------------------------

const PDFPageControls = () => {
  const {
    currentPage,
    totalPages,
    isPrevDisabled,
    isNextDisabled,
    handlePrev,
    handleNext,
  } = usePDFPagination()

  return (
    <StyledPagination>
      <button
        onClick={handlePrev}
        disabled={isPrevDisabled}
        title="Previous page" //  
      >
        <IoChevronBack />
      </button>
      <PageInfo>
        {currentPage} of {totalPages}
      </PageInfo>
      <button
        onClick={handleNext}
        disabled={isNextDisabled}
        title="Next page" //  
      >
        <IoChevronForward />
      </button>
    </StyledPagination>
  )
}

export default PDFPageControls
