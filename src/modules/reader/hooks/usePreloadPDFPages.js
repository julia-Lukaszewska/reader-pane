import { useEffect, useRef, useCallback, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { preloadByScale } from '@reader/utils'
import shouldPreload from '@reader/utils/shouldPreload'
import { selectActiveBookId, selectBookStaticById } from '@/store/selectors'
import {
  selectCurrentPage,
  selectCurrentScale,
  selectPageViewMode,
} from '@/store/selectors'

const EMPTY_PAGES = {}
const EMPTY_RANGES = []

const usePreloadPDFPages = () => {
  const dispatch = useDispatch()
  const pdfRef = useRef(null)
  const loadingRef = useRef(false)
  const [pdfReady, setPdfReady] = useState(false)

  const bookId = useSelector(selectActiveBookId)
  const currentPage = useSelector(selectCurrentPage)
  const scale = useSelector(selectCurrentScale) ?? 1.0
  const viewMode = useSelector(selectPageViewMode)

  const staticBook = useSelector(selectBookStaticById(bookId))
  const totalPages = staticBook?.meta?.totalPages ?? 0

  const renderedPages = useSelector(
    (s) => s.pdfCache[bookId]?.[String(scale)]?.pages ?? EMPTY_PAGES
  )
  const renderedRanges = useSelector(
    (s) => s.pdfCache[bookId]?.[String(scale)]?.ranges ?? EMPTY_RANGES
  )

  const preload = useCallback(() => {
    console.log('[usePreloadPDFPages]  preload() called', {
      bookId,
      currentPage,
      scale,
      ranges: renderedRanges
    })
    if (
      !pdfRef.current ||
      loadingRef.current ||
      !bookId ||
      !Number.isInteger(currentPage)
    ) {
      console.log('[usePreloadPDFPages]  preload() → guard failed')
      return Promise.resolve()
    }
    return preloadByScale({
      pdf: pdfRef.current,
      scale,
      currentPage,
      renderedPages,
      renderedRanges,
      bookId,
      dispatch,
      loadingRef,
    })
  }, [bookId, currentPage, scale, renderedPages, renderedRanges, dispatch])

  // Log totalPages once on change
  useEffect(() => {
    console.log('[usePreloadPDFPages]  totalPages:', totalPages)
  }, [totalPages])

  // Log all input state (bookId, currentPage, scale, ranges, pdfReady)
  useEffect(() => {
    console.log('[usePreloadPDFPages]  useEffect fired', {
      pdfReady,
      bookId,
      currentPage,
      scale,
      totalPages,
      ranges: renderedRanges
    })
    const should = pdfReady && totalPages > 0 && shouldPreload(currentPage, renderedRanges, totalPages)
    console.log('[usePreloadPDFPages] Should preload?', should)
    if (should) {
      preload()
    }
  }, [pdfReady, currentPage, renderedRanges, preload, totalPages, bookId, scale])

  const visiblePageNumbers = useMemo(
    () =>
      viewMode === 'double'
        ? [currentPage, Math.min(currentPage + 1, totalPages)]
        : [currentPage],
    [currentPage, totalPages, viewMode]
  )

  const visiblePages = useMemo(
    () => {
      const arr = visiblePageNumbers
        .map((num) => ({ pageNumber: num, ...renderedPages[num] }))
        .filter((p) => p.dataUrl)
      console.log('[usePreloadPDFPages]  visiblePages:', arr.map(p => p.pageNumber))
      return arr
    },
    [visiblePageNumbers, renderedPages]
  )

  return { pdfRef, preload, visiblePages, setPdfReady }
}

export default usePreloadPDFPages
