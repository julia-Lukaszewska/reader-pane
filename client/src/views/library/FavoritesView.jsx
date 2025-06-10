/**
 * @file FavoritesView.jsx
 * @description Renders favorited, non-archived books in the selected view mode (grid, list, table).
 */

import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectAllBooks,
  selectBooksResult,
  selectLibraryViewMode,
  selectIsPreviewOpen,
  selectPreviewBookId,
} from '@/store/selectors'
import { clearPreviewBook } from '@/store/slices/bookSlice'
import LibraryBooksRenderer from '@/modules/library/components/LibraryBooksRenderer/BooksRenderer'
import { BookCardPreviewModal } from '@book/BookCardPreviewModal'
import { LoadingSpinner } from '@/components'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

const Container = styled.div`
  width: 100%;
  flex: 1;
`

//-----------------------------------------------------------------------------
// Component: FavoritesView
//-----------------------------------------------------------------------------

const FavoritesView = () => {
  const dispatch = useDispatch()
  const viewMode = useSelector(selectLibraryViewMode)
  const isOpen = useSelector(selectIsPreviewOpen)
  const previewId = useSelector(selectPreviewBookId)

  // 1) Read status and data from cache
  const { status } = useSelector(selectBooksResult)
  const allBooks = useSelector(selectAllBooks)

  // 2) Spinner or empty while loading
  if (status === 'pending' || status === 'uninitialized') {
    return <LoadingSpinner />
  }

  // 3) status === 'fulfilled', so filter favorited, non-archived books
  const favoriteBooks = allBooks.filter(
    book => book.flags?.isFavorited && !book.flags?.isArchived && book.meta?.title 
  )

  const previewBook = favoriteBooks.find(b => b._id === previewId)

  return (
    <Container>
      <LibraryBooksRenderer
        books={favoriteBooks}
        viewMode={viewMode}
        hideAddTile
      />

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
