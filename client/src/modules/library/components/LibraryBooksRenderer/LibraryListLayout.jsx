/**
 * @file LibraryListLayout.jsx
 * @description List layout for displaying books in a tabular row format with optional actions.
 */

import React from 'react'
import styled from 'styled-components'
import { BookCard } from '@/modules/book'
import { AddBookTile } from '@/modules/uploadPDF'  

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

//--- Main wrapper for the list layout
const ListWrapper = styled.div`
  width: 100%;
  height: 99%;
  padding: 2%; 
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  border-radius: var(--border-radius);
  overflow-y: auto;                        
  display: flex;
  flex-direction: column;
`

//-----------------------------------------------------------------------------
// Component: LibraryListLayout
//-----------------------------------------------------------------------------

/**
 * Renders books in a table-style list layout with optional restore/delete actions.
 *
 * @component
 * @param {Object} props
 * @param {Array} props.books - Array of book objects
 * @param {boolean} [props.hideAddTile=false] - Whether to hide the "Add Book" tile
 * @param {Function} [props.onRestore] - Callback when restoring a book (optional)
 * @param {Function} [props.onDelete] - Callback when deleting a book (optional)
 * @returns {JSX.Element}
 */
const LibraryListLayout = ({ books,  onRestore, onDelete }) => {
  return (
    <>
      <ListWrapper>
        {books.map((book) =>
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
    </ListWrapper>
    </>
  )
}

export default LibraryListLayout
