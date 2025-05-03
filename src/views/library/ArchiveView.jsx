//-----------------------------------------------------------------------------
// ArchiveView – renders archived books under LibraryLayout with modal actions in all views 
//-----------------------------------------------------------------------------
import React, { useState } from 'react' 
import styled from 'styled-components' 
import { useDispatch, useSelector } from 'react-redux' 

import { restoreBookThunk, deleteBookForeverThunk } from '@/store' 
import { ConfirmModal } from '@/components' 
import { selectArchivedBooks } from '@/store'

// Styled components 
const Container = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
` 

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  padding: 2rem;
` 

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
` 

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
` 

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
` 

const Th = styled.th`
  text-align: left;
  padding: 0.75rem;
  border-bottom: 2px solid var(--border-color);
` 

const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid var(--border-color);
` 

const ActionButton = styled.button`
  margin-left: 0.5rem;
  padding: 0.4rem 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  background: ${({ $variant }) =>
    $variant === 'restore' ? 'var(--color-accent)' : 'var(--color-danger)'};
  &:hover {
    opacity: 0.9;
  }
` 

const ArchiveView = () => {
  const dispatch = useDispatch() 
  const archived = useSelector(selectArchivedBooks) 
  const viewMode = useSelector((state) => state.library.libraryViewMode) 
  const [modalBook, setModalBook] = useState(null) // Book selected for modal 

  const handleRestore = (id) => dispatch(restoreBookThunk(id)) 

  const handleDelete = () => {
    if (!modalBook) return
    dispatch(deleteBookForeverThunk(modalBook._id)) 
    setModalBook(null)
  }

  // Render message when archive is empty 
  if (archived.length === 0) {
    return (
      <Container>
        <p style={{ padding: '2rem', opacity: 0.6 }}>Brak książek w archiwum</p>
      </Container>
    )
  }

  return (
    <Container>
  
      {viewMode === 'grid' && (
        <Grid>
          {archived.map((book) => (
            <div key={book._id}>
              <h4>{book.title}</h4>
              <div>
                <ActionButton
                  $variant="restore"
                  onClick={() => handleRestore(book._id)}
                >
                 dispatch
                </ActionButton>
                <ActionButton
                  $variant="delete"
                  onClick={() => setModalBook(book)}
                >
                  delete
                </ActionButton>
              </div>
            </div>
          ))}
        </Grid>
      )}

    
      {viewMode === 'list' && (
        <List>
          {archived.map((book) => (
            <ListItem key={book._id}>
              <span>{book.title}</span>
              <div>
                <ActionButton
                  $variant="restore"
                  onClick={() => handleRestore(book._id)}
                >
                  dispatch
                </ActionButton>
                <ActionButton
                  $variant="delete"
                  onClick={() => setModalBook(book)}
                >
                  delete
                </ActionButton>
              </div>
            </ListItem>
          ))}
        </List>
      )}
   
      {viewMode === 'table' && (
        <Table>
          <thead>
            <tr>
              <Th>Title</Th>
              <Th>Akction</Th>
            </tr>
          </thead>
          <tbody>
            {archived.map((book) => (
              <tr key={book._id}>
                <Td>{book.title}</Td>
                <Td>
                  <ActionButton
                    $variant="restore"
                    onClick={() => handleRestore(book._id)}
                  >
                    dispatch
                  </ActionButton>
                  <ActionButton
                    $variant="delete"
                    onClick={() => setModalBook(book)}
                  >
                    delete
                  </ActionButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

    
      {modalBook && (
        <ConfirmModal
          $variant="permanent-delete"
          bookTitle={modalBook.title}
          onConfirm={handleDelete}
          onCancel={() => setModalBook(null)}
        />
      )}
    </Container>
  )
}

export default ArchiveView 
