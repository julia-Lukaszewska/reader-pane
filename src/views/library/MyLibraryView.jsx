
import styled from 'styled-components' 
import LibraryBooksRenderer from './LibraryBooksRenderer' 

const Container = styled.div`
  width: 100%;
  flex: 1;
` 

const MyLibraryView = () => {

  return (
    <Container>
      <LibraryBooksRenderer />
    </Container>
  )
}

export default MyLibraryView 
