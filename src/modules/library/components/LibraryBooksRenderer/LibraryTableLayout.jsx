/**
 * @file LibraryTableLayout.jsx
 * @description Table layout for rendering books with sortable headers and action columns.
 */

import React from 'react'
import styled from 'styled-components'
import { BookCard } from '@book/BookCard'
import { AddBookTile } from '@upload'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

//--- Wrapper for table scroll and spacing
const TableWrapper = styled.div`
  width: 100%;
  padding: 2rem;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  border-radius: var(--border-radius);
  overflow-x: auto;
`

//--- Main table element
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
`

//--- Table header cell
const Th = styled.th`
  text-align: left;
  padding: 0.75rem;
  border-bottom: 2px solid var(--border-color);
  color: var(--text-secondary);
  cursor: ${({ sortable }) => (sortable ? 'pointer' : 'default')};

  &:hover {
    color: ${({ sortable }) =>
      sortable ? 'var(--color-accent)' : 'var(--text-secondary)'};
  }
`

//--- Table data cell
const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-primary);
`

//--- Row for AddBookTile
const AddRow = styled.tr`
  td {
    padding: 1rem 0;
  }
`

//--- Row when there are no books
const EmptyRow = styled.tr`
  td {
    padding: 2rem;
    color: var(--text-secondary);
    font-style: italic;
    text-align: center;
  }
`

//-----------------------------------------------------------------------------
// Component: LibraryTableLayout
//-----------------------------------------------------------------------------

/**
 * Renders a table layout of books with header, add row and content rows.
 *
 * @component
 * @param {Object} props
 * @param {Array} props.books - Array of book objects
 * @param {boolean} [props.hideAddTile] - Whether to hide the "Add Book" tile row
 * @returns {JSX.Element}
 */
const LibraryTableLayout = ({ books, hideAddTile }) => (
  <TableWrapper>
    <Table>
      <thead>
        <tr>
          <Th style={{ width: '40px' }} />
          <Th>Title</Th>
          <Th>Author</Th>
          <Th>Date added</Th>
          <Th style={{ width: '140px' }}>Actions</Th>
          <Th style={{ width: '40px' }} />
        </tr>
      </thead>
      <tbody>
        <AddRow>
          <Td />
          <Td colSpan={4}>
            {!hideAddTile && <AddBookTile />}
          </Td>
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
      </tbody>
    </Table>
  </TableWrapper>
)

export default LibraryTableLayout
