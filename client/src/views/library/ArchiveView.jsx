/**
 * @file ArchiveView.jsx
 * @description Renders archived books with support for restoring and permanent deletion.
 * Shows a guest message if user is not logged in.
 */

import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import {
  useGetBooksQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
} from '@/store/api/booksApi'
import { selectLibraryViewMode } from '@/store/selectors/selectors'
import { useAuth } from '@/modules/user/hooks'
import EmptyLibraryGuestMessage from './EmptyLibraryGuestMessage'
import LibraryBooksRenderer from '@/modules/library/components/LibraryBooksRenderer/BooksRenderer'
import ConfirmModal from '@/components/ConfirmModal'

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
 * Displays archived books in the selected view mode.
 * Allows users to restore or permanently delete each book.
 * If not logged in, shows a guest message.
 *
 * @component
 * @returns {JSX.Element|null}
 */
const ArchiveView = () => {
  const { isLoggedIn } = useAuth()
  const [modalBook, setModalBook] = useState(null)
  const viewMode = useSelector(selectLibraryViewMode)

  //--- First check login status
  if (!isLoggedIn) return <EmptyLibraryGuestMessage />

  //--- Only fetch data if logged in
  const { data: books = [], isLoading } = useGetBooksQuery(undefined, {
    skip: !isLoggedIn,
  })

  const [updateBook] = useUpdateBookMutation()
  const [deleteBook] = useDeleteBookMutation()

  if (isLoading) return null

  const archivedBooks = books.filter(book => book.flags?.isArchived)

  const handleRestore = id =>
    updateBook({ id, changes: { flags: { isArchived: false } } })

  const handleDelete = async () => {
    if (!modalBook) return
    try {
      await deleteBook(modalBook._id)
    } catch (err) {
      console.error('Delete error:', err)
    } finally {
      setModalBook(null)
    }
  }

  if (!archivedBooks.length) {
    return (
      <Container>
        <p style={{ padding: '2rem', opacity: 0.6 }}>No books in archive.</p>
      </Container>
    )
  }

  return (
    <Container>
      <LibraryBooksRenderer
        books={archivedBooks}
        viewMode={viewMode}
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
    </Container>
  )
}

export default ArchiveView
