import { useMemo, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { selectLibraryViewMode, selectSortMode, selectLibraryPage, selectSearchQuery } from '@/store/selectors'
import { setLibraryPage } from '@/store/slices/bookSlice'
import { LIBRARY_PAGE_SIZE } from '@/utils/constants'
import { useGetBooksQuery } from '@/store/api/booksPrivateApi'
import sortBooks from '@book/utils/sortBooks'
import {
  LibraryGridLayout,
  LibraryListLayout,
  LibraryTableLayout,

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

}) => {
  const { pathname } = useLocation()
  const { data: bookData } = useGetBooksQuery()
  const sortMode = useSelector(selectSortMode)
  const stateViewMode = useSelector(selectLibraryViewMode)
  const viewMode = viewModeProp ?? stateViewMode
 const searchQuery = useSelector(selectSearchQuery) || ''
  const dispatch = useDispatch()
  const page = useSelector(selectLibraryPage)

  useEffect(() => {
    dispatch(setLibraryPage(1))
}, [pathname, sortMode, searchQuery, dispatch])
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
  const searchedBooks = useMemo(() => {
    const q = searchQuery.toLowerCase()
    if (!q) return sortedBooks
    return sortedBooks.filter(b => {
      const title = (b.meta.title || '').toLowerCase()
      const author = (b.meta.author || '').toLowerCase()
      return title.includes(q) || author.includes(q)
    })
  }, [sortedBooks, searchQuery])
  const totalPages = Math.max(1, Math.ceil(searchedBooks.length / LIBRARY_PAGE_SIZE))
  const paginatedBooks = useMemo(() => {
    const start = (page - 1) * LIBRARY_PAGE_SIZE
    const end = start + LIBRARY_PAGE_SIZE
    return searchedBooks.slice(start, end)
  }, [searchedBooks, page])

  useEffect(() => {
    if (page > totalPages) dispatch(setLibraryPage(totalPages))
  }, [totalPages, page, dispatch])
  /* --------------------------------------------- */
  /* UI FLAGS                                      */
  /* --------------------------------------------- */
  const shouldHideAddTile =
    hideAddTile || pathname === '/library/archive' || pathname === '/library/favorites'

  if (!searchedBooks.length && shouldHideAddTile) {
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
      return <LibraryGridLayout {...commonProps} />
    case 'list':
      return <LibraryListLayout {...commonProps} />
    case 'table':
      return <LibraryTableLayout {...commonProps} />
    default:
      return <EmptyMessage>Invalid view mode: {viewMode}</EmptyMessage>
  }
}

export default LibraryBooksRenderer