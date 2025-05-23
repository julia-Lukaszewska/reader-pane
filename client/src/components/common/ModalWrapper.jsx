/**
 * @file ModalWrapper.jsx
 * @description Reusable fullscreen modal container with blurred overlay.
 * Closes when the user clicks outside the content box.
 */

import React from 'react'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Styles
//-----------------------------------------------------------------------------

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  z-index: 999;
`

const ModalBox = styled.div`
  background: var(--modal-bg, #028850);
  border-radius: var(--border-radius, 8px);
  padding: 1.5rem;
  max-width: 90%;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------

/**
 * Modal container with overlay.
 *
 * @param {Object} props
 * @param {*} props.children - Content to display inside the modal
 * @param {Function} props.onClose - Callback called when clicking outside
 */
const ModalWrapper = ({ children, onClose }) => {
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <Overlay onClick={handleClickOutside}>
      <ModalBox>{children}</ModalBox>
    </Overlay>
  )
}

export default ModalWrapper
