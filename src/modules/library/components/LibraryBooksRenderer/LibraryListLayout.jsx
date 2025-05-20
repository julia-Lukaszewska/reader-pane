import React from 'react'
import styled from 'styled-components'
import { BookCard } from '@/modules/book'
import { AddBookTile } from '@/modules/uploadPDF'

const ListWrapper = styled.div`
  width: 100%;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  border-radius: var(--border-radius);
  overflow: hidden;
`

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 5% 45% 30% 15% 5%;
  padding: 1rem 2rem;
  font-weight: bold;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-color);
`

const LibraryListLayout = ({ books, hideAddTile, onRestore, onDelete }) => {
  return (
    <ListWrapper>
      <HeaderRow>
        <span></span>
        <span>Title</span>
        <span>Author</span>
        <span>Date added</span>
        <span>Actions</span>
      </HeaderRow>

      {!hideAddTile && <AddBookTile viewMode="list" />}

      {books.map((book) =>
        book ? (
          <BookCard
            key={book._id}
            book={book}
            viewType="list"
            onOpenPreview={() => onRestore && onRestore(book._id)}
            onRemoveClick={() => onDelete && onDelete(book)}
          />
        ) : null
      )}
    </ListWrapper>
  )
}

export default LibraryListLayout
