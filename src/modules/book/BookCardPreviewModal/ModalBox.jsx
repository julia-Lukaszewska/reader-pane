// src/modules/book/BookCardPreviewModal/ModalBox.jsx
import React from "react";
import styled from "styled-components";

import FooterSection from "./sections/FooterSection";
import LeftSection   from "./sections/LeftSection";
import RightSection  from "./sections/RightSection";

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
    "left  right"
    "footer footer";

  /* Appearance */
  background: var(--gradient-main);
  backdrop-filter: blur(12px) saturate(120%);
  box-shadow: 0 0 24px 4px rgba(0, 0, 0, 0.08);

  color: var(--color-light-0);
  font-size: var(--modal-font-size);
`;

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
    <LeftSection form={restProps.form} handleChange={restProps.handleChange} handleRead={handleRead}/>
    <RightSection
      form={restProps.form}
      isEditingMain={isEditingMain}
      handleSave={handleSave}
      handleEdit={handleEdit}
      isEditingNotes={isEditingNotes}
      handleChange={restProps.handleChange}
      handleNotesChange={handleNotesChange} 
    
      onSave={handleSave}
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
);
export default ModalBox;