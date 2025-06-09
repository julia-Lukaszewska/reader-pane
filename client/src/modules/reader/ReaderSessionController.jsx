/**
 * @file ReaderSessionController.jsx
 * @description
 * Controller component for the PDF reader session.
 * - Restores the last opened book if no `bookId` in URL.
 * - Synchronizes the route `:bookId` parameter with Redux state.
 * - Initializes the starting page based on saved progress.
 * - Renders a fallback screen when no `bookId` is provided.
 */

import React, { useEffect } from 'react'
import { useParams, Outlet, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import useLastOpenedBook from './hooks/useLastOpenedBook'
import useStartingPage   from './hooks/useStartingPage'
import { setActiveBookId } from '@/store/slices/bookSlice'
import { selectActiveBookId } from '@/store/selectors/selectors'

import FallbackScreen from '@/components/common/FallbackScreen'

//-----------------------------------------------------------------------------
// Component: ReaderSessionController
//-----------------------------------------------------------------------------

/**
 * Manages the reader session lifecycle and routing:
 * 1. Restores last opened book if no route parameter is present.
 * 2. Syncs the `bookId` URL param into Redux state.
 * 3. Loads saved progress as the starting page.
 * 4. Shows fallback UI when no `bookId` in URL.
 *
 * @returns {JSX.Element}
 */
export default function ReaderSessionController() {
  const { bookId: routeId } = useParams()
  const dispatch = useDispatch()
  const activeBookId = useSelector(selectActiveBookId)

  // Always attempt to restore the last opened book on mount
  useLastOpenedBook()

  // Sync the URL `bookId` param into Redux state
  useEffect(() => {
    if (routeId && routeId !== activeBookId) {
      dispatch(setActiveBookId(routeId))
    }
  }, [routeId, activeBookId, dispatch])

  // Initialize the starting page based on saved progress
  useStartingPage(routeId ?? activeBookId)

  // If no `bookId` in URL, render fallback screen
  if (!routeId) {
    return <FallbackScreen />
  }

  // Otherwise render nested reader routes (e.g., ReaderView)
  return <Outlet />
}
