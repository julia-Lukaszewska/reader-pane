// src/modules/book/BookCardPreviewModal/BookCardPreviewModal.jsx
import React from "react";
import { createPortal } from "react-dom";
import styled, { keyframes } from "styled-components";

import { useBookCardModal } from "./useBookCardModal";
import ModalBox from "./ModalBox";

// Animation
const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.97); }
  to   { opacity: 1; transform: scale(1);  }
`;

// Overlay for background
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  z-index: 1000;
`;

// Modal container
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
`;

export default function BookCardPreviewModal({ book, onClose }) {
  
  // Hook for form state and handlers
  const {
    form,
    isEditingMain,
    isEditingNotes,
    handleChange,
    handleEdit,
    handleCancel,
    handleSave,
    handleRead,
    handleNotesChange,
  } = useBookCardModal(book, onClose);

  // Early return if no book data
  if (!book) return null;
  
  // Determine portal container
  const container =
    document.getElementById("modal-root") || document.body;

  // Render modal via portal
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
  );
}
