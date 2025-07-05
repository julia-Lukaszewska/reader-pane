/**
 * @file ReaderToolbar.jsx
 * @description
 * Top toolbar for the reader view, includes navigation and controls
 * for page view mode, zoom, and page navigation.
 */

import React, { memo, useCallback } from 'react'
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

const StyledToolbar = styled.nav`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 7vh;
  width: 100%;
  padding: var(--padding-03);
  background: rgb(var(--color-400-04) / .6);
  border-bottom: var(--border-02);
  overflow: hidden;
  box-shadow: var(--shadow-02);

`

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`

const CenterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin: 0 auto;
`

const BackButton = styled(IoArrowBack)`
  cursor: pointer;
`

//-----------------------------------------------------------------------------
// Component: ReaderToolbar
//-----------------------------------------------------------------------------

/**
 * Renders the top toolbar in the PDF reader view.
 *
 * Features:
 * - Back button (to return to library)
 * - Page view mode toggle (single/double)
 * - Zoom controls (in/out/reset)
 * - Page navigation controls (prev/next)
 *
 * @component
 * @returns {JSX.Element}
 */
const ReaderToolbar = () => {
  const navigate = useNavigate()
  const goBack = useCallback(() => navigate('/library'), [navigate])

  return (
    <StyledToolbar aria-label="Reader toolbar">
      <LeftSection>
        <BackButton
          size={32}
          color="white"
          aria-label="Go back to library"
          onClick={goBack}
        />
      </LeftSection>

      <CenterSection>
        <PageViewModeToggle aria-label="Page view mode toggle" />
        <PDFZoomControls aria-label="Zoom controls" />
        <PDFPageControls aria-label="Page navigation controls" />
      </CenterSection>
    </StyledToolbar>
  )
}

export default memo(ReaderToolbar)
