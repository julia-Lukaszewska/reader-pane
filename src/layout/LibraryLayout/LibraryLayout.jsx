// File: src/views/library/LibraryLayout.jsx
//-----------------------------------------------------------------------------
// LibraryLayout – wrapper for /library routes: fetch, sort, filter + toolbar + Outlet context 
//-----------------------------------------------------------------------------
import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { Outlet, useMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBooks, setSortMode } from '@/store'
import { sortBooks } from '@/utils/sortBooks'
import { BooksManagementToolbar, LoadingSpinner } from '@/components'
import { default as LibraryToolbar } from './LibraryToolbar'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 3rem;
  height: 100%;
  width: 100%;
  background: var(--gradient-blue-clear);
` 

const LibraryLayout = () => {
  const dispatch = useDispatch()
  const books = useSelector((state) => state.library.list)
  const loading = useSelector((state) => state.library.loading)
  const sortMode = useSelector((state) => state.library.sortMode)
  const viewMode = useSelector((state) => state.library.libraryViewMode)
  const isManaging = useSelector((state) => state.library.isManaging)
  const selected = useSelector((state) => state.library.selectedBooks)

  // Fetch books on mount
  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  // Restore sortMode
  useEffect(() => {
    const saved = localStorage.getItem('sortMode')
    if (saved) dispatch(setSortMode(saved))
  }, [dispatch])

  // Persist sortMode
  useEffect(() => {
    localStorage.setItem('sortMode', sortMode)
  }, [sortMode])

  // Sort books
  const sorted = useMemo(() => sortBooks(books, sortMode), [books, sortMode])

  // Determine filter
  const isFavorites = useMatch('/library/favorites')
  const isArchive = useMatch('/library/archive')
  const filtered = useMemo(() => {
    if (isFavorites) return sorted.filter((b) => b.isFavorite && !b.isArchived)
    if (isArchive) return sorted.filter((b) => b.isArchived)
    return sorted.filter((b) => !b.isArchived)
  }, [sorted, isFavorites, isArchive])

  return (
    <Container>
      <LibraryToolbar />

      {loading ? (
        <LoadingSpinner />
      ) : (
        // Pass filtered books via context to children views
        <Outlet context={{ books: filtered, viewMode }} />
      )}
      {isManaging && selected.length > 0 && <BooksManagementToolbar />}
    </Container>
  )
}

export default LibraryLayout
