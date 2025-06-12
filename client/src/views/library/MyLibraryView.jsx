
/**
 * @file MyLibraryView.jsx
 * @description Displays non-archived books in the selected view mode.
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

  // 1) Read status and data from cache
  const { status } = useSelector(selectBooksResult)
  const allBooks = useSelector(selectAllBooks)

  // 2) Spinner or error
  if (status === 'pending' || status === 'uninitialized') {
    return <LoadingSpinner />
  }
  if (status === 'rejected') {
    return <div>Error loading books.</div>
  }

  // 3) status === 'fulfilled', so filter non-archived valid books
  const nonArchived = allBooks.filter(
    b => !b.flags?.isArchived && b.meta?.title 
  )

  const previewBook = nonArchived.find(b => b._id === previewId)

  return (
    <Container>
      <LibraryBooksRenderer books={nonArchived}  />

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
