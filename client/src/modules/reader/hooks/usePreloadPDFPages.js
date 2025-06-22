// src/modules/reader/hooks/usePreloadPDFPages.js

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo, useState, useRef } from 'react'
import {
  selectCurrentPage,
  selectTotalPages,
  selectCurrentScale,
  selectPageViewMode
} from '@/store/selectors/readerSelectors'
import { clampPage } from '@reader/utils/pdfPageNavigation'

import usePageBitmapsCache from './usePageBitmapsCache'
import useAutoPreloadTrigger from './useAutoPreloadTrigger'
import usePreloadController from './usePreloadController'
import useVisibleBitmapPages from './useVisibleBitmapPages'
import useVisiblePageRange from './useVisiblePageRange'

const EMPTY_RENDERED_RANGES = []

/**
 * usePreloadPDFPages
 *
 * Main hook for managing PDF page preloading, caching, and rendering logic.
 *
 * @param {Object} params
 * @param {string} params.bookId

 */
export default function usePreloadPDFPages({ bookId, pdfRef, pdfReady = false }) {
  const dispatch = useDispatch()
  const loadingRef = useRef(false)
  const [version, setVersion] = useState(0)

  // Redux state
  const currentPage = useSelector(selectCurrentPage)
  const totalPages = useSelector(selectTotalPages)
  const scale = useSelector(selectCurrentScale) ?? 1.0
  const viewMode = useSelector(selectPageViewMode)

  const safePage = clampPage(currentPage, totalPages)

  // Pages that should be visible now
  const visiblePageNumbers = useVisiblePageRange({
    currentPage: safePage,
    totalPages,
    viewMode
  })

  // Ranges already rendered, with stable fallback
  const renderedRanges = useSelector(
    useMemo(
      () => state =>
        state.reader.renderedRanges?.[bookId]?.[scale] ?? EMPTY_RENDERED_RANGES,
      [bookId, scale]
    )
  )

  // Fast lookup of rendered pages
  const renderedPagesMap = useMemo(() => {
    const  map = {}
    renderedRanges.forEach(([from, to]) => {
      for (let i = from; i <= to; i++) {
       map[i] = true
      }
    })
    return map
  }, [renderedRanges])

  // Local bitmap cache
  const { pageBitmapsRef, clear: clearCache, update: updateCache } =
    usePageBitmapsCache()

  // Preload controller
  const preload = usePreloadController({
    bookId,
    scale,
    currentPage: safePage,
     pdfRef,
    pdfReady,
    renderedRanges,
    renderedPagesMap,
    updateCache,
    dispatch,
    loadingRef,
    setVersion
  })

  // Clear cache when switching books
  useEffect(() => {
    clearCache()
  }, [bookId, clearCache])

  // Auto-trigger preload on missing pages
  useAutoPreloadTrigger({
    bookId,
    scale,
    currentPage: safePage,
    totalPages,
    renderedRanges,
    pageBitmapsRef,
    preload,
    pdfRef
  })

  // Return only pages with bitmaps
  const visiblePages = useVisibleBitmapPages({
    visiblePageNumbers,
    bookId,
    scale,
    pageBitmapsRef,
    version
  })

  return {
    preload,
    visiblePages,
    pageBitmapsRef,
     loadingRef
  }
}
