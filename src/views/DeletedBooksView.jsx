import styled from 'styled-components'

const BookGridContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 3rem;
  width: 100%;
`

const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  padding: 2rem;
  width: 100%;
`

const Title = styled.h2`
  margin: 2rem 0 1rem;
  font-size: 2rem;
`

const DeletedBooksView = () => {
  return (
    <BookGridContainer>
      <Title>Kosz – Usunięte książki</Title>
      <BooksGrid />
    </BookGridContainer>
  )
}

export default DeletedBooksView
