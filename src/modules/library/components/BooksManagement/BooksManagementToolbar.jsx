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
const BooksManagementToolbar = () => {
  const dispatch = useDispatch()
  const selectedIds = useSelector(selectSelectedBookIds)

  const [deleteBook] = useDeleteBookMutation()
  const [updateBook] = useUpdateBookMutation()

  const exitManaging = () => {
    dispatch(clearSelected())
    dispatch(setManageMode(false))
  }

  const handleDelete = async () => {
    for (const bookId of selectedIds) {
      await deleteBook(bookId)
    }
    exitManaging()
  }

  const handleArchive = async () => {
    for (const bookId of selectedIds) {
      await updateBook({ id: bookId, changes: { flags: { isArchived: true } } })
    }
    exitManaging()
  }

  const handleClearSelection = () => {
    exitManaging()
  }

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
