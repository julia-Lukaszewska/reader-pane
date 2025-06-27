/**
 * @file MyLibraryView.jsx
 * @description Displays non-archived books in the selected view mode.
 */

import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useLibraryFilter } from '@library/hooks'
import {

  selectBooksResult,
  selectIsPreviewOpen,

    selectConfirmDeleteId,
  selectConfirmDeleteVariant,
  selectBookById,
} from '@/store/selectors'

import LibraryBooksRenderer from '@/modules/library/components/LibraryBooksRenderer/BooksRenderer'
import { LoadingSpinner, ConfirmModal } from '@/components'
import { BookCardPreviewModal } from '@book/BookCardPreviewModal'
import { clearPreviewBook, clearConfirmDelete } from '@/store/slices/bookSlice'
import { useDeleteBookMutation } from '@/store/api/booksPrivateApi'

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
   const isOpen = useSelector(selectIsPreviewOpen)
  const confirmId = useSelector(selectConfirmDeleteId)
  const confirmVariant = useSelector(selectConfirmDeleteVariant)
  const confirmBook = useSelector(useMemo(() => selectBookById(confirmId), [confirmId]))
  const [deleteBook] = useDeleteBookMutation()
  const [isDeleting, setDeleting] = useState(false)

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

  if (status === 'pending' || status === 'uninitialized') {
    return <LoadingSpinner />
  }
  if (status === 'rejected') {
    return <div>Error loading books.</div>
  }

  return (
    <Container>
      <LibraryBooksRenderer hideAddTile={false} />

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

export default MyLibraryView
