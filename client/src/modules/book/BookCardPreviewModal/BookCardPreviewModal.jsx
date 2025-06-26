/**
 * @file BookCardPreviewModal.jsx
 * @description Root modal component for viewing and editing book details via portal.
 */

import React from 'react'
import { createPortal } from 'react-dom'
import styled, { keyframes } from 'styled-components'

import { useBookCardModal } from './useBookCardModal'
import ModalBox from './ModalBox'

//-----------------------------------------------------------------------------
// Animation
//-----------------------------------------------------------------------------

//--- Modal fade and scale animation
const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.97); }
  to   { opacity: 1; transform: scale(1);  }
`

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

//--- Overlay for darkened background
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  z-index: 1000;
`

//--- Container for modal content
const ModalWrapper = styled.div`
  width: var(--modal-width);
  height: var(--modal-height);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 1rem;
  background: rgba(30, 35, 45, 0.85);
  backdrop-filter: blur(12px);
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 2rem 5rem rgba(0,0,0,0.4), inset 0 0 1rem rgba(255,255,255,0.15);
  animation: ${fadeIn} 0.3s ease-out;
`

//-----------------------------------------------------------------------------
// Component: BookCardPreviewModal
//-----------------------------------------------------------------------------

/**
 * Fullscreen modal that displays the book preview and editor.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.book - Book object to display in the modal
 * @param {Function} props.onClose - Callback to close the modal
 */
export default function BookCardPreviewModal({ book, onClose }) {
  //--- Hook for form state and handlers
const currentBook = useSelector(selectBookById(book?._id))

  useEffect(() => {
    if (!currentBook) onClose?.()
  }, [currentBook, onClose])

  const modalState = useBookCardModal(currentBook ?? {}, onClose)

  //--- Don't render modal if book is null
  if (!book) return null

  //--- Use existing modal container or fallback to body
  const container = document.getElementById('modal-root') || document.body

  //--- Render modal inside portal
  return createPortal(
    <Overlay onClick={onClose}>
      <ModalWrapper onClick={e => e.stopPropagation()}>
        <ModalBox
          form={form}
          isEditingMain={isEditingMain}
          isEditingNotes={isEditingNotes}
          handleChange={handleChange}
          handleEdit={handleEdit}
          handleCancel={handleCancel}
          handleSave={handleSave}
          handleRead={handleRead}
          handleNotesChange={handleNotesChange}
          onClose={onClose}
        />
      </ModalWrapper>
    </Overlay>,
    container
  )
}
