/**
 * @file ReaderToolbar.jsx
 * @description Top navigation toolbar inside the PDF reader view, with back button, page view toggle, zoom and pagination controls.
 */

import styled from 'styled-components'
import {
  PDFPageControls,
  PDFZoomControls,
  PageViewModeToggle,
} from '@reader/ReaderToolbar'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------
  
//--- Main toolbar container
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

//--- Center section for view/zoom/pagination controls
const CenterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin: 0 auto;
`

//--- Left section for back navigation
const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`

//-----------------------------------------------------------------------------
// Component: ReaderToolbar
//-----------------------------------------------------------------------------

/**
 * Renders the reader view's top toolbar with:
 * - Back button to return to the library
 * - Page view mode toggle (single/double)
 * - Zoom controls (in/out/reset)
 * - Page navigation controls (prev/next)
 *
 * @component
 * @returns {JSX.Element}
 */
const ReaderToolbar = () => {
  console.log('ReaderToolbar')
  const navigate = useNavigate()

  return (
    <StyledToolbar>
      <LeftSection>
        <IoArrowBack
          size={32}
          color='white'
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
