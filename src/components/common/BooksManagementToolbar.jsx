//-----------------------------------------------------------------------------
//------ BooksManagementToolbar – Toolbar for managing selected books 
//-----------------------------------------------------------------------------

import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearSelectedBooks,
  deleteBookForeverThunk,
  archiveBookThunk,
} from '@/store' 

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

const BooksManagementToolbar = () => {
  const dispatch = useDispatch()
  const selectedBooks = useSelector((state) => state.library.selectedBooks)

  const handleDelete = () => {
    selectedBooks.forEach((bookId) => {
      dispatch(deleteBookForeverThunk(bookId)) // remove each book 
    })
    dispatch(clearSelectedBooks()) // clear selection 
  }

  const handleArchive = () => {
    selectedBooks.forEach((bookId) => {
      dispatch(archiveBookThunk(bookId)) // archive each book 
    })
    dispatch(clearSelectedBooks())
  }

  const handleClearSelection = () => {
    dispatch(clearSelectedBooks())
  }

  if (selectedBooks.length === 0) return null

  return (
    <ManagementWrapper>
    <div>{selectedBooks.length} selected books</div>
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button onClick={handleDelete}>Delete</Button>
      <Button onClick={handleArchive}>Archive</Button>
      <Button onClick={handleClearSelection}>Cancel Selection</Button>
    </div>
  </ManagementWrapper>
  )
}

export default BooksManagementToolbar 
