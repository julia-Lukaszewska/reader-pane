/**
 * @file LibraryToolbarController.jsx
 * @description
 * Side-effect controller for the Library toolbar:
 * - Observes Redux UI state (`libraryFilter`, `libraryViewMode`)
 * - Clears any multi-selection when user switches filter or view mode
 * - Renders nothing; uses Redux only (no React Context)
 */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

//-----------------------------------------------------
//------ Selectors
//-----------------------------------------------------
import {
  selectLibraryFilter,
  selectLibraryViewMode,
} from '@/store/selectors/booksSelectors'

//-----------------------------------------------------
//------ Actions
//-----------------------------------------------------
import { clearSelected } from '@/store/slices/bookSlice'

//-----------------------------------------------------
//------ LibraryToolbarController Component
//-----------------------------------------------------
/**
 * @component LibraryToolbarController
 * @description Invisible controller that clears selection when toolbar options change.
 * @returns {null}
 */
export default function LibraryToolbarController() {
  const dispatch = useDispatch()
  const filter = useSelector(selectLibraryFilter)
  const viewMode = useSelector(selectLibraryViewMode)

  useEffect(() => {
    dispatch(clearSelected())
  }, [filter, viewMode, dispatch])

  return null
}
