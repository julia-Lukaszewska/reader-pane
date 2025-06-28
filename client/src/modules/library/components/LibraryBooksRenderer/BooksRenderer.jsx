import { useMemo, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { selectLibraryViewMode, selectSortMode } from '@/store/selectors'
import { useGetBooksQuery } from '@/store/api/booksPrivateApi'
import sortBooks from '@book/utils/sortBooks'
import {
  LibraryGridLayout,
  LibraryListLayout,
  LibraryTableLayout,
  PaginationControls,
} from '@library/components'

/* --------------------------------------------- */
/* STYLES                                        */
/* --------------------------------------------- */
const EmptyMessage = styled.p`
  padding: 2rem;
  text-align: center;
`

/* --------------------------------------------- */
/* COMPONENT                                     */
/* --------------------------------------------- */
const LibraryBooksRenderer = ({
  hideAddTile = false,
  onRestore,
  onDelete,
  viewMode: viewModeProp,
   pageSize = 12,
}) => {
  const { pathname } = useLocation()
  const { data: bookData } = useGetBooksQuery()
  const sortMode = useSelector(selectSortMode)
  const stateViewMode = useSelector(selectLibraryViewMode)
  const viewMode = viewModeProp ?? stateViewMode
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
  }, [pathname, sortMode, pageSize])
  /* --------------------------------------------- */
  /* FILTER BOOKS BY PATH                          */
  /* --------------------------------------------- */
  const books = useMemo(() => {
    if (!bookData?.ids?.length) return []

    const allBooks = bookData.ids.map(id => bookData.entities[id])

    switch (pathname) {
      case '/library/favorites':
        return allBooks.filter(b => b.flags?.isFavorited)
      case '/library/archive':
        return allBooks.filter(b => b.flags?.isArchived)
      case '/library':
        return allBooks.filter(b => !b.flags?.isArchived)
      default:
        return []
    }
  }, [bookData, pathname])

  /* --------------------------------------------- */
  /* SORT BOOKS                                    */
  /* --------------------------------------------- */
  const sortedBooks = useMemo(() => sortBooks(books, sortMode), [books, sortMode])
  const totalPages = Math.max(1, Math.ceil(sortedBooks.length / pageSize))
  const paginatedBooks = useMemo(() => {
    const start = (page - 1) * pageSize
    const end = start + pageSize
    return sortedBooks.slice(start, end)
  }, [sortedBooks, page, pageSize])
  /* --------------------------------------------- */
  /* UI FLAGS                                      */
  /* --------------------------------------------- */
  const shouldHideAddTile =
    hideAddTile || pathname === '/library/archive' || pathname === '/library/favorites'

  if (!sortedBooks.length && shouldHideAddTile) {
    return <EmptyMessage>No books found.</EmptyMessage>
  }

  /* --------------------------------------------- */
  /* RENDER LAYOUT                                 */
  /* --------------------------------------------- */
  const commonProps = {
      books: paginatedBooks,
    hideAddTile: shouldHideAddTile,
    onRestore,
    onDelete,
    viewMode,
  }

  switch (viewMode) {
    case 'grid':
            return (
        <>
          <PaginationControls page={page} totalPages={totalPages} onChange={setPage} />
          <LibraryGridLayout {...commonProps} />
        </>
      )
    case 'list':
        return (
        <>
          <PaginationControls page={page} totalPages={totalPages} onChange={setPage} />
          <LibraryListLayout {...commonProps} />
        </>
      )
    case 'table':
            return (
        <>
          <PaginationControls page={page} totalPages={totalPages} onChange={setPage} />
          <LibraryTableLayout {...commonProps} />
        </>
      )
    default:
      return <EmptyMessage>Invalid view mode: {viewMode}</EmptyMessage>
  }
}

export default LibraryBooksRenderer
