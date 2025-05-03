//-----------------------------------------------------------------------------
//------ MyLibraryGridView – Grid view of books with sorting 
//-----------------------------------------------------------------------------

import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Tile, AddBookTile } from '@/components' 
import { selectFilteredBooks } from '@/store'

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

const MyLibraryGridView = () => {
  const books = useSelector(selectFilteredBooks)

  return (
    <BooksGrid>
      <AddBookTile />
      {books.map((book) => (
        <Tile key={book._id} bookId={book._id} />
      ))}
    </BooksGrid>
  )
}

export default MyLibraryGridView
