/**
 * @file FavoritesView.jsx
 * @description Renders favorited, non-archived books in the chosen view mode (grid, list, table).
 */
import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useGetBooksQuery } from '@/store/api/booksApi'
import { selectLibraryViewMode } from '@/store/selectors'
import LibraryBooksRenderer from '@/modules/library/components/LibraryBooksRenderer/BooksRenderer'

//-----------------------------------------------------------------------------
// Styled components
//----------------------------------------------------------------------------- 

const Container = styled.div`
  width: 100%;
  flex: 1;
`

//-----------------------------------------------------------------------------
// Component: FavoritesView
//----------------------------------------------------------------------------- 

/**
 * Displays favorited books (not archived) in the selected view mode.
 *
 * @component
 * @returns {JSX.Element|null}
 */
const FavoritesView = () => {
  const viewMode = useSelector(selectLibraryViewMode)
  const { data: books = [], isLoading } = useGetBooksQuery()

  if (isLoading) return null

  const favoriteBooks = books.filter(
    book => book.flags?.isFavorited && !book.flags?.isArchived
  )

  return (
    <Container>
      <LibraryBooksRenderer
        books={favoriteBooks}
        viewMode={viewMode}
      />
    </Container>
  )
}

export default FavoritesView
