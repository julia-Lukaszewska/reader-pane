//-----------------------------------------------------------------------------
//------ MyLibraryListView – List view of books with sorting 
//-----------------------------------------------------------------------------

import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { AddBookTile, BookItem } from '@/components' 
import { selectFilteredBooks } from '@/store'

const ListWrapper = styled.div`
  width: 100%;
  padding: 2rem;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  border-radius: var(--border-radius);
`

const MyLibraryListView = () => {
  const books = useSelector(selectFilteredBooks)

  return (
    <ListWrapper>
      <AddBookTile />
      {books.map((book) => (
        <BookItem key={book._id} bookId={book._id} />
      ))}
    </ListWrapper>
  )
}

export default MyLibraryListView