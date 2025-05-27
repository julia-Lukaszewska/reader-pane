/**
 * @file FavoritesView.jsx
 * @description Renders favorited, non-archived books in the selected view mode (grid, list, table).
 * Shows a guest message if user is not logged in.
 */

import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useGetBooksQuery } from '@/store/api/booksApi'
import { selectLibraryViewMode } from '@/store/selectors/selectors'
import { useAuth } from '@/modules/user/hooks'
import EmptyLibraryGuestMessage from './EmptyLibraryGuestMessage'
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
 * Displays favorited books that are not archived.
 * If not logged in, shows a guest message.
 *
 * @component
 * @returns {JSX.Element|null}
 */
const FavoritesView = () => {
  const { isLoggedIn } = useAuth()
  const viewMode = useSelector(selectLibraryViewMode)

  //--- Only allow access if user is logged in
  if (!isLoggedIn) return <EmptyLibraryGuestMessage />

  //--- Fetch books conditionally
  const { data: books = [], isLoading } = useGetBooksQuery(undefined, {
    skip: !isLoggedIn,
  })

  if (isLoading) return null

  const favoriteBooks = books.filter(
    book => book.flags?.isFavorited && !book.flags?.isArchived
  )

  return (
    <Container>
      <LibraryBooksRenderer
        books={favoriteBooks}
        viewMode={viewMode}
        hideAddTile
      />
    </Container>
  )
}

export default FavoritesView
