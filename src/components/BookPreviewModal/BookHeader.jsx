// src/components/BookPreviewModal/BookHeader.jsx
import React from 'react'
import { Cover, Title, Subtitle, Field, Label, Input } from './ModalStyles' 

const BookHeader = ({ modalBook, form, isEditing, handleChange }) => {
  return (
    <>
      {modalBook.thumbnailUrl && (
        <Cover src={modalBook.thumbnailUrl} alt={form.title} />
      )}

      {!isEditing ? (
        <>
          <Title>{form.title}</Title>
          <Subtitle>{form.author}</Subtitle>
        </>
      ) : (
        <>
          <Field>
            <Label>Title</Label>
            <Input name="title" value={form.title} onChange={handleChange} />
          </Field>
          <Field>
            <Label>Author</Label>
            <Input name="author" value={form.author} onChange={handleChange} />
          </Field>
        </>
      )}
    </>
  )
}

export default React.memo(BookHeader)
