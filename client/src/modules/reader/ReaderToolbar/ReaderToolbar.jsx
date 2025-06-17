import * as pdfjsLib from 'pdfjs-dist'
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
  padding: 2rem 3rem;
  background: var(--gradient-metal-blue-light);
  border-bottom: 1rem solid var(--color-metal-100);
  overflow: hidden;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.384);
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
  const navigate = useNavigate()
  const goBack = useCallback(() => navigate('/library'), [navigate])

  return (
    <StyledToolbar aria-label="Toolbar czytnika">
      <LeftSection>
        <BackButton
          size={32}
          color="white"
          aria-label="Wróć do biblioteki"
          onClick={goBack}
        />
      </LeftSection>

      <CenterSection>
        <PageViewModeToggle aria-label="Tryb widoku strony" />
        <PDFZoomControls aria-label="Kontrola powiększenia" />
        <PDFPageControls aria-label="Nawigacja stron" />
      </CenterSection>
    </StyledToolbar>
  )
}

export default memo(ReaderToolbar)
