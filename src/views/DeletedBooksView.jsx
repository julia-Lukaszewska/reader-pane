import styled from 'styled-components'

// -----------------------------------------------------------------------------
//------ Styled Components   
// -----------------------------------------------------------------------------

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

const BookCard = styled.div`
  position: relative;
  aspect-ratio: 2 / 3;
  width: var(--book-size, 150px);
  background-color: var(--color-white);
  border-radius: var(--border-radius-sm);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 1rem;
  text-align: center;
  color: var(--color-dark-900);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    background-color: rgba(58, 138, 195, 0.86);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    transform: translateY(-4px);
  }
`

const Title = styled.h2`
  color: var(--color-light-900);
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 2rem;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
`

const BtnPlaceholder = styled.button`
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 4px;
  background-color: var(--color-blue-500);
  color: var(--color-blue-900);
  cursor: pointer;
`

// -----------------------------------------------------------------------------
//------ DeletedBooksView Component   
// -----------------------------------------------------------------------------

const DeletedBooksView = () => {
  return (
    <BookGridContainer>
      <Title>Archive</Title>

      <BooksGrid>
        <BookCard>
          <div>
            <h4>Tytuł książki</h4>
            <small>60% przeczytane</small>
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <BtnPlaceholder>Przywróć</BtnPlaceholder>
            <BtnPlaceholder>Usuń na zawsze</BtnPlaceholder>
          </div>
        </BookCard>
      </BooksGrid>
    </BookGridContainer>
  )
}

export default DeletedBooksView
