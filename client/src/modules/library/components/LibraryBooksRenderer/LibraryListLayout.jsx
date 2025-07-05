/**
 * @file LibraryListLayout.jsx
 * @description List layout for displaying books in a tabular row format with optional actions.
 */

import React from 'react'
import styled from 'styled-components'
import BookTiles from './BookTiles' 

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

//--- Main wrapper for the list layout
const ListWrapper = styled.div`
  width: 100%;
  height: 99%;
  padding: 2%; 
  

  overflow-y: scroll;                        
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
const LibraryListLayout = ({ books = [], hideAddTile, onRestore, onDelete }) => {
  return (
    
 <ListWrapper>
      <BookTiles
        books={books}
        hideAddTile={hideAddTile}
        viewType='list'
        onRestore={onRestore}
        onDelete={onDelete}
      />
    </ListWrapper>
    
  )
}

export default LibraryListLayout
