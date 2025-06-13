/**
 * @file usePreloadPDFPages.js
 * @description Hook that manages PDF preloading logic per book, scale and current page.
 * It ensures that only the necessary pages are rendered and memoizes visible pages for display.
 */

import { useEffect, useRef, useCallback, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { preloadByScale } from '@reader/utils'
import shouldPreload from '@reader/utils/shouldPreload'

import {
  selectActiveBookId,
  selectBookStaticById,
  selectCurrentPageById,
  selectCurrentScale,
  selectPageViewMode,
} from '@/store/selectors'

const EMPTY_PAGES = {}
const EMPTY_RANGES = []

//-----------------------------------------------------------------------------
// Hook: usePreloadPDFPages
//-----------------------------------------------------------------------------

/**
 * Handles preloading and rendering PDF pages for a specific book, view mode, and zoom scale.
 * Uses redux state (bookId, currentPage, scale) and pdf.js reference to decide what to render.
 *
 * @returns {Object} Hook state: pdfRef, preload(), visiblePages[], setPdfReady()
 */
const usePreloadPDFPages = () => {
  const dispatch = useDispatch()

  //--- Refs
  const pdfRef = useRef(null)
  const loadingRef = useRef(false)

  //--- Local state
  const [pdfReady, setPdfReady] = useState(false)

  //--- Global state
  const bookId = useSelector(selectActiveBookId)

  const selectStaticBook = useMemo(
    () => selectBookStaticById(bookId),
    [bookId]
  )
  const staticBook = useSelector(selectStaticBook)
  const totalPages = staticBook?.meta?.totalPages ?? 0

  const currentPage = useSelector(state =>
    selectCurrentPageById(state, bookId)
  )
  const scale = useSelector(selectCurrentScale) ?? 1.0
  const viewMode = useSelector(selectPageViewMode)

  const renderedPages = useSelector(
    s => s.pdfCache[bookId]?.[String(scale)]?.pages ?? EMPTY_PAGES
  )
  const renderedRanges = useSelector(
    s => s.pdfCache[bookId]?.[String(scale)]?.ranges ?? EMPTY_RANGES
  )

  const validCurrentPage = Math.min(currentPage, totalPages)

  //-----------------------------------------------------------------------------
  // Effect: mount/unmount cleanup
  //-----------------------------------------------------------------------------
  useEffect(() => {
    console.log('[usePreloadPDFPages] mounted')
    return () => {
      console.log('[usePreloadPDFPages] cleanup on unmount')
      pdfRef.current = null
      loadingRef.current = false
    }
  }, [])

  //-----------------------------------------------------------------------------
  // Function: preload()
  //-----------------------------------------------------------------------------
  const preload = useCallback(() => {
    console.log('[usePreloadPDFPages] preload() called, pdfRef.current exists:', !!pdfRef.current)

    if (
      !pdfRef.current ||
      loadingRef.current ||
      !bookId ||
      !Number.isInteger(validCurrentPage)
    ) {
      console.log('[usePreloadPDFPages] preload() guard failed', {
        pdfLoaded: !!pdfRef.current,
        loading: loadingRef.current,
        bookId,
        currentPage: validCurrentPage,
      })
      return Promise.resolve()
    }

    return preloadByScale({
      pdf: pdfRef.current,
      scale,
      currentPage: validCurrentPage,
      renderedPages,
      renderedRanges,
      bookId,
      dispatch,
      loadingRef,
    }).then(() => {
      console.log('[usePreloadPDFPages] preloadByScale completed')
    })
  }, [bookId, validCurrentPage, scale, renderedPages, renderedRanges, dispatch])

  //-----------------------------------------------------------------------------
  // Debug logs – state changes
  //-----------------------------------------------------------------------------
  useEffect(() => { console.log('[STATE CHANGE] currentPage:', currentPage) }, [currentPage])
  useEffect(() => { console.log('[STATE CHANGE] totalPages:', totalPages) }, [totalPages])
  useEffect(() => { console.log('[STATE CHANGE] scale:', scale) }, [scale])
  useEffect(() => { console.log('[STATE CHANGE] pdfReady:', pdfReady) }, [pdfReady])
  useEffect(() => { console.log('[STATE CHANGE] renderedRanges:', renderedRanges) }, [renderedRanges])
  useEffect(() => { console.log('[STATE CHANGE] renderedPages:', renderedPages) }, [renderedPages])
  useEffect(() => { console.log('[STATE CHANGE] bookId:', bookId) }, [bookId])
  useEffect(() => { console.log('[STATE CHANGE] viewMode:', viewMode) }, [viewMode])

  //-----------------------------------------------------------------------------
  // Effect: trigger preload when appropriate
  //-----------------------------------------------------------------------------
  useEffect(() => {
      const safeTotal = totalPages || Number.MAX_SAFE_INTEGER      

  const should = pdfReady &&
    shouldPreload(validCurrentPage, renderedRanges, safeTotal) 

    console.log('[usePreloadPDFPages] useEffect fired', {
      pdfReady,
      currentPage: validCurrentPage,
      scale,
      totalPages,
      renderedRanges,
      should,
    })

    if (should) preload()
  }, [pdfReady, validCurrentPage, renderedRanges, preload, totalPages, bookId, scale])

  //-----------------------------------------------------------------------------
  // Compute visible pages based on viewMode
  //-----------------------------------------------------------------------------
  const visiblePageNumbers = useMemo(() => {
    if (viewMode === 'double') {
      const nextPage = validCurrentPage + 1
      return validCurrentPage >= totalPages
        ? [validCurrentPage]
        : [validCurrentPage, Math.min(nextPage, totalPages)]
    }
    return [validCurrentPage]
  }, [validCurrentPage, totalPages, viewMode])

  const visiblePages = useMemo(() => {
    const arr = Array.from(new Set(visiblePageNumbers))
      .map(num => ({ pageNumber: num, ...renderedPages[num] }))
      .filter(p => p.dataUrl)

    console.log('[usePreloadPDFPages] visiblePages:', arr.map(p => p.pageNumber))
    return arr
  }, [visiblePageNumbers, renderedPages])

  return { pdfRef, preload, visiblePages, setPdfReady }
}

export default usePreloadPDFPages
