/**
 * @file LibraryGridLayout.jsx
 * @description Grid layout for displaying books in tile format with optional "Add Book" tile.
 */

import React from 'react'
import styled from 'styled-components'
import BookTiles from './BookTiles'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------
   
//--- Grid wrapper for book tiles
const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, var(--tile-size));
  gap: 1.5rem;
  padding: 2rem;
  width: 100%;
  overflow-y: scroll;
  justify-content: start;
  
  backdrop-filter: var(--glass-blur);
  border-radius: var(--border-radius);
`

//-----------------------------------------------------------------------------
// Component: LibraryGridLayout
//-----------------------------------------------------------------------------

/**
 * Renders a responsive grid of book tiles.
 *
 * @component
 * @param {Object} props
 * @param {Array} props.books - Array of book objects to render
 * @param {boolean} [props.hideAddTile=false] - Whether to hide the add-book tile
 * @returns {JSX.Element}
 */
const LibraryGridLayout = ({ books = [], hideAddTile }) => {
  return (
    <BooksGrid>
           <BookTiles books={books} hideAddTile={hideAddTile} viewType='grid' />
    </BooksGrid>
  )
}

export default LibraryGridLayout
