/**
 * @file MyLibraryView.jsx
 * @description Displays non-archived books in the selected view mode.
 */

import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { useGetBooksQuery } from '@/store/api/booksApi'
import { selectLibraryViewMode, selectIsPreviewOpen, selectPreviewBookId } from '@/store/selectors/selectors'
import LibraryBooksRenderer from '@/modules/library/components/LibraryBooksRenderer/BooksRenderer'
import { LoadingSpinner } from '@/components'
import { BookCardPreviewModal } from '@book/BookCardPreviewModal'
import { clearPreviewBook } from '@/store/slices/bookSlice'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

const Container = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
`

//-----------------------------------------------------------------------------
// Component: MyLibraryView
//-----------------------------------------------------------------------------

/**
 * MyLibraryView component fetches all books via RTK Query,
 * filters out archived ones, and renders them in the chosen view mode.
 * Shows a loading spinner while fetching, and displays an error message if fetch fails.
 *
 * @component
 * @returns {JSX.Element}
 */
const MyLibraryView = () => {
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

  // 2) Handle loading and error states
  if (isFetching) {
    return <LoadingSpinner />
  }
  if (isFetchError) {
    return <div>Error loading books.</div>
  }

  // 3) Filter out archived books and ensure required fields exist
  const nonArchived = allBooks.filter(
    b => !b.flags?.isArchived && b.meta?.title && b.meta?.fileUrl
  )

  const previewBook = nonArchived.find(b => b._id === previewId)

  return (
    <Container>
      <LibraryBooksRenderer books={nonArchived} viewMode={viewMode} />

      {isOpen && previewBook && (
        <BookCardPreviewModal
          book={previewBook}
          onClose={() => dispatch(clearPreviewBook())}
        />
      )}
    </Container>
  )
}

export default MyLibraryView
