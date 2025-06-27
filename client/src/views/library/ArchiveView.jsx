/**
 * @file ArchiveView.jsx
 * @description
 * Renders archived books with support for restoring and permanent deletion.
 * Uses selector-based filtering and sets the correct library filter on mount.
 */

import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectBooksResult,
  selectVisibleBooks,
  selectIsPreviewOpen,
} from '@/store/selectors'
import { setConfirmDelete } from '@/store/slices/bookSlice'
import { useLibraryFilter } from '@library/hooks'

import { useUpdateBookMutation } from '@/store/api/booksPrivateApi'
import LibraryBooksRenderer from '@/modules/library/components/LibraryBooksRenderer/BooksRenderer'
import ConfirmModal from '@/components/ConfirmModal'
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
// Component: ArchiveView
//-----------------------------------------------------------------------------

/**
 * Displays all books with the "isArchived" flag.
 * Allows restoring a book or deleting it permanently.
 *
 * @component
 * @returns {JSX.Element}
 */
const ArchiveView = () => {
  const dispatch = useDispatch()

  useLibraryFilter('archived')

  const { status } = useSelector(selectBooksResult)
  const books = useSelector(selectVisibleBooks)

  const isOpen = useSelector(selectIsPreviewOpen)

  const [updateBook] = useUpdateBookMutation()

  if (status === 'pending' || status === 'uninitialized') {
    return <LoadingSpinner />
  }

  if (!books.length) {
    return (
      <Container>
        <p style={{ padding: '2rem', opacity: 0.6 }}>No books in archive.</p>
      </Container>
    )
  }

  /**
   * Restore a book by unarchiving it.
   *
   * @param {string} id
   */
  const handleRestore = id => {
    updateBook({ id, changes: { flags: { isArchived: false } } })
  }

  /**
   * Permanently delete a book after confirmation.
   */

  return (
    <Container>
      <LibraryBooksRenderer
        books={books}
        onRestore={handleRestore}
        onDelete={book => dispatch(setConfirmDelete({ id: book._id, variant: 'permanent-delete' }))}
        hideAddTile
      />

      <ConfirmModal />

      {isOpen && <BookCardPreviewModal />}
    </Container>
  )
}

export default ArchiveView