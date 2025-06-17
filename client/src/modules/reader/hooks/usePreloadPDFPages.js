import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { preloadByScale } from '@reader/utils'
import { setRenderedRanges } from '@/store/slices/readerSlice'
import {
  selectCurrentPage,
  selectTotalPages,
  selectCurrentScale,
  selectPageViewMode,
  makeSelectRenderedRanges,
} from '@/store/selectors/readerSelectors'

export default function usePreloadPDFPages({ bookId, pdfRef }) {
  const dispatch = useDispatch()
  const loadingRef = useRef(false)
  const cacheRef = useRef(new Map())
  const [version, setVersion] = useState(0) 
  const currentPage = useSelector(selectCurrentPage)
  const totalPages = useSelector(selectTotalPages)
  const scale = useSelector(selectCurrentScale) ?? 1.0
  const viewMode = useSelector(selectPageViewMode)

  const safeCurrentPage = Number.isInteger(currentPage) ? currentPage : 1
  const safeTotalPages = Number.isInteger(totalPages) ? totalPages : 1
  const validCurrentPage = Math.max(1, Math.min(safeCurrentPage, safeTotalPages))

  const renderedRanges = useSelector(
    useMemo(() => makeSelectRenderedRanges(bookId, scale), [bookId, scale])
  )

  const preload = useCallback(() => {
    if (!pdfRef.current || loadingRef.current || !Number.isInteger(validCurrentPage)) {
      return Promise.resolve()
    }

    return preloadByScale({
      pdf: pdfRef.current,
      scale,
      currentPage: validCurrentPage,
      renderedPages: {}, // local only
      renderedRanges,
      loadingRef,
      concurrency: 2,

      onPages: (pages) => {
        console.log('[✅ onPages]', pages)
        Object.entries(pages).forEach(([pageNum, data]) => {
          const key = `${bookId}-${scale}-${pageNum}`
          cacheRef.current.set(key, data)
        })
        setVersion(v => v + 1)   
      },
      onRange: (range) => {
        dispatch(setRenderedRanges({ bookId, scale, range }))
      },
    })
  }, [bookId, scale, validCurrentPage, pdfRef, renderedRanges, dispatch])

  useEffect(() => {
    if (!pdfRef.current) return

    const rangeSize = 15
    const half = Math.floor(rangeSize / 2)
    const start = Math.max(1, validCurrentPage - half)
    const end = Math.min(safeTotalPages, validCurrentPage + half)

    const isCached = renderedRanges.some(([a, b]) => start >= a && end <= b)
     preload()
  }, [validCurrentPage, preload, renderedRanges, safeTotalPages])

  const visiblePageNumbers = useMemo(() => {
    if (viewMode === 'double') {
      const next = validCurrentPage + 1
      return validCurrentPage >= safeTotalPages
        ? [validCurrentPage]
        : [validCurrentPage, Math.min(next, safeTotalPages)]
    }
    return [validCurrentPage]
  }, [validCurrentPage, safeTotalPages, viewMode])

  const visiblePages = useMemo(() =>
    visiblePageNumbers
      .map(num => {
        const key = `${bookId}-${scale}-${num}`
        const data = cacheRef.current.get(key)
        return data ? { pageNumber: num, ...data } : null
      })
      .filter(Boolean),
    [visiblePageNumbers, bookId, scale, version])

  return {
    preload,
    visiblePages,
    cacheRef,
  }
}
