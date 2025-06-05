/**
 * @file FavoritesView.jsx
 * @description Renders favorited, non-archived books in the selected view mode (grid, list, table).
 */

import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectLibraryViewMode,
  selectIsPreviewOpen,
  selectPreviewBookId,
} from '@/store/selectors/selectors'
import { useGetBooksQuery } from '@/store/api/booksApi'
import LibraryBooksRenderer from '@/modules/library/components/LibraryBooksRenderer/BooksRenderer'
import { BookCardPreviewModal } from '@book/BookCardPreviewModal'
import { LoadingSpinner } from '@/components'
import { clearPreviewBook } from '@/store/slices/bookSlice'

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

  // 1) Fetch all books via RTK Query
  const {
    data: allBooks = [],
    isLoading,
    isError,
  } = useGetBooksQuery()

  // 2) Spinner or empty while loading
  if (isLoading) {
    return <LoadingSpinner />
  }
  // (No explicit error UI for favorites; empty state will show no cards)

  // 3) status === 'fulfilled', so filter favorited, non-archived books
  const favoriteBooks = allBooks.filter(
    (book) =>
      book.flags?.isFavorited &&
      !book.flags?.isArchived &&
      book.meta?.title &&
      book.meta?.fileUrl
  )

  const previewBook = favoriteBooks.find((b) => b._id === previewId)

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
