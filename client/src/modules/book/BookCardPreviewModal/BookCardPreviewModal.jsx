/**
 * @file BookCardPreviewModal.jsx
 * @description Root modal component that combines the former BookCardPreviewModal and ModalBox
 *              into a single, loss‑free component. All existing sections, styled‑components,
 *              and logic remain untouched; only the public API surface has been unified.
 */

import React from 'react'
import { createPortal } from 'react-dom'
import styled, { keyframes } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

//-----------------------------------------------------------------------------
// Redux selectors & actions
//----------------------------------------------------------------------------- 
import {
  selectPreviewBook,
  selectBookModalForm,
  selectIsEditingMain,
  selectIsEditingNotes,
} from '@/store/selectors'
import { clearPreviewBook } from '@/store/slices/bookSlice'
import { resetForm } from '@/store/slices/bookModalSlice'
import useEditBook from '@/modules/book/hooks/useEditBook'
//-----------------------------------------------------------------------------
// Domain hooks
//----------------------------------------------------------------------------- 


//-----------------------------------------------------------------------------
// UI sections (left, right, footer)
//----------------------------------------------------------------------------- 
import LeftSection   from './sections/LeftSection'
import RightSection  from './sections/RightSection'
import FooterSection from './sections/FooterSection'

//-----------------------------------------------------------------------------
// Animation
//----------------------------------------------------------------------------- 
const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.97); }
  to   { opacity: 1; transform: scale(1);   }
`;

//-----------------------------------------------------------------------------
// Styled‑components
//----------------------------------------------------------------------------- 

// Overlay covering the entire viewport
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

// Wrapper that holds the modal grid
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
  box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.4),
              inset 0 0 1rem rgba(255, 255, 255, 0.15);
  animation: ${fadeIn} 0.3s ease-out;
`;

// Grid container reused from the original ModalBox.jsx
const ModalGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  gap: 1em;
  overflow: hidden;
  border-radius: 1em;
  padding: 1em;

  /* Grid layout */
  grid-template-columns: 1.1fr 2.9fr;
  grid-template-rows: 1fr 10%;
  grid-template-areas:
    'left  right'
    'footer footer';

  /* Appearance */
  background: var(--gradient-main);
  backdrop-filter: blur(12px) saturate(120%);
  box-shadow: 0 0 24px 4px rgba(0, 0, 0, 0.08);

  color: var(--color-light-0);
  font-size: var(--modal-font-size);
`;

//-----------------------------------------------------------------------------
// Component
//----------------------------------------------------------------------------- 

export default function BookCardPreviewModal() {
  // Redux state ---------------------------------------------------------
  const dispatch        = useDispatch()
  const book            = useSelector(selectPreviewBook)
  const form            = useSelector(selectBookModalForm)
  const isEditingMain   = useSelector(selectIsEditingMain)
  const isEditingNotes  = useSelector(selectIsEditingNotes)
  const { editBook }    = useEditBook()


  // Close handler --------------------------------------------------------------
  const onClose = async () => {
    if (book && (isEditingMain || isEditingNotes)) {
      if (isEditingMain) {
        const updates = {
          meta: { ...form.meta, updatedAt: new Date().toISOString() },
          flags: { ...form.flags },
          stats: { ...form.stats },
        }
        await editBook(book._id, updates)
      }
      if (isEditingNotes) {
        const notesArray = Array.isArray(form.flags.notes) ? form.flags.notes : []
        await editBook(book._id, { flags: { notes: notesArray } })
      }
    }
    dispatch(clearPreviewBook())
    dispatch(resetForm())
  }


  // Guard: render nothing when there is no book --------------------------------
  if (!book) return null;

  // Mount node (falls back to body) -------------------------------------------
  const container = document.getElementById('modal-root') || document.body

  // Portal render -------------------------------------------------------------
  return createPortal(
    <Overlay onClick={onClose}>
        <ModalWrapper onClick={e => e.stopPropagation()}>
        <ModalGrid>
          <LeftSection />

          <RightSection />

          <FooterSection />
        </ModalGrid>
      </ModalWrapper>
    </Overlay>,
    container,
  );
}
