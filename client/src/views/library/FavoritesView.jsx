/**
 * @file FavoritesView.jsx
 * @description
 * Renders favorited, non-archived books in the selected view mode (grid, list, table).
 * Uses selector-based filtering and sets the correct library filter on mount.
 */
import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectBooksResult,
  selectVisibleBooks,
  selectIsPreviewOpen,
  selectPreviewBookId,
    selectConfirmDeleteId,
  selectConfirmDeleteVariant,
  selectBookById,
} from '@/store/selectors'
import { clearPreviewBook } from '@/store/slices/bookSlice'
import { useLibraryFilter } from '@library/hooks'
import LibraryBooksRenderer from '@/modules/library/components/LibraryBooksRenderer/BooksRenderer'
import { BookCardPreviewModal } from '@book/BookCardPreviewModal'
import { LoadingSpinner, ConfirmModal } from '@/components'
import { useDeleteBookMutation } from '@/store/api/booksPrivateApi'

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
// Component: FavoritesView
//-----------------------------------------------------------------------------

/**
 * Displays all books with the "isFavorited" flag (excluding archived ones).
 * Books are selected using selector and global filter state.
 *
 * @component
 * @returns {JSX.Element}
 */
const FavoritesView = () => {
  const dispatch = useDispatch()

useLibraryFilter('favorites')

  const { status } = useSelector(selectBooksResult)
  const books = useSelector(selectVisibleBooks)

  const isOpen = useSelector(selectIsPreviewOpen)
   const confirmId = useSelector(selectConfirmDeleteId)
  const confirmVariant = useSelector(selectConfirmDeleteVariant)
  const confirmBook = useSelector(useMemo(() => selectBookById(confirmId), [confirmId]))
  const [deleteBook] = useDeleteBookMutation()
  const [isDeleting, setDeleting] = useState(false)

  if (status === 'pending' || status === 'uninitialized') {
    return <LoadingSpinner />
  }
const handleDelete = async () => {
    if (!confirmBook || isDeleting) return
    setDeleting(true)
    try {
      await deleteBook(confirmBook._id).unwrap()
      dispatch(clearPreviewBook())
    } catch (err) {
      console.error('[Delete Error]', err)
    }
    setDeleting(false)
    dispatch(clearConfirmDelete())
  }
  return (
    <Container>
      <LibraryBooksRenderer books={books} hideAddTile />

       {isOpen && <BookCardPreviewModal />}

      {confirmId && confirmBook && (
        <ConfirmModal
          bookId={confirmBook._id}
          bookTitle={confirmBook.meta?.title}
          variant={confirmVariant}
          onConfirm={handleDelete}
          onCancel={() => dispatch(clearConfirmDelete())}
          isLoading={isDeleting}
        />
      )}
    </Container>
  )
}

export default FavoritesView
