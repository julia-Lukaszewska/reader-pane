/**
 * @file LibraryToolbarController.jsx
 * @description
 * Side‑effect controller for the Library toolbar.
 * – Observes Redux UI state (`libraryFilter`, `libraryViewMode`).
 * – Clears any multi‑selection when user switches filter or view mode.
 * – Nothing is rendered; no React Context is used (Redux only).
 */

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

/* ----------------------------- SELECTORS --------------------------------- */
import {
  selectLibraryFilter,
  selectLibraryViewMode,
} from '@/store/selectors/booksSelectors'

/* ----------------------------- ACTIONS ----------------------------------- */
import { clearSelected } from '@/store/slices/bookSlice'

/* ------------------------------------------------------------------------- */
/*  COMPONENT                                                                */
/* ------------------------------------------------------------------------- */

export default function LibraryToolbarController() {
  const dispatch   = useDispatch()
  const filter     = useSelector(selectLibraryFilter)   // 'all' | 'archive' | 'favorites'
  const viewMode   = useSelector(selectLibraryViewMode) // 'grid' | 'list' | 'table'

  // Clear selection whenever user changes filter or view mode
  useEffect(() => {
    dispatch(clearSelected())
  }, [filter, viewMode, dispatch])

  return null // Invisible controller, purely side‑effects
}
