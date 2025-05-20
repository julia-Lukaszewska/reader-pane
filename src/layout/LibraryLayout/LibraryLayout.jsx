// src/layout/LibraryLayout/LibraryLayout.jsx
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
} from '@/store/selectors'
import { clearPreviewBook } from '@/store/slices/bookSlice'
import { sortBooks } from '@book/utils'
import { LoadingSpinner } from '@/components'
import { LibraryToolbar } from '@library/Layout'
import { BooksManagementToolbar } from '@library/components/BooksManagement'
import { BookCardPreviewModal } from '@book/BookCardPreviewModal'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 3rem;
  height: 100%;
  width: 100%;
  background: var(--gradient-blue-clear);
`

export default function LibraryLayout() {
  const dispatch = useDispatch()

  // Redux state
  const sortMode     = useSelector(selectSortMode)
  const isManageMode = useSelector(selectIsManageMode)
  const selectedIds  = useSelector(selectSelectedBookIds)
  const isOpen       = useSelector(selectIsPreviewOpen)
  const previewId    = useSelector(selectPreviewBookId)

  // Load books
  const {
    data: booksRaw = [],
    refetch,
    isLoading,
    isError,
  } = useGetBooksQuery(undefined, { refetchOnMountOrArgChange: true })

  // Filter out books with missing data
  const validBooks = useMemo(
    () =>
      booksRaw.filter(
        (b) =>
          b &&
          b._id &&
          b.meta?.fileUrl &&
          typeof b.meta.fileUrl === 'string'
      ),
    [booksRaw]
  )

  const booksWithUrl = useMemo(
    () =>
      validBooks.map((b) => ({
        ...b,
        meta: { ...b.meta, url: `http://localhost:3001${b.meta.fileUrl}` },
      })),
    [validBooks]
  )

  // Sort books
  const sortedBooks = useMemo(
    () => sortBooks(booksWithUrl, sortMode),
    [booksWithUrl, sortMode]
  )

  const books = sortedBooks

  // Persist sortMode to localStorage
  useEffect(() => {
    localStorage.setItem('sortMode', sortMode)
  }, [sortMode])

  // Refetch books on mount
  useEffect(() => {
    refetch()
  }, [refetch])

  // Find book for preview modal
  const previewBook = books.find((b) => b._id === previewId)

  if (isLoading) return <LoadingSpinner />
  if (isError) return <div>Error loading books.</div>

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
