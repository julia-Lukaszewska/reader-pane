/**
 * @file ArchiveView.jsx
 * @description
 * Renders archived books with support for restoring and permanent deletion.
 * Uses selector-based filtering and sets the correct library filter on mount.
 */

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectBooksResult,
  selectVisibleBooks,
  selectIsPreviewOpen,
  selectPreviewBookId,
} from '@/store/selectors'
import { clearPreviewBook, setLibraryFilter } from '@/store/slices/bookSlice'
import { useUpdateBookMutation, useDeleteBookMutation } from '@/store/api/booksPrivateApi'
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
  const [modalBook, setModalBook] = useState(null)

  // Set archive filter on mount
  useEffect(() => {
    dispatch(setLibraryFilter('archived'))
  }, [dispatch])

  const { status } = useSelector(selectBooksResult)
  const books = useSelector(selectVisibleBooks)

  const isOpen = useSelector(selectIsPreviewOpen)
  const previewId = useSelector(selectPreviewBookId)
  const previewBook = books.find(b => b._id === previewId)

  const [updateBook] = useUpdateBookMutation()
  const [deleteBook] = useDeleteBookMutation()

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
  const handleDelete = async () => {
    if (!modalBook) return
    try {
      await deleteBook(modalBook._id).unwrap()
    } catch (err) {
      console.error('Delete error:', err)
    } finally {
      setModalBook(null)
    }
  }

  return (
    <Container>
      <LibraryBooksRenderer
        books={books}
        onRestore={handleRestore}
        onDelete={book => setModalBook(book)}
        hideAddTile
      />

      {modalBook && (
        <ConfirmModal
          variant="permanent-delete"
          bookTitle={modalBook.meta.title}
          onConfirm={handleDelete}
          onCancel={() => setModalBook(null)}
        />
      )}

      {isOpen && previewBook && (
        <BookCardPreviewModal
          book={previewBook}
          onClose={() => dispatch(clearPreviewBook())}
        />
      )}
    </Container>
  )
}

export default ArchiveView
