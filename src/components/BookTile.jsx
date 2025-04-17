// -----------------------------------------------------------------------------
//------ IMPORTS  
// -----------------------------------------------------------------------------

import styled from 'styled-components'
import { IoCloseOutline } from 'react-icons/io5'
import { useState, useContext } from 'react'
import ConfirmModal from './ConfirmModal'
import { moveToTrash, deleteBookForever } from '../api'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { saveLastBookId } from '../utils/storage'

// -----------------------------------------------------------------------------
//------ Styled Components  
// -----------------------------------------------------------------------------

const Card = styled.div`
  position: relative;
  aspect-ratio: 2 / 3;
  background: var(--gradient-main);
  width: var(--book-size, 150px);
  box-shadow: var(--glass-shadow);
  padding: 1rem;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: all 0.3s ease;
  font-size: 1.2rem;
  text-align: center;
  font-weight: 200;

  &:hover {
    transform: translateY(-4px);
    background-color: rgba(58, 138, 195, 0.86);
  }
`

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
  border-radius: var(--border-radius);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;

  ${Card}:hover & {
    opacity: 1;
  }
`

const CloseBtn = styled.button`
  all: unset;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 1.4rem;
  color: var(--color-icon-default);
  cursor: pointer;
  z-index: 2;
`

// -----------------------------------------------------------------------------
//------ BookTile Component  
// -----------------------------------------------------------------------------

const BookTile = ({ book }) => {
  const [showModal, setShowModal] = useState(false)
  const { dispatch } = useContext(AppContext)
  const navigate = useNavigate()

  const handleClick = () => {
    saveLastBookId(book._id)  
    dispatch({ type: 'SET_ACTIVE_BOOK', payload: book })  
    navigate(`/read/${book._id}`)  
  }

  const handleArchive = async () => {
    await moveToTrash(book._id)
    dispatch({ type: 'ARCHIVE_BOOK', payload: book._id })
    setShowModal(false)
  }

  const handleDelete = async () => {
    await deleteBookForever(book._id)
    dispatch({ type: 'REMOVE_BOOK', payload: book._id })
    setShowModal(false)
  }

  return (
    <>
      <Card onClick={handleClick}>
        <CloseBtn
          aria-label="Delete book"
          onClick={(e) => {
            e.stopPropagation()
            setShowModal(true)
          }}
        >
          <IoCloseOutline />
        </CloseBtn>
        <h4>{book.title}</h4>
        <small>PDF</small>
        <Overlay>Preview not available</Overlay>
      </Card>

      {showModal && (
        <ConfirmModal
          variant="library"
          bookTitle={book.title}
          onTrash={handleArchive}
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  )
}

export default BookTile
