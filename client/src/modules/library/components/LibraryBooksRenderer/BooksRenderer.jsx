/**
 * @file LibraryBooksRenderer.jsx
 * @description Renders the sorted list of books in the chosen view mode (grid, list, table).
 */

import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useGetBooksQuery } from '@/store/api/booksPrivateApi/booksApiCollection'
import {
  selectLibraryViewMode,
  selectSortMode,
} from '@/store/selectors'
import { selectAllBooks } from '@/store/selectors/booksSelectors'

import sortBooks from '@book/utils/sortBooks'
import {
  LibraryGridLayout,
  LibraryListLayout,
  LibraryTableLayout,
} from '@library/components'
import { LoadingSpinner } from '@/components'

// ----------------------------------------
// Styled
// ----------------------------------------
const EmptyMessage = styled.p`
  padding: 2rem;
  text-align: center;
`

// ----------------------------------------
// Component
// ----------------------------------------

/**
 * Displays the list of books in the current library view mode.
 * Fetches books on its own – nie wymaga props.books.
 */
export default function LibraryBooksRenderer({ hideAddTile = false }) {
  // ⇢ 1. fetch (zwraca isLoading / isError)
  const { isLoading, isError } = useGetBooksQuery()

  // ⇢ 2. pobranie danych z cache RTK Query
  const booksRaw  = useSelector(selectAllBooks)      // może być []
  const viewMode  = useSelector(selectLibraryViewMode)
  const sortMode  = useSelector(selectSortMode)

  // ⇢ 3. sort + memo
  const books = useMemo(() => sortBooks(booksRaw, sortMode), [booksRaw, sortMode])

  // ⇢ 4. UI loading / error / empty
  if (isLoading) return <LoadingSpinner />
  if (isError)   return <EmptyMessage>Błąd ładowania książek.</EmptyMessage>
  if (!books.length && hideAddTile)
    return <EmptyMessage>No books found.</EmptyMessage>

  // ⇢ 5. render właściwego layoutu
  switch (viewMode) {
    case 'grid':
      return <LibraryGridLayout books={books} hideAddTile={hideAddTile} />
    case 'list':
      return <LibraryListLayout books={books} hideAddTile={hideAddTile} />
    case 'table':
      return <LibraryTableLayout books={books} hideAddTile={hideAddTile} />
    default:
      return <EmptyMessage>Invalid view mode: {viewMode}</EmptyMessage>
  }
}
