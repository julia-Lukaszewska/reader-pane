/**
 * @file src/hooks/usePageViewMode.js
 * @description
 * Hook for managing page navigation and view mode in the PDF reader.
 *
 * Provides:
 * - State: currentPage, totalPages, scaleIndex, pageViewMode
 * - Actions: nextPage, prevPage (1 or 2 steps depending on mode)
 * - Setters: setPageViewMode, setScaleIndex, setCurrentPage
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ZOOM_LEVELS } from '@reader/utils/pdfConstants'

import {
  setCurrentPage,
  setPageViewMode,
} from '@/store/slices/readerSlice'
import { setScaleIndex } from '@/store/slices/streamSlice'

import {
  selectCurrentPage,
  selectPageViewMode,
  selectTotalPages,
} from '@/store/selectors/readerSelectors'
import { selectScaleIndex } from '@/store/selectors/streamSelectors'

//-----------------------------------------------------------------------------
// Hook: usePageViewMode
//-----------------------------------------------------------------------------
/**
 * Returns a set of values and actions related to PDF page view mode and navigation.
 */
export default function usePageViewMode() {
  const dispatch = useDispatch()

  // State from Redux
  const currentPage = useSelector(selectCurrentPage)
  const totalPages = useSelector(selectTotalPages)
  const scaleIndex = useSelector(selectScaleIndex)
  const pageViewMode = useSelector(selectPageViewMode) // 'single' | 'double' | 'scroll'

  // Helpers
  const clamp = (n) => Math.max(1, Math.min(n, totalPages))
  const step = pageViewMode === 'double' ? 2 : 1

  // Actions
  const goTo = useCallback(
    (p) => dispatch(setCurrentPage(clamp(p))),
    [dispatch, totalPages]
  )

  const nextPage = useCallback(
    () => goTo(currentPage + step),
    [goTo, currentPage, step]
  )

  const prevPage = useCallback(
    () => goTo(currentPage - step),
    [goTo, currentPage, step]
  )

  const setMode = useCallback(
    (mode) => dispatch(setPageViewMode(mode)),
    [dispatch]
  )

  const setScale = useCallback(
    (idx) => {
      const clamped = Math.min(Math.max(0, idx), ZOOM_LEVELS.length - 1)
      dispatch(setScaleIndex(clamped))
    },
    [dispatch]
  )

  // Public API
  return {
    currentPage,
    totalPages,
    scaleIndex,
    pageViewMode,

    nextPage,
    prevPage,

    setCurrentPage: goTo,
    setPageViewMode: setMode,
    setScaleIndex: setScale,
  }
}
