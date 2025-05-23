/**
 * @file LibraryBooksRenderer.jsx
 * @description Renders the sorted list of books in the chosen view mode (grid, list, table).
 */

import { useMemo } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { selectLibraryViewMode, selectSortMode } from '@/store/selectors'

import sortBooks from '@book/utils/sortBooks'
import AddBookTile from '@/modules/uploadPDF/AddBookTile'

import {
  LibraryGridLayout,
  LibraryListLayout,   
  LibraryTableLayout,
} from '@library/components'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

//--- Message shown when library is empty
const EmptyMessage = styled.p`
  padding: 2rem;
  text-align: center;
`

//-----------------------------------------------------------------------------
// Component: LibraryBooksRenderer
//-----------------------------------------------------------------------------

/**
 * Displays the list of books in the current library view mode (grid, list, table).
 *
 * @component
 * @param {Object} props
 * @param {Array} props.books - Array of book objects to render
 * @param {boolean} [props.hideAddTile=false] - Whether to hide the "Add Book" tile
 * @returns {JSX.Element}
 */
const LibraryBooksRenderer = ({ books, hideAddTile = false }) => {
  const viewMode = useSelector(selectLibraryViewMode)
  const sortMode = useSelector(selectSortMode)

  //--- Return memoized sorted books
  const sortedBooks = useMemo(() => {
    return sortBooks(books, sortMode)
  }, [books, sortMode])

  //--- Render empty state
  if (!books?.length) {
    console.log('Renderer received books:', books)
    return <EmptyMessage>No books — add your first one!</EmptyMessage>
  }

  //--- Render according to selected view mode
  switch (viewMode) {
    case 'grid':
      return <LibraryGridLayout books={sortedBooks} hideAddTile={hideAddTile} />
    case 'list':
      return <LibraryListLayout books={sortedBooks} hideAddTile={hideAddTile} />
    case 'table':
      return <LibraryTableLayout books={sortedBooks} hideAddTile={hideAddTile} />
    default:
      return <AddBookTile hideAddTile={hideAddTile} />
  }
}

export default LibraryBooksRenderer
