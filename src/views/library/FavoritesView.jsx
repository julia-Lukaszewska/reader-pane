
//-----------------------------------------------------------------------------
//------ FavoritesView – renders favorite books under LibraryLayout using LibraryBooksRenderer 
//-----------------------------------------------------------------------------

import styled from 'styled-components' 
import LibraryBooksRenderer from './LibraryBooksRenderer' 


const Container = styled.div`
  width: 100%;
  flex: 1;
`

const FavoritesView = () => {
  return (
    <Container>
      <LibraryBooksRenderer />
    </Container>
  )
}

export default FavoritesView 
