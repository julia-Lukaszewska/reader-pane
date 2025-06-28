/**
 * @file LibraryTableLayout.jsx
 * @description Table layout for rendering books with sortable headers and action columns.
 */

import React from 'react'  
import styled from 'styled-components'
import BookTiles from './BookTiles'
import { AddBookTile } from '@/modules/uploadPDF'

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
  overflow-y: scroll;
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
const LibraryTableLayout = ({ books = [], hideAddTile }) => (
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
                <BookTiles books={books} hideAddTile={hideAddTile} viewType='table' />
      </tbody>
    </Table>
  </TableWrapper>
)

export default LibraryTableLayout
