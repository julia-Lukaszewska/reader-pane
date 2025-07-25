/**
 * @file BackendWakeupOverlay.jsx
 * @description Fullscreen overlay with a spinner and message.
 * Used to indicate that the backend service is starting up.
 */

import React from 'react'
import styled from 'styled-components'
import LoadingSpinner from './LoadingSpinner'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background:var(--modal-bg-02);
  backdrop-filter: var(--blur-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--modal-sm);
  z-index: var(--index-modal);
`

const Message = styled.p`
  color: var(--text-color-01);
  font-size: var(--text-02);
`

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------

/**
 * Displays a full-screen overlay with a loading spinner
 * and a message indicating that the backend is starting up.
 *
 * @returns {JSX.Element}
 */
export default function BackendWakeupOverlay() {
  return (
    <Overlay>
      <LoadingSpinner />
      <Message>Connecting to the server, please wait...</Message>
    </Overlay>
  )
}
