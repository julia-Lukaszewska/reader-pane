//-----------------------------------------------------------------------------
//------ BookPreviewModal: Modal with book info and editable form  
//-----------------------------------------------------------------------------

import React, { useState, useContext } from 'react'
import styled, { keyframes } from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { AppContext } from '../context/AppContext'
import { saveLastBookId } from '../utils/storage'
//-----------------------------------------------------------------------------
//------ Modal overlay style  
//-----------------------------------------------------------------------------
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`

//-----------------------------------------------------------------------------
//------ Animation for modal appearance  
//-----------------------------------------------------------------------------
const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

//-----------------------------------------------------------------------------
//------ Modal box style  
//-----------------------------------------------------------------------------
const ModalBox = styled.div`
  background-color: #3b83b492;
  padding: 2rem;
  border-radius: 1rem;
  width: 40rem;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  backdrop-filter: blur(10px);
  animation: ${fadeInScale} 0.25s ease;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const Label = styled.label`
  color: white;
  font-weight: 500;
  font-size: 1.05rem;
  width: 8rem;
`

const Input = styled.input`
  padding: 0.6rem;
  font-size: 1.05rem;
  flex: 1;
  border: 1px solid transparent;
  border-radius: 6px;
  background-color: ${({ disabled }) =>
    disabled ? 'transparent' : '#ffffffc7'};
  transition: border 0.2s ease;
  &:focus {
    outline: none;
    border: 1px solid #ffffff;
    background-color: #ffffff;
  }
`

const TextArea = styled.textarea`
  padding: 0.6rem;
  font-size: 1.05rem;
  resize: vertical;
  width: 100%;
  border: 1px solid transparent;
  border-radius: 6px;
  background-color: ${({ disabled }) =>
    disabled ? 'transparent' : '#ffffffc7'};
  transition: border 0.2s ease;
  &:focus {
    outline: none;
    border: 1px solid #ffffff;
    background-color: #ffffff;
  }
`

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  gap: 0.5rem;
  font-size: 1rem;
`

//-----------------------------------------------------------------------------
//------ BookPreviewModal component definition  
//-----------------------------------------------------------------------------
const BookPreviewModal = ({ book, onClose }) => {
  const [form, setForm] = useState({
    title: book?.title || '',
    author: book?.author || '',
    description: book?.description || '',
    notes: '',
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const navigate = useNavigate()
  const { dispatch } = useContext(AppContext)

  const handleEdit = () => {
    setIsEditing(true)  
  }

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_BOOK',
      payload: { _id: book._id, ...form },
    })
    setIsEditing(false)
  }

  const handleRead = () => {
    saveLastBookId(book._id)  
    dispatch({ type: 'SET_ACTIVE_BOOK', payload: book })  
    navigate(`/read/${book._id}`)  
  }

  if (!book) return null

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        {book.thumbnailUrl && (
          <img src={book.thumbnailUrl} alt="Book Cover" width="100%" />
        )}
        <Row>
          <Label htmlFor="title">Title:</Label>
          <Input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Row>
        <Row>
          <Label htmlFor="author">Author:</Label>
          <Input
            id="author"
            name="author"
            value={form.author}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Row>
        <Row>
          <Label htmlFor="description">Description:</Label>
        </Row>
        <TextArea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          disabled={!isEditing}
        />
        <Row>
          <Label htmlFor="notes">Notes:</Label>
        </Row>
        <TextArea
          id="notes"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={3}
          placeholder="My notes..."
          disabled={!isEditing}
        />
        <Buttons>
          {!isEditing ? (
            <button onClick={handleEdit}>Edit</button>
          ) : (
            <button onClick={handleSave}>Save</button>
          )}
          <button onClick={handleRead}>Read</button>
          <button onClick={onClose}>Close</button>
        </Buttons>
      </ModalBox>
    </Overlay>
  )
}

export default BookPreviewModal
