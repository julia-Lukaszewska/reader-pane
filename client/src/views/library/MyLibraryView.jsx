/**
 * @file LibraryView.jsx
 * @description Renders the user's library. Shows guest message if not logged in.
 * Displays non-archived books with view mode support, handling loading and error states.
 */

import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useGetBooksQuery } from '@/store/api/booksApi'
import { selectLibraryViewMode } from '@/store/selectors/selectors'
import { useAuth } from '@/modules/user/hooks'
import LibraryBooksRenderer from '@/modules/library/components/LibraryBooksRenderer/BooksRenderer'
import EmptyLibraryGuestMessage from './EmptyLibraryGuestMessage'
import { LoadingSpinner } from '@/components'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

const Container = styled.div`
  width: 100%;
  flex: 1;
`

//-----------------------------------------------------------------------------
// Component: LibraryView
//-----------------------------------------------------------------------------

/**
 * Displays user's library view.
 * - Shows guest message if user is not logged in.
 * - Shows loading spinner or error state if fetching books.
 * - Displays filtered list of non-archived books in selected view mode.
 *
 * @component
 * @returns {JSX.Element}
 */
const LibraryView = () => {
  const { isLoggedIn } = useAuth()
  const viewMode = useSelector(selectLibraryViewMode)

  //--- If user is not logged in, show guest message
  if (!isLoggedIn) return <EmptyLibraryGuestMessage />

  //--- Fetch books only if logged in
  const { data: books = [], isLoading, isError } = useGetBooksQuery(undefined, {
    skip: !isLoggedIn,
  })

  if (isLoading) return <LoadingSpinner />
  if (isError) return <div>Error loading books.</div>

  const filteredBooks = books
    .filter(b => !b.flags?.isArchived)
    .filter(b => b.meta?.title && b.meta?.fileUrl)

  return (
    <Container>
      <LibraryBooksRenderer books={filteredBooks} viewMode={viewMode} />
    </Container>
  )
}

export default LibraryView
