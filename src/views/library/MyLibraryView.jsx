import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useGetBooksQuery } from '@/store/api/booksApi'
import { selectLibraryViewMode } from '@/store/selectors'
import LibraryBooksRenderer from '@/modules/library/components/LibraryBooksRenderer/BooksRenderer'
import { LoadingSpinner } from '@/components'

const Container = styled.div`
  width: 100%;
  flex: 1;
`

const MyLibraryView = () => {
  const viewMode = useSelector(selectLibraryViewMode)
  const { data: books = [], isLoading, isError } = useGetBooksQuery()

  if (isLoading) return <LoadingSpinner />
  if (isError)   return <div>Error loading books.</div>

  // filter only non-archived books with valid title and fileUrl
  const filteredBooks = books
    .filter(b => !b.flags?.isArchived)
    .filter(b => b.meta?.title && b.meta?.fileUrl)

  // no books available
  if (!filteredBooks.length) {
    return (
      <Container>
        <p style={{ padding: '2rem', opacity: 0.6 }}>No books in your library</p>
      </Container>
    )
  }

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
