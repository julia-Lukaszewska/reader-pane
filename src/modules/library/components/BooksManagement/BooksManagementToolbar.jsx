/**
 * @file BooksManagementToolbar.jsx
 * @description Toolbar for bulk actions (delete, archive, cancel) on selected books in management mode.
 */

import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { clearSelected, setManageMode } from '@/store/slices/bookSlice'
import {
  useDeleteBookMutation,
  useUpdateBookMutation,
} from '@/store/api/booksApi'
import { selectSelectedBookIds } from '@/store/selectors'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

//--- Wrapper for toolbar
const ManagementWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  margin-bottom: 1rem;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  border-radius: var(--border-radius);
`

//--- Action buttons
const Button = styled.button`
  padding: 0.4rem 1rem;
  border-radius: 6px;
  background-color: var(--color-accent);
  color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--color-accent-hover);
  }
`

//-----------------------------------------------------------------------------
// Component: BooksManagementToolbar
//-----------------------------------------------------------------------------

/**
 * Displays toolbar for bulk actions when books are selected in manage mode.
 *
 * @component
 * @returns {JSX.Element|null}
 */
const BooksManagementToolbar = () => {
  const dispatch = useDispatch()
  const selectedIds = useSelector(selectSelectedBookIds)

  const [deleteBook] = useDeleteBookMutation()
  const [updateBook] = useUpdateBookMutation()

  //--- Exit management mode and clear selection
  const exitManaging = () => {
    dispatch(clearSelected())
    dispatch(setManageMode(false))
  }

  //--- Delete selected books from backend
  const handleDelete = async () => {
    for (const bookId of selectedIds) {
      await deleteBook(bookId)
    }
    exitManaging()
  }

  //--- Archive selected books (set isArchived = true)
  const handleArchive = async () => {
    for (const bookId of selectedIds) {
      await updateBook({
        id: bookId,
        changes: { flags: { isArchived: true } },
      })
    }
    exitManaging()
  }

  //--- Cancel selection and exit mode
  const handleClearSelection = () => {
    exitManaging()
  }

  //--- Do not render if nothing is selected
  if (selectedIds.length === 0) return null

  return (
    <ManagementWrapper>
      <div>{selectedIds.length} selected books</div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button onClick={handleDelete}>Delete</Button>
        <Button onClick={handleArchive}>Archive</Button>
        <Button onClick={handleClearSelection}>Cancel</Button>
      </div>
    </ManagementWrapper>
  )
}

export default React.memo(BooksManagementToolbar)
