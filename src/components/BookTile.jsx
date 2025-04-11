import styled from 'styled-components' // Styling with styled-components  
import { IoCloseOutline } from 'react-icons/io5' // Close icon from React Icons  
import { useState, useContext } from 'react' // React hooks  
import ConfirmModal from './ConfirmModal' // Modal confirmation component  
import { moveToTrash, deleteBookForever } from '../utils/api' // API functions for book actions  
import { AppContext } from '../context/AppContext' // Global state context  

// -----------------------------------------------------------------------------
//------ Styled components  
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
//------ BookTile component  
// -----------------------------------------------------------------------------

const BookTile = ({ book }) => {
  const [showModal, setShowModal] = useState(false) // Modal visibility state  
  const { dispatch } = useContext(AppContext) // Access global state  

  const handleArchive = async () => {
    await moveToTrash(book._id) // Move book to trash via API  
    dispatch({ type: 'ARCHIVE_BOOK', payload: book._id }) // Update state  
    setShowModal(false)
  }

  const handleDelete = async () => {
    await deleteBookForever(book._id) // Delete book permanently via API  
    dispatch({ type: 'REMOVE_BOOK', payload: book._id }) // Update state  
    setShowModal(false)
  }

  return (
    <>
      <Card>
        <CloseBtn
          aria-label="Delete book"
          onClick={(e) => {
            e.stopPropagation() // Prevent card click event  
            setShowModal(true) // Open confirmation modal  
          }}
        >
          <IoCloseOutline />
        </CloseBtn>
        <h4>{book.title}</h4>
        <small>PDF</small>
        <Overlay>Preview not available</Overlay>{' '}
        
      </Card>

      {showModal && (
        <ConfirmModal
          variant="library" // Modal styling variant  
          bookTitle={book.title} // Show book title  
          onTrash={handleArchive} // Archive action  
          onConfirm={handleDelete} // Permanent delete action  
          onCancel={() => setShowModal(false)} // Cancel action  
        />
      )}
    </>
  )
}

export default BookTile // Export component  
