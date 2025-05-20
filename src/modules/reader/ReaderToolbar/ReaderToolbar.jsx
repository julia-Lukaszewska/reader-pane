//-----------------------------------------------------------------------------
//------ Toolbar: Top navigation inside reader view 
//-----------------------------------------------------------------------------

import styled from 'styled-components'


import {PDFPageControls, PDFZoomControls,PageViewModeToggle} from '@reader/ReaderToolbar'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

const StyledToolbar = styled.nav`
  position: relative;
  display: flex;

  justify-content: center;
  align-items: center;
  height: 7vh;
  width: 100%;
  padding: 2rem 3rem;

  background: var(--gradient-metal-blue-light);
  border-bottom: 1rem solid var(--color-metal-100);
  overflow: hidden;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.384);
`

const CenterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin: 0 auto;
`

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`

const ReaderToolbar = () => {
  const navigate = useNavigate()

  return (
    <StyledToolbar>
      <LeftSection>
        
        <IoArrowBack
          size={32}
          color="white"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/library')}
        />
      </LeftSection>
      <CenterSection>
        <PageViewModeToggle />
        <PDFZoomControls />
        <PDFPageControls />
      </CenterSection>
    </StyledToolbar>
  )
}

export default ReaderToolbar
