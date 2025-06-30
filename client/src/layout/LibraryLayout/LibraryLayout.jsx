/**
 * @file src/layout/LibraryLayout.jsx
 * @description
 * Pure layout wrapper for the Library section.
 *
 * Responsibilities:
 * - Mounts logic controllers (`LibraryController`, `LibraryToolbarController`)
 * - Renders the main toolbar (`LibraryToolbar`) and nested route views (`<Outlet />`)
 * - Displays bulk-action toolbar when manage mode is active and books are selected
 * - Shows guest message if user is not authenticated
 *
 * UI role:
 * - This is a visual-only container; all state logic is delegated to controllers
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import LibraryController from '@/controllers/LibraryController'
import LibraryToolbarController from '@/controllers/LibraryToolbarController'

import { selectIsLoggedIn } from '@/store/selectors/authSelectors'
import {
  selectIsManageMode,
  selectSelectedBookIds
} from '@/store/selectors'

import EmptyLibraryGuestMessage from '@/views/library/EmptyLibraryGuestMessage'
import { LibraryToolbar } from '@library/Layout'
import { BooksManagementToolbar } from '@library/components/BooksManagement'

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  background: var(--library-bg-01);
`

//-----------------------------------------------------------------------------
// Component: LibraryLayout
//-----------------------------------------------------------------------------
/**
 * Wraps the library view UI and logic.
 */
export default function LibraryLayout() {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const isManageMode = useSelector(selectIsManageMode)
  const selectedIds = useSelector(selectSelectedBookIds)

  if (!isLoggedIn) return <EmptyLibraryGuestMessage />

  return (
    <Container>
      {/* Logic controllers (no UI) */}
      <LibraryController />
      <LibraryToolbarController />

      {/* Toolbar and nested route views */}
      <LibraryToolbar />
      <Outlet />

      {/* Bulk actions */}
      {isManageMode && <BooksManagementToolbar />}
    </Container>
  )
}
