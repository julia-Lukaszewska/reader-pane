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

export default function usePageViewMode() {
  const dispatch = useDispatch()

  const currentPage   = useSelector(selectCurrentPage)
  const totalPages    = useSelector(selectTotalPages)
  const scaleIndex    = useSelector(selectScaleIndex)
  const pageViewMode  = useSelector(selectPageViewMode)

  const clamp = (n) => Math.max(1, Math.min(n, totalPages))

  const goTo = useCallback(
    (p) => dispatch(setCurrentPage(clamp(p))),
    [dispatch, totalPages]
  )

  const nextPage = useCallback(() => {
    const step = pageViewMode === 'double' ? 2 : 1
    goTo(currentPage + step)
  }, [goTo, currentPage, pageViewMode])

  const prevPage = useCallback(() => {
    const step = pageViewMode === 'double' ? 2 : 1
    goTo(currentPage - step)
  }, [goTo, currentPage, pageViewMode])

  const goToFirstPage = useCallback(() => goTo(1), [goTo])
  const goToLastPage  = useCallback(() => goTo(totalPages), [goTo, totalPages])

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

  const isFirstPage = currentPage <= 1
  const isLastPage  = currentPage >= totalPages

  return {
    currentPage,
    totalPages,
    scaleIndex,
    pageViewMode,

    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,

    setCurrentPage: goTo,
    setPageViewMode: setMode,
    setScaleIndex: setScale,

    isFirstPage,
    isLastPage,
  }
}
