/**
 * @file FavoritesView.jsx
 * @description Renders favorited, non-archived books in the selected view mode (grid, list, table).
 */

import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { useGetBooksQuery } from '@/store/api/booksApi'
import { selectLibraryViewMode, selectIsPreviewOpen, selectPreviewBookId } from '@/store/selectors/selectors'
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

/**
 * FavoritesView component fetches all books via RTK Query,
 * filters favorited, non-archived ones, and renders them in the chosen view mode.
 * Shows a loading spinner while fetching.
 *
 * @component
 * @returns {JSX.Element}
 */
const FavoritesView = () => {
  const dispatch = useDispatch()
  const viewMode = useSelector(selectLibraryViewMode)
  const isOpen = useSelector(selectIsPreviewOpen)
  const previewId = useSelector(selectPreviewBookId)

  // 1) Fetch all books with RTK Query
  const {
    data: allBooks = [],
    isLoading: isFetching,
    isError: isFetchError
  } = useGetBooksQuery()

  // 2) Show spinner while loading
  if (isFetching) {
    return <LoadingSpinner />
  }
  // (No explicit error UI for favorites; empty state will show no cards)

  // 3) Filter favorited, non-archived books
  const favoriteBooks = allBooks.filter(
    b =>
      b.flags?.isFavorited &&
      !b.flags?.isArchived &&
      b.meta?.title &&
      b.meta?.fileUrl
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
