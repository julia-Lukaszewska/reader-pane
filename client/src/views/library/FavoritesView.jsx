/**
 * @file FavoritesView.jsx
 * @description
 * Renders favorited, non-archived books in the selected view mode (grid, list, table).
 * Uses selector-based filtering and sets the correct library filter on mount.
 */

import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectBooksResult,
  selectVisibleBooks,
  selectIsPreviewOpen,
  selectPreviewBookId,
} from '@/store/selectors'
import { clearPreviewBook, setLibraryFilter } from '@/store/slices/bookSlice'
import LibraryBooksRenderer from '@/modules/library/components/LibraryBooksRenderer/BooksRenderer'
import { BookCardPreviewModal } from '@book/BookCardPreviewModal'
import { LoadingSpinner } from '@/components'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

const Container = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`

//-----------------------------------------------------------------------------
// Component: FavoritesView
//-----------------------------------------------------------------------------

/**
 * Displays all books with the "isFavorited" flag (excluding archived ones).
 * Books are selected using selector and global filter state.
 *
 * @component
 * @returns {JSX.Element}
 */
const FavoritesView = () => {
  const dispatch = useDispatch()

  // Set the global filter to "favorites" on component mount
  useEffect(() => {
    dispatch(setLibraryFilter('favorites'))
  }, [dispatch])

  const { status } = useSelector(selectBooksResult)
  const books = useSelector(selectVisibleBooks)

  const isOpen = useSelector(selectIsPreviewOpen)
  const previewId = useSelector(selectPreviewBookId)
  const previewBook = books.find(b => b._id === previewId)

  if (status === 'pending' || status === 'uninitialized') {
    return <LoadingSpinner />
  }

  return (
    <Container>
      <LibraryBooksRenderer books={books} hideAddTile />

      {isOpen && previewBook && (
        <BookCardPreviewModal
          book={previewBook}
          onClose={() => dispatch(clearPreviewBook())}
        />
      )}
    </Container>
  )
}

export default FavoritesView
