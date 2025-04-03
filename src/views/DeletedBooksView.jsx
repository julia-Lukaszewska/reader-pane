import styled from 'styled-components'

// -----------------------------------------------------------------------------
//------ Styled Components   
// -----------------------------------------------------------------------------
const BookGridContainer = styled.div`
  display: flex;  
  flex-direction: column;  
  align-items: center;  
  padding: 0 3rem;  
  width: 100%;  
`

//' -----------------------------------------------------------------------------
// BooksGrid styles   
//' -----------------------------------------------------------------------------

const BooksGrid = styled.div`
  display: grid;  
  grid-template-columns: repeat(
    auto-fill,
    minmax(150px, 1fr)
  );  
  gap: 1rem;  
  padding: 2rem;  
  width: 100%;  
`
//' -----------------------------------------------------------------------------
//  Title styles   
//' -----------------------------------------------------------------------------

const Title = styled.h2`
  margin: 2rem 0 1rem;  
  font-size: 2rem;  
`

// -----------------------------------------------------------------------------
//------ DeletedBooksView Component   
// -----------------------------------------------------------------------------
const DeletedBooksView = () => {
  return (
    <BookGridContainer>
      {/* Title component    */}
      <Title>Kosz – Usunięte książki</Title>
      {/* BooksGrid component    */}
      <BooksGrid />
    </BookGridContainer>
  )
}

 
export default DeletedBooksView
