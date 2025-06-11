/**
 * @file LibraryLayout.jsx
 * @description Pure layout for the library section. Renders toolbar, outlet and optional management toolbar.
 */

import React from 'react'
import styled from 'styled-components'
import { useGetBooksQuery } from '@/store/api/booksPrivateApi/booksApiCollection'
import { useSelector } from 'react-redux'
import  {selectIsLoggedIn} from '@/store/selectors/authSelectors'
import {
  selectIsManageMode,
  selectSelectedBookIds,
 
} from '@/store/selectors'

import EmptyLibraryGuestMessage from '@/views/library/EmptyLibraryGuestMessage'
import { LibraryToolbar } from '@library/Layout'
import { BooksManagementToolbar } from '@library/components/BooksManagement'
import {BooksManagementController}from '@library/components'
import { LoadingSpinner }             from '@/components'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;
  width: 100%;
  background: var(--gradient-blue-clear);
`

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------

export default function LibraryLayout() {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const isManageMode = useSelector(selectIsManageMode)
  const selectedIds = useSelector(selectSelectedBookIds)
  const {
    data: books = [],
    isLoading,
    isError,
  } = useGetBooksQuery()
  if (!isLoggedIn) return <EmptyLibraryGuestMessage />

  return (
     <Container>
      <LibraryToolbar />

      {isLoading && <LoadingSpinner />}

      {isError && <p>loading error.</p>}

      {!isLoading && !isError && (
       
        <BooksManagementController books={books} />
      )}
      {isManageMode && selectedIds.length > 0 && (
        <BooksManagementToolbar selectedBooks={selectedIds} />
      )}
    </Container>
  )
}
