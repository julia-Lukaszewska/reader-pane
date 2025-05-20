import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tile from './Tile';
import ListItem from './ListItem';
import TableRow from './TableRow';
import ConfirmModal from '@/components/ConfirmModal';
import { selectIsManageMode } from '@/store/selectors';
import { useDeleteBookMutation } from '@/store/api/booksApi';

import { toggleSelect, setPreviewBookId } from '@/store/slices/bookSlice';
import useBookActions from '../hooks/useBookActions';

const BookCard = ({ book, viewType }) => {
  const dispatch = useDispatch();
  const [deleteBook] = useDeleteBookMutation();

  const [isConfirmOpen, setConfirm] = useState(false);


  const { openReader } = useBookActions(book);
  const isManageMode = useSelector(selectIsManageMode);

  const handleSelect = () => dispatch(toggleSelect(book._id));

  const handleOpenPreview = () => {
    if (isManageMode) return;
    dispatch(setPreviewBookId(book._id));
  };

  const handleRemoveClick = () => setConfirm(true);
  const handleConfirmDelete = async () => {
    await deleteBook(book._id);
    setConfirm(false);
  };
  const handleCancelDelete = () => setConfirm(false);

  const commonProps = {
    book,
    onSelect: handleSelect,
    onOpenPreview: handleOpenPreview,
    onOpenReader: openReader,
    onRemoveClick: handleRemoveClick,
    isManageMode,
  };

  return (
    <>
      {viewType === 'grid' && (
        <Tile
          {...commonProps}
          onClick={handleOpenPreview}
        />
      )}
      {viewType === 'list' && (
        <ListItem
          {...commonProps}
          onClick={handleOpenPreview}
        />
      )}
      {viewType === 'table' && (
        <TableRow
          {...commonProps}
          onClick={handleOpenPreview}
        />
      )}
     
      {isConfirmOpen && (
        <ConfirmModal
          bookId={book._id}
          bookTitle={book.meta?.title}
          variant={book.flags?.isArchived ? 'permanent-delete' : 'library'}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};

export default BookCard;
