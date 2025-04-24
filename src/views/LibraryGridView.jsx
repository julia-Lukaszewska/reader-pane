import React, { useRef } from 'react'
import styled from 'styled-components'
import BookTile from '../components/BookTile'
import AddBookTile from '../components/AddBookTile'

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

const MyLibraryGridView = ({
  books,
  isManaging,
  selectedBooks,
  setSelectedBooks,
}) => {
  const inputRef = useRef(null)

  return (
    <BooksGrid>
      {books.map((book) => (
        <BookTile
          key={book._id}
          book={book}
          isManaging={isManaging}
          selectedBooks={selectedBooks}
          setSelectedBooks={setSelectedBooks}
        />
      ))}
      <AddBookTile inputRef={inputRef} />
    </BooksGrid>
  )
}

export default MyLibraryGridView
