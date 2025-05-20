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

const EmptyMessage = styled.p`
  padding: 2rem;
  text-align: center;
`

const LibraryBooksRenderer = ({ books, hideAddTile = false }) => {
  const viewMode = useSelector(selectLibraryViewMode)
  const sortMode = useSelector(selectSortMode)

  const sortedBooks = useMemo(() => {
    return sortBooks(books, sortMode)
  }, [books, sortMode])

  if (!books?.length) {
    console.log("Renderer received books:", books)
    return <EmptyMessage>No books — add your first one!</EmptyMessage>
  }

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
