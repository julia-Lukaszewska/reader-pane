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
import { toggleSelect, setPreviewBookId, setConfirmDelete } from '@/store/slices/bookSlice'
import { selectIsManageMode } from '@/store/selectors'

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

  //--- Open preview modal
  const handleOpenPreview = () => {
    if (!isManageMode) dispatch(setPreviewBookId(book._id))
  }

  //--- Show confirmation modal
   const handleRemoveClick = () => {
    dispatch(setConfirmDelete({
      id: book._id,
      variant: book.flags?.isArchived ? 'permanent-delete' : 'library'
    }))}
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

    </>
  )
}

export default BookCard
