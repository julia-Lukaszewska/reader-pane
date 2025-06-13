/**
 * @file LibraryBooksRenderer.jsx
 * @description
 * Renders the sorted list of visible books in the selected view mode (grid, list, table).
 */

import { useMemo } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import {
  selectLibraryViewMode,
  selectSortMode,
  selectVisibleBooks,
} from '@/store/selectors'

import sortBooks from '@book/utils/sortBooks'

import {
  LibraryGridLayout,
  LibraryListLayout,
  LibraryTableLayout,
} from '@library/components'

/* --------------------------------------------------------------------------- */
/*  STYLED COMPONENTS                                                          */
/* --------------------------------------------------------------------------- */

const EmptyMessage = styled.p`
  padding: 2rem;
  text-align: center;
`

/* --------------------------------------------------------------------------- */
/*  COMPONENT: LIBRARY BOOKS RENDERER                                          */
/* --------------------------------------------------------------------------- */

/**
 * Displays the list of books in the current library view mode (grid, list, table).
 *
 * @component
 * @param {Object} props
 * @param {boolean} [props.hideAddTile=false] - Whether to hide the "Add Book" tile
 * @param {Function} [props.onRestore] - Callback for restoring a book
 * @param {Function} [props.onDelete] - Callback for deleting a book
 * @param {string} [props.viewMode] - Optional override for view mode
 * @returns {JSX.Element}
 */
const LibraryBooksRenderer = ({
  hideAddTile = false,
  onRestore,
  onDelete,
  viewMode: viewModeProp,
}) => {
  const books       = useSelector(selectVisibleBooks)
  const sortMode    = useSelector(selectSortMode)
  const stateViewMode = useSelector(selectLibraryViewMode)
  const viewMode    = viewModeProp ?? stateViewMode

  const sortedBooks = useMemo(() => sortBooks(books, sortMode), [books, sortMode])

  if (!sortedBooks?.length && hideAddTile) {
    return <EmptyMessage>No books found.</EmptyMessage>
  }

  switch (viewMode) {
    case 'grid':
      return (
        <LibraryGridLayout
          books={sortedBooks}
          hideAddTile={hideAddTile}
          onRestore={onRestore}
          onDelete={onDelete}
          viewMode={viewMode}
        />
      )
    case 'list':
      return (
        <LibraryListLayout
          books={sortedBooks}
          hideAddTile={hideAddTile}
          onRestore={onRestore}
          onDelete={onDelete}
          viewMode={viewMode}
        />
      )
    case 'table':
      return (
        <LibraryTableLayout
          books={sortedBooks}
          hideAddTile={hideAddTile}
          onRestore={onRestore}
          onDelete={onDelete}
          viewMode={viewMode}
        />
      )
    default:
      return <EmptyMessage>Invalid view mode: {viewMode}</EmptyMessage>
  }
}

export default LibraryBooksRenderer
