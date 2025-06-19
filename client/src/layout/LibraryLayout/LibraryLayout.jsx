/**
 * @file LibraryLayout.jsx
 * @description
 * Pure layout wrapper for the Library section.
 * Responsibilities:
 *  – Mounts logic controllers (`LibraryController`, `LibraryToolbarController`)
 *  – Renders the main toolbar and nested routes
 *  – Shows bulk-action toolbar when selection is active
 *  – Displays a guest message if the user is not authenticated
 */

import React from 'react'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

/* -----------------------------  CONTROLLERS  ----------------------------- */
import LibraryController from '@/controllers/LibraryController'
import LibraryToolbarController from '@/controllers/LibraryToolbarController'

/* -----------------------------  SELECTORS   ------------------------------ */
import { selectIsLoggedIn }       from '@/store/selectors/authSelectors'
import { selectIsManageMode,
         selectSelectedBookIds }  from '@/store/selectors'

/* -----------------------------  COMPONENTS  ------------------------------ */
import EmptyLibraryGuestMessage from '@/views/library/EmptyLibraryGuestMessage'
import { LibraryToolbar }         from '@library/Layout'
import { BooksManagementToolbar } from '@library/components/BooksManagement'

/* ------------------------------------------------------------------------- */
/*  STYLED COMPONENTS                                                        */
/* ------------------------------------------------------------------------- */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  background: var(--gradient-blue-clear);
`

/* ------------------------------------------------------------------------- */
/*  COMPONENT                                                                */
/* ------------------------------------------------------------------------- */

export default function LibraryLayout() {
  const isLoggedIn   = useSelector(selectIsLoggedIn)
  const isManageMode = useSelector(selectIsManageMode)
  const selectedIds  = useSelector(selectSelectedBookIds)


  if (!isLoggedIn) return <EmptyLibraryGuestMessage />

  return (
    <Container>
      {/* Logic controllers (no UI) */}
      <LibraryController />
      <LibraryToolbarController />

      {/* Main toolbar and nested views */}
      <LibraryToolbar />
      <Outlet />

      {/* Bulk-action toolbar (visible only when managing and any book selected) */}
      {isManageMode && selectedIds.length > 0 && <BooksManagementToolbar />}
    </Container>
  )
}
