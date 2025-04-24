// -----------------------------------------------------------------------------
//------ IMPORTS  
// -----------------------------------------------------------------------------

import styled from 'styled-components'
import { IoCloseOutline } from 'react-icons/io5'
import { useState, useContext } from 'react'
import ConfirmModal from './ConfirmModal'
import { moveToTrash, deleteBookForever } from '../api'
import { AppContext } from '../context/AppContext'
import BookPreviewModal from './BookPreviewModal'

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
  z-index: 9000;
`
const ProgressBar = styled.div`
  height: 6px;
  border-radius: 3px;
  background: rgb(255, 255, 255);
  overflow: hidden;
  margin-top: 0.5rem;
`

const ProgressFill = styled.div`
  height: 100%;
  background: var(--color-accent);
  width: ${({ percent }) => percent}%;
  transition: width 0.3s ease;
`

// -----------------------------------------------------------------------------
//------ BookTile Component  
// -----------------------------------------------------------------------------

const BookTile = ({ book, isManaging, selectedBooks, setSelectedBooks }) => {
  const [showModal, setShowModal] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const { dispatch } = useContext(AppContext)
  const current = book.currentPage || book.progress || 1 //Always some value
  const total = book.totalPages

  const percent = (() => {
    if (!total || total <= 1) return current >= total ? 100 : 0
    const raw = ((current - 1) / (total - 1)) * 100
    return Math.min(100, Math.max(0, Math.round(raw)))
  })()

  const handleClick = () => {
    setShowPreview(true)
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
        {isManaging && (
          <input
            type="checkbox"
            checked={selectedBooks.includes(book._id)}
            onChange={(e) => {
              e.stopPropagation()
              if (e.target.checked) {
                setSelectedBooks((prev) => [...prev, book._id])
              } else {
                setSelectedBooks((prev) => prev.filter((id) => id !== book._id))
              }
            }}
            style={{
              position: 'absolute',
              top: '0.5rem',
              left: '0.5rem',
              zIndex: 9000,
              transform: 'scale(40)',
              color: 'white',
              backgroundColor: 'white',
            }}
          />
        )}
        <h4>{book.title}</h4>

        <Overlay>Preview not available</Overlay>
        <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>
          {percent}% read
        </span>

        <ProgressBar>
          <ProgressFill percent={percent} />
        </ProgressBar>
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
      {showPreview && (
        <BookPreviewModal book={book} onClose={() => setShowPreview(false)} />
      )}
    </>
  )
}

export default BookTile
