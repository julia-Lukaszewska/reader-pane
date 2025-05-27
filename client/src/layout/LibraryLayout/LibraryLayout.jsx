// src/layout/LibraryLayout/LibraryLayout.jsx
/**
 * @file LibraryLayout.jsx
 * @description Layout wrapper for the Library view. Loads books, manages sorting, preview modal, and toolbar states.
 */

import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { useGetBooksQuery } from '@/store/api/booksApi'
import {
  selectSortMode,
  selectIsManageMode,
  selectSelectedBookIds,
  selectIsPreviewOpen,
  selectPreviewBookId,
  selectIsLoggedIn,
} from '@/store/selectors/selectors'
import { clearPreviewBook } from '@/store/slices/bookSlice'
import { sortBooks } from '@book/utils'

import EmptyLibraryGuestMessage from '@/views/library/EmptyLibraryGuestMessage'
import { LoadingSpinner } from '@/components'
import { LibraryToolbar } from '@library/Layout'
import { BooksManagementToolbar } from '@library/components/BooksManagement'
import { BookCardPreviewModal } from '@book/BookCardPreviewModal'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 3rem;
  height: 100%;
  width: 100%;
  background: var(--gradient-blue-clear);
`

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------

/**
 * Layout component for the Library page.
 * Handles data loading, sorting, local state, and modal logic.
 *
 * @returns {JSX.Element}
 */
export default function LibraryLayout() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const sortMode = useSelector(selectSortMode)
  const isManageMode = useSelector(selectIsManageMode)
  const selectedIds = useSelector(selectSelectedBookIds)
  const isOpen = useSelector(selectIsPreviewOpen)
  const previewId = useSelector(selectPreviewBookId)

  // Fetch books (skip if not logged in)
  const {
    data: booksRaw = [],
    isLoading,
    isError,
  } = useGetBooksQuery(undefined, {
    skip: !isLoggedIn,
    refetchOnMountOrArgChange: true,
  })

  // Filter out invalid entries
  const validBooks = useMemo(
    () =>
      booksRaw.filter(
        b =>
          b &&
          b._id &&
          b.meta?.fileUrl &&
          typeof b.meta.fileUrl === 'string'
      ),
    [booksRaw]
  )

  // Sort according to mode
  const books = useMemo(
    () => sortBooks(validBooks, sortMode),
    [validBooks, sortMode]
  )

  // Persist sort mode
  useEffect(() => {
    localStorage.setItem('sortMode', sortMode)
  }, [sortMode])

  // Find book for preview modal
  const previewBook = books.find(b => b._id === previewId)

  // Render states
  if (isLoading) return <LoadingSpinner />
  if (isError) return <div>Error loading books.</div>
  if (!isLoggedIn) return <EmptyLibraryGuestMessage />

  return (
    <Container>
      <LibraryToolbar />
      <Outlet />

      {isManageMode && selectedIds.length > 0 && (
        <BooksManagementToolbar />
      )}

      {isOpen && previewBook && (
        <BookCardPreviewModal
          book={previewBook}
          onClose={() => dispatch(clearPreviewBook())}
        />
      )}
    </Container>
  )
}
