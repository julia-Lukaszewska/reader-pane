/**
 * @file MyLibraryView.jsx
 * @description Displays non-archived books in the selected view mode.
 */

import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useLibraryFilter } from '@library/hooks'
import {
  selectBooksResult,
  selectIsPreviewOpen,
} from '@/store/selectors'

import LibraryBooksRenderer from '@/modules/library/components/LibraryBooksRenderer/BooksRenderer'
import { LoadingSpinner, ConfirmModal } from '@/components'
import { BookCardPreviewModal } from '@book/BookCardPreviewModal'

/* --------------------------------------------------------------------------- */
/*  STYLED COMPONENTS                                                          */
/* --------------------------------------------------------------------------- */

const Container = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  flex-direction: column;
  overflow-y: scroll;
`

/* --------------------------------------------------------------------------- */
/*  COMPONENT: MY LIBRARY VIEW                                                 */
/* --------------------------------------------------------------------------- */

const MyLibraryView = () => {
  
  useLibraryFilter('all')
  const status = useSelector(selectBooksResult).status
  const isOpen = useSelector(selectIsPreviewOpen)

  if (status === 'pending' || status === 'uninitialized') {
    return <LoadingSpinner />
  }
  if (status === 'rejected') {
    return <div>Error loading books.</div>
  }

  return (
    <Container>
      <LibraryBooksRenderer hideAddTile={false} />

      {isOpen && <BookCardPreviewModal />}

      <ConfirmModal />
    </Container>
  )
}

export default MyLibraryView