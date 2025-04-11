import { useContext, useRef } from 'react'
import styled from 'styled-components'
import BookTile from '../components/BookTile'
import AddBookTile from '../components/AddBookTile'
import UploadBtn from '../components/UploadBtn'
import { AppContext } from '../context/AppContext'

// -----------------------------------------------------------------------------
//------ BookGridContainer   
// -----------------------------------------------------------------------------

const BookGridContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3rem;
  height: 100%;
  width: 100%;
  background: var(--gradient-blue-clear);
`
//---------------------------------------------------------------------------
//------ BooksGrid   
//---------------------------------------------------------------------------

const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  padding: 2rem;
  width: 100%;
  height: 100%;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  border-radius: var(--border-radius);
`
//---------------------------------------------------------------------------
//------ MyLibraryView   
//---------------------------------------------------------------------------

const MyLibraryView = () => {
  const { state, dispatch } = useContext(AppContext)
  const inputRef = useRef(null)

  return (
    <BookGridContainer>
      <BooksGrid>
        {state.library?.map((book) =>
          !book.isDeleted ? (
            <BookTile
              key={book._id}
              book={book}
              onRemove={(id) => dispatch({ type: 'REMOVE_BOOK', payload: id })}
            />
          ) : null
        )}

        <AddBookTile inputRef={inputRef} />
        <UploadBtn ref={inputRef} />
      </BooksGrid>
    </BookGridContainer>
  )
}

export default MyLibraryView
