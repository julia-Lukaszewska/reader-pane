// src/components/BookPreviewModal.jsx
import React from 'react'

import { useSelector } from 'react-redux'
import { bookFieldConfig, BookField } from '@/components'
import { useBookPreviewModal } from '@/hooks'
import ButtonsModal from './ButtonsModal'
import BookHeader from './BookHeader'
import { Overlay, ModalBox, CloseIcon } from './ModalStyles'

const BookPreviewModal = ({ book, onClose }) => {
  const stateBook = useSelector((state) => state.book)
  const modalBook = book || stateBook
  const {
    form,
    isEditing,
    handleChange,
    handleEdit,
    handleSave,
    handleRead,
    handleClose,
  } = useBookPreviewModal(modalBook, onClose)

  if (!modalBook) return null

  const visibleFields = isEditing
    ? Object.keys(bookFieldConfig)
    : Object.keys(bookFieldConfig).filter(
        (field) => form[field] !== undefined && form[field] !== ''
      )

  return (
    <Overlay onClick={handleClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CloseIcon onClick={handleClose} />
        <BookHeader
          modalBook={modalBook}
          form={form}
          isEditing={isEditing}
          handleChange={handleChange}
        />
        <div className="space-y-2 mt-4 mb-6">
          {visibleFields.map((field) => (
            <BookField
              key={field}
              field={field}
              bookId={modalBook._id}
              value={form[field]}
              config={bookFieldConfig[field]}
              editing={isEditing}
              onChange={handleChange}
            />
          ))}
        </div>

        <ButtonsModal
          isEditing={isEditing}
          handleEdit={handleEdit}
          handleSave={handleSave}
          handleRead={handleRead}
          handleClose={handleClose}
        />
      </ModalBox>
    </Overlay>
  )
}

export default React.memo(BookPreviewModal)
