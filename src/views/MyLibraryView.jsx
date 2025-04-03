import styled from 'styled-components'

// -----------------------------------------------------------------------------
//------ Styled Components   
// -----------------------------------------------------------------------------

const BookGridContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 3rem;
  width: 100%;
`
//' -----------------------------------------------------------------------------
// BooksGrid styles   
//' -----------------------------------------------------------------------------
const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  padding: 2rem;
  width: 100%;
`
// -----------------------------------------------------------------------------
//------ MyLibraryView Component   
// -----------------------------------------------------------------------------

const MyLibraryView = () => {
  return (
    <BookGridContainer>
      <BooksGrid />
    </BookGridContainer>
  )
}

export default MyLibraryView
