/**
 * @file BookCard.jsx
 * @description Displays a single book in the selected view mode (grid, list, table).
 * Handles preview, selection, reader opening, and delete confirmation.
 */

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Tile from './Tile'
import ListItem from './ListItem'
import TableRow from './TableRow'
import { selectIsManageMode } from '@/store/selectors'
import {
  toggleSelect,
  setPreviewBookId,
  setConfirmDelete,
} from '@/store/slices/bookSlice'
import { setForm } from '@/store/slices/bookModalSlice'
import useBookActions from '../hooks/useBookActions'

//-----------------------------------------------------------------------------
// Component: BookCard
//-----------------------------------------------------------------------------

const BookCard = ({ book, viewType }) => {
  const dispatch = useDispatch()
  const isManageMode = useSelector(selectIsManageMode)
  const { openReader } = useBookActions(book)

  //--- Toggle book selection
  const handleSelect = () => dispatch(toggleSelect(book._id))

  //--- Open preview modal (only if not in manage mode)
  const handleOpenPreview = () => {
    if (isManageMode) return
    dispatch(setPreviewBookId(book._id))
    dispatch(setForm(book)) // kluczowe!
  }

  //--- Show confirmation modal for delete
  const handleRemoveClick = () => {
    dispatch(
      setConfirmDelete({
        id: book._id,
        variant: book.flags?.isArchived ? 'permanent-delete' : 'library',
      })
    )
  }

  //--- Common props passed to view components
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
      {viewType === 'grid' && <Tile {...commonProps} />}
      {viewType === 'list' && <ListItem {...commonProps} />}
      {viewType === 'table' && <TableRow {...commonProps} />}
    </>
  )
}

export default BookCard
