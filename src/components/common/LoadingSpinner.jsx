//-----------------------------------------------------------------------------
//------ LoadingSpinner – Simple loading animation 
//-----------------------------------------------------------------------------

import React from 'react'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

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

const LoadingSpinner = () => {
  return (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  )
}

export default LoadingSpinner
