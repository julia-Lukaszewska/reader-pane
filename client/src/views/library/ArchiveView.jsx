/**
 * @file ArchiveView.jsx
 * @description
 * Renders archived books with support for restoring and permanent deletion.
 */

import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectLibraryViewMode,
  selectIsPreviewOpen,
  selectPreviewBookId,
} from '@/store/selectors/selectors'
import { useGetBooksQuery, useUpdateBookMutation, useDeleteBookMutation } from '@/store/api/booksApi'
import { clearPreviewBook } from '@/store/slices/bookSlice'
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

/**
 * ArchiveView component displays a list of archived books,
 * allows restoring them or permanently deleting them, and
 * shows a preview modal when a book is selected.
 */

const ArchiveView = () => {
  const dispatch = useDispatch()
  const [modalBook, setModalBook] = useState(null)

  const viewMode = useSelector(selectLibraryViewMode)
  const isOpen = useSelector(selectIsPreviewOpen)
  const previewId = useSelector(selectPreviewBookId)

  // 1) Fetch all books via RTK Query
  const {
    data: allBooks = [],
    isLoading,
    isError,
  } = useGetBooksQuery()

  const [updateBook] = useUpdateBookMutation()
  const [deleteBook] = useDeleteBookMutation()

  if (isLoading) {
    return <LoadingSpinner />
  }

  const archivedBooks = allBooks.filter(
    (book) => book.flags?.isArchived && book.meta?.title && book.meta?.fileUrl
  )

  if (!archivedBooks.length) {
    return (
      <Container>
        <p style={{ padding: '2rem', opacity: 0.6 }}>No books in archive.</p>
      </Container>
    )
  }

  const previewBook = archivedBooks.find((b) => b._id === previewId)

  /**
   * Restore a book by setting its isArchived flag to false.
   *
   * @param {string} id - The ID of the book to restore.
   */
  const handleRestore = (id) => {
    updateBook({ id, changes: { flags: { isArchived: false } } })
  }

  /**
   * Permanently delete the selected book.
   * Closes the confirm modal after deletion.
   *
   * @async
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
        books={archivedBooks}
        viewMode={viewMode}
        onRestore={handleRestore}
        onDelete={(book) => setModalBook(book)}
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
