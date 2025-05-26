/**
 * @file MyLibraryView.jsx
 * @description Renders the user's library with non-archived books, handling loading and error states.
 */
import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useGetBooksQuery } from '@/store/api/booksApi'
import { selectLibraryViewMode } from '@/store/selectors/selectors'
import LibraryBooksRenderer from '@/modules/library/components/LibraryBooksRenderer/BooksRenderer'
import { LoadingSpinner } from '@/components'

//-----------------------------------------------------------------------------
// Styled components
//----------------------------------------------------------------------------- 

const Container = styled.div`
  width: 100%;
  flex: 1;  
`

//-----------------------------------------------------------------------------
// Component: MyLibraryView
//-----------------------------------------------------------------------------

/**
 * Displays the user's library of non-archived books in the selected view mode.
 * Shows a loading spinner while fetching and an error message on failure.
 * Filters out items without title or fileUrl.
 *
 * @component
 * @returns {JSX.Element}
 */
const MyLibraryView = () => {
  const viewMode = useSelector(selectLibraryViewMode)
  const { data: books = [], isLoading, isError } = useGetBooksQuery()

  if (isLoading) return <LoadingSpinner />
  if (isError) return <div>Error loading books.</div>

  const filteredBooks = books
    .filter(b => !b.flags?.isArchived)
    .filter(b => b.meta?.title && b.meta?.fileUrl)

  return (
  <Container>
    <LibraryBooksRenderer
      books={filteredBooks}
      viewMode={viewMode}
    />
  </Container>
)
}

export default MyLibraryView
