import React from 'react'
import styled from 'styled-components'
import BookListItem from '../components/BookListItem'

const ListWrapper = styled.div`
  width: 100%;
  padding: 2rem;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  border-radius: var(--border-radius);
`

const MyLibraryListView = ({ books, onSelect }) => {
  return (
    <ListWrapper>
      {books.map((book) => (
        <BookListItem
          key={book._id}
          book={book}
          onClick={() => onSelect(book)}
        />
      ))}
    </ListWrapper>
  )
}

export default MyLibraryListView
