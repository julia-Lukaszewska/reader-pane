import React from 'react'
import styled from 'styled-components'
import { BookCard } from '@/modules/book'
import { AddBookTile } from '@/modules/uploadPDF'

// Styled components specific to table view
const AddRow = styled.tr`
  td {
    padding:  0;
  }
`

const Td = styled.td`
  padding: var(--padding-04);
  font-size: var(--text-01);
  border-bottom: var(--border-03);
  color: var(--text-01);
`

const EmptyRow = styled.tr`
  td {
    padding: 2rem;
    color: var(--text-02);
    font-style: italic;
    text-align: center;
  }
`

/**
 * Helper component that renders AddBookTile and list of BookCard components.
 * The markup differs slightly depending on the viewType prop.
 */
const BookTiles = ({
  books = [],
  hideAddTile = false,
  viewType = 'grid',
  onRestore,
  onDelete,
}) => {
  // --- Render functions for different layouts
  if (viewType === 'table') {
    return (
      <>
        <AddRow>
          <Td />
          <Td colSpan={4}>{!hideAddTile && <AddBookTile />}</Td>
          <Td />
        </AddRow>
        {books.length === 0 ? (
          <EmptyRow>
            <Td colSpan={6}>No books — add first!</Td>
          </EmptyRow>
        ) : (
          books.map(book => (
            <BookCard key={book._id} book={book} viewType='table' />
          ))
        )}
      </>
    )
  }

  if (viewType === 'list') {
    return (
      <>
        {!hideAddTile }
        {books.map(book =>
          book ? (
            <BookCard
              key={book._id}
              book={book}
              viewType='list'
              onOpenPreview={() => onRestore && onRestore(book._id)}
              onRemoveClick={() => onDelete && onDelete(book)}
            />
          ) : null
        )}
      </>
    )
  }

  // Default grid layout
  return (
    <>
      {!hideAddTile && <AddBookTile />}
      {books.map(book => (
        <BookCard key={book._id} book={book} viewType='grid' />
      ))}
    </>
  )
}

export default BookTiles