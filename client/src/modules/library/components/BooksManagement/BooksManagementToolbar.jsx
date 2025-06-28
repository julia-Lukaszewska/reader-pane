/**
 * @file BooksManagementToolbar.jsx
 * @description Toolbar for bulk actions (delete, archive, cancel) on selected books in management mode.
 */

import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearSelected,
  setManageMode,
  setSelectedIds,
  setConfirmDelete,
} from '@/store/slices/bookSlice'
import { useBulkBookActions } from '@library/hooks'
import {
  selectSelectedBookIds,
  selectVisibleBooks,
} from '@/store/selectors'
import { ConfirmModal } from '@/components'

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
  const visible    = useSelector(selectVisibleBooks)
  const visibleIds = visible.map(b => b._id)
  const allSelected = visibleIds.length > 0 && visibleIds.every(id => selectedIds.includes(id))
  const { archiveAll } = useBulkBookActions()

  //--- Exit management mode and clear selection
  const exitManaging = () => {
    dispatch(clearSelected())
    dispatch(setManageMode(false))
  }

  //--- Delete selected books from backend
  const handleDelete = () => {
    dispatch(setConfirmDelete({ id: 'bulk', variant: 'bulk-delete' }))
  }

  //--- Archive selected books (set isArchived = true)
  const handleArchive = async () => {
 await archiveAll(selectedIds)
    exitManaging()
  }

  //--- Cancel selection and exit mode
  const handleClearSelection = () => {
    exitManaging()
  }

  const handleToggleSelectAll = () => {
    dispatch(setSelectedIds(allSelected ? [] : visibleIds))
  }
  return (
    <>
      <ManagementWrapper>
        <div>{selectedIds.length} selected books</div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button onClick={handleDelete} disabled={selectedIds.length === 0}>Delete</Button>
          <Button onClick={handleArchive} disabled={selectedIds.length === 0}>Archive</Button>
          <Button onClick={handleToggleSelectAll}>
            {allSelected ? 'Deselect All' : 'Select All'}
          </Button>
          <Button onClick={handleClearSelection}>Cancel</Button>
        </div>
      </ManagementWrapper>
    </>
  )
}

export default React.memo(BooksManagementToolbar)