/**
 * @file LoadingSpinner.jsx
 * @description Simple full-size spinner used as a loading indicator.
 * Displays a centered animated circular spinner.
 */

import styled, { keyframes } from 'styled-components'

//-----------------------------------------------------------------------------
// Spinner animation
//-----------------------------------------------------------------------------
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------
const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
/**
 * Renders a centered spinner animation.
 * Can be used to indicate loading state for full-page or section.
 * @returns {JSX.Element}
 */
const LoadingSpinner = () => {
  return (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  )
}

export default LoadingSpinner
