/**
 * @file BookCard.jsx
 * @description Displays a single book in the selected view mode (grid, list, table).
 * Handles preview, selection, reader opening, and delete confirmation.
 */

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Tile from './Tile'
import ListItem from './ListItem'
import TableRow from './TableRow'
import ConfirmModal from '@/components/ConfirmModal'
import { selectIsManageMode } from '@/store/selectors'
import { useDeleteBookMutation } from '@/store/api/booksPrivateApi'
import { toggleSelect, setPreviewBookId } from '@/store/slices/bookSlice'
import useBookActions from '../hooks/useBookActions'

//-----------------------------------------------------------------------------
// Component: BookCard
//-----------------------------------------------------------------------------

const BookCard = ({ book, viewType }) => {
  if (!book || !book._id) return null
  const dispatch = useDispatch()
  const [deleteBook] = useDeleteBookMutation()
  const [isConfirmOpen, setConfirm] = useState(false)
const [isDeleting, setDeleting] = useState(false)
  const isManageMode = useSelector(selectIsManageMode)
  const { openReader } = useBookActions(book)

  //--- Toggle book selection
  const handleSelect = () => dispatch(toggleSelect(book._id))

  //--- Open preview modal
  const handleOpenPreview = () => {
    if (!isManageMode) dispatch(setPreviewBookId(book._id))
  }

  //--- Show confirmation modal
  const handleRemoveClick = () => setConfirm(true)

  //--- Confirm permanent delete
const handleConfirmDelete = async () => {
  if (isDeleting) return  
  setDeleting(true)      

  try {
    await deleteBook(book._id).unwrap()
  } catch (err) {
    console.error('[Delete Error]', err)
  }

  setDeleting(false)
  setConfirm(false)
}

  //--- Cancel delete
  const handleCancelDelete = () => setConfirm(false)

  //--- Common props for all view types
  const commonProps = {
    book,
    onSelect: handleSelect,
    onOpenPreview: handleOpenPreview,
    onOpenReader: openReader,
    onRemoveClick: handleRemoveClick,
    isManageMode,
  }

  return (
    <>
      {viewType === 'grid' && <Tile {...commonProps} onClick={handleOpenPreview} />}
      {viewType === 'list' && <ListItem {...commonProps} onClick={handleOpenPreview} />}
      {viewType === 'table' && <TableRow {...commonProps} onClick={handleOpenPreview} />}

      {isConfirmOpen && (
        <ConfirmModal
          bookId={book._id}
          bookTitle={book.meta?.title}
          variant={book.flags?.isArchived ? 'permanent-delete' : 'library'}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
           isLoading={isDeleting}
        />
      )}
    </>
  )
}

export default BookCard
