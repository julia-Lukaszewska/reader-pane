/**
 * @file MyLibraryView.jsx
 * @description Displays non-archived books in the selected view mode.
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

const MyLibraryView = () => {
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

  // 2) Spinner or error
  if (isLoading) {
    return <LoadingSpinner />
  }
  if (isError) {
    return <div>Error loading books.</div>
  }

  // 3) status === 'fulfilled', so filter non-archived valid books
  const nonArchived = allBooks.filter(
    (b) => !b.flags?.isArchived && b.meta?.title && b.meta?.fileUrl
  )

  const previewBook = nonArchived.find((b) => b._id === previewId)

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
