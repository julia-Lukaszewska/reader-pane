//-----------------------------------------------------------------------------
//------ ArchiveView Component – View for deleted books (archive)  
//-----------------------------------------------------------------------------

import styled from 'styled-components'
import { useState, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { restoreBook, deleteBookForever, getBooks } from '../api'
import ConfirmModal from '../components/ConfirmModal'

//-----------------------------------------------------------------------------
//------ BookGridContainer – outer layout container  
//-----------------------------------------------------------------------------

const BookGridContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-dark-900);
  justify-content: flex-start;
  padding: 0 3rem;
  height: 90%;
  width: 100%;
  box-sizing: border-box;
`

//-----------------------------------------------------------------------------
//------ BooksGrid – grid of deleted books  
//-----------------------------------------------------------------------------

const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  justify-items: center;
  align-items: start;
  gap: 1rem;
  padding: 2rem;
  width: 100%;
  height: 90%;
  background: var(--gradient-metal-blue-light);
  border-radius: var(--border-radius-md);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`

//-----------------------------------------------------------------------------
//------ BookCard – individual deleted book  
//-----------------------------------------------------------------------------

const BookCard = styled.div`
  position: relative;
  aspect-ratio: 2 / 3;
  width: var(--book-size, 150px);
  background: var(--gradient-main);
  border-radius: var(--border-radius-sm);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 1rem;
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    background-color: rgba(58, 138, 195, 0.86);
  }
`

//-----------------------------------------------------------------------------
//------ Title – archive heading  
//-----------------------------------------------------------------------------

const Title = styled.h2`
  color: var(--color-light-900);
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 2rem;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
`

//-----------------------------------------------------------------------------
//------ BtnPlaceholder – basic button style  
//-----------------------------------------------------------------------------

const BtnPlaceholder = styled.button`
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 4px;
  background-color: var(--color-blue-500);
  color: var(--color-blue-900);
  cursor: pointer;

  &:hover {
    background-color: var(--color-blue-600);
  }
`

//-----------------------------------------------------------------------------
//------ ArchiveView – main functional component  
//-----------------------------------------------------------------------------

const ArchiveView = () => {
  const { state, dispatch } = useContext(AppContext)
  const [modalBook, setModalBook] = useState(null)

  const handleRestore = async (id) => {
    await restoreBook(id)
    const books = await getBooks()
    dispatch({ type: 'SET_LIBRARY', payload: books })
  }

  const handleDeleteForever = async () => {
    if (!modalBook) return
    await deleteBookForever(modalBook._id)
    const books = await getBooks()
    dispatch({ type: 'SET_LIBRARY', payload: books })
    setModalBook(null)
  }

  const deletedBooks = state.library?.filter((book) => book.isDeleted)

  return (
    <BookGridContainer>
      <Title>Archive</Title>

      <BooksGrid>
        {deletedBooks?.map((book) => (
          <BookCard key={book._id}>
            <div>
              <h4>{book.title}</h4>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <BtnPlaceholder onClick={() => handleRestore(book._id)}>
                Restore
              </BtnPlaceholder>
              <BtnPlaceholder onClick={() => setModalBook(book)}>
                Delete
              </BtnPlaceholder>
            </div>
          </BookCard>
        ))}
      </BooksGrid>

      {modalBook && (
        <ConfirmModal
          variant="permanent-delete"
          bookTitle={modalBook.title}
          onConfirm={handleDeleteForever}
          onCancel={() => setModalBook(null)}
        />
      )}
    </BookGridContainer>
  )
}

export default ArchiveView
