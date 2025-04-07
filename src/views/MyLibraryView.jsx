import styled from 'styled-components'
import BookTile from '../components/BookTile'
import AddBookTile from '../components/AddBookTile'

// -----------------------------------------------------------------------------
//------ Styled Components   
// -----------------------------------------------------------------------------

const BookGridContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3rem;
  height: 95%;
  width: 100%;
  background: var(--gradient-blue-clear);
  box-sizing: border-box;
  transition: background 0.3s ease;
`

const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  padding: 2rem;
  width: 100%;
  height: 100%;
  background: var(--glass-bg); //
  backdrop-filter: var(--glass-blur);
  border-radius: var(--border-radius);
  box-shadow: var(--glass-shadow);
  transition: background 0.3s ease;
`

// -----------------------------------------------------------------------------
//------ MyLibraryView Component   
// -----------------------------------------------------------------------------

const MyLibraryView = () => {
  return (
    <BookGridContainer>
      <BooksGrid>
        <BookTile />
        <AddBookTile />
      </BooksGrid>
    </BookGridContainer>
  )
}

export default MyLibraryView
