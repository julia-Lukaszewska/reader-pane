/**
 * @file FavoritesView.jsx
 * @description
 * Renders favorited, non-archived books in the selected view mode (grid, list, table).
 * Uses selector-based filtering and sets the correct library filter on mount.
 */

import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import {
  selectBooksResult,
  selectIsPreviewOpen,
  selectVisibleBooks,
} from '@/store/selectors'

import { useLibraryFilter } from '@library/hooks'
import LibraryBooksRenderer from '@/modules/library/components/LibraryBooksRenderer/BooksRenderer'
import { BookCardPreviewModal } from '@book/BookCardPreviewModal'
import { LoadingSpinner, ConfirmModal } from '@/components'

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
useLibraryFilter('favorites')

  const { status } = useSelector(selectBooksResult)
  const books = useSelector(selectVisibleBooks)

  const isOpen = useSelector(selectIsPreviewOpen)

  if (status === 'pending' || status === 'uninitialized') {
    return <LoadingSpinner />
  }

  return (
    <Container>
      <LibraryBooksRenderer books={books} hideAddTile />

      {isOpen && <BookCardPreviewModal />}

      <ConfirmModal />
    </Container>
  )
}

export default FavoritesView