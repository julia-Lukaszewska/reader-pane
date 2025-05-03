//-----------------------------------------------------------------------------
// LibraryBooksRenderer – chooses view and pulls filtered books from Redux 
//-----------------------------------------------------------------------------
import React from 'react' 
import styled from 'styled-components' 
import { useSelector } from 'react-redux' 

import {
  MyLibraryGridView,
  MyLibraryListView,
  MyLibraryTableView,
} from '@/views' 
import { selectFilteredBooks } from '@/store'

// Styled message when book list is empty 
const EmptyMessage = styled.p`
  padding: 2rem;
  text-align: center;
`

const LibraryBooksRenderer = () => {
  const viewMode = useSelector((state) => state.library.libraryViewMode)
  const books = useSelector(selectFilteredBooks)


  if (!books?.length) {
    return <EmptyMessage>Brak książek — dodaj pierwszą!</EmptyMessage>
  }

  // Conditional rendering based on selected view mode 
  return (
    <>
      {viewMode === 'grid' && <MyLibraryGridView books={books} />}
      {viewMode === 'list' && <MyLibraryListView books={books} />}
      {viewMode === 'table' && <MyLibraryTableView books={books} />}
    </>
  )
}

export default LibraryBooksRenderer 
