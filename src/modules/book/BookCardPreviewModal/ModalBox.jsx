/**
 * @file ModalBox.jsx
 * @description Layout container for the book preview modal – includes left, right and footer sections.
 */

import React from 'react'
import styled from 'styled-components'

import FooterSection from './sections/FooterSection'
import LeftSection from './sections/LeftSection'
import RightSection from './sections/RightSection'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

//--- Grid container for the modal layout
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
`

//-----------------------------------------------------------------------------
// Component: ModalBox
//-----------------------------------------------------------------------------

/**
 * Internal structure of the book preview modal.
 * Composed of LeftSection (cover/rating), RightSection (form), and FooterSection (actions).
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.isEditingNotes - Whether notes are in edit mode
 * @param {boolean} props.isEditingMain - Whether main form is in edit mode
 * @param {Function} props.handleCancel - Cancel handler (with scope)
 * @param {Function} props.handleSave - Save handler (with scope)
 * @param {Function} props.handleRead - Handler for "Read" button
 * @param {Function} props.handleEdit - Edit trigger function
 * @param {Function} props.handleNotesChange - Handler for saving notes
 * @param {Function} props.onClose - Close modal handler
 * @param {Object} restProps - Remaining props including form and handleChange
 */
const ModalBox = ({
  isEditingNotes,
  isEditingMain,
  handleCancel,
  handleSave,
  handleRead,
  handleEdit,
  handleNotesChange,
  onClose,
  ...restProps
}) => (
  <ModalGrid>
    <LeftSection
      form={restProps.form}
      handleChange={restProps.handleChange}
      handleRead={handleRead}
    />
    <RightSection
      form={restProps.form}
      isEditingMain={isEditingMain}
      isEditingNotes={isEditingNotes}
      handleChange={restProps.handleChange}
      handleNotesChange={handleNotesChange}
      handleSave={handleSave}
      handleEdit={handleEdit}
      handleCancel={handleCancel}
      onClose={onClose}
    />
    <FooterSection
      isEditing={isEditingMain}
      onEdit={() => handleEdit('main')}
      onCancel={() => handleCancel('main')}
      onSave={() => handleSave('main')}
      onClose={onClose}
    />
  </ModalGrid>
)

export default ModalBox
