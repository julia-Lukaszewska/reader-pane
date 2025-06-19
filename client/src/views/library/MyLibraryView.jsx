/**
 * @file MyLibraryView.jsx
 * @description Displays non-archived books in the selected view mode.
 */

import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useLibraryFilter } from '@library/hooks'
import {
  selectVisibleBooks,
  selectBooksResult,
  selectIsPreviewOpen,
  selectPreviewBookId,
} from '@/store/selectors'

import LibraryBooksRenderer from '@/modules/library/components/LibraryBooksRenderer/BooksRenderer'
import { LoadingSpinner } from '@/components'
import { BookCardPreviewModal } from '@book/BookCardPreviewModal'
import { clearPreviewBook } from '@/store/slices/bookSlice'

/* --------------------------------------------------------------------------- */
/*  STYLED COMPONENTS                                                          */
/* --------------------------------------------------------------------------- */

const Container = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
`

/* --------------------------------------------------------------------------- */
/*  COMPONENT: MY LIBRARY VIEW                                                 */
/* --------------------------------------------------------------------------- */

const MyLibraryView = () => {
  
  const dispatch = useDispatch()

  const status = useSelector(selectBooksResult).status
       useLibraryFilter('all')
 const allBooks = useSelector(selectVisibleBooks)
const books = allBooks.filter(book => !book.flags?.isArchived)

  const isOpen = useSelector(selectIsPreviewOpen)
  const previewId = useSelector(selectPreviewBookId)
  const previewBook = books.find(b => b._id === previewId)

  if (status === 'pending' || status === 'uninitialized') {
    return <LoadingSpinner />
  }
  if (status === 'rejected') {
    return <div>Error loading books.</div>
  }

  return (
    <Container>
      <LibraryBooksRenderer hideAddTile={false} />

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
