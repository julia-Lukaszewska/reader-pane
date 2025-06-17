/**
 * @file usePreloadPDFPages.js
 * @description
 * Manages smart preloading and bitmap caching of PDF pages based on current scale and page.
 * Caches rendered pages and maintains up to 3 ranges in memory.
 */

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

//-----------------------------------------------------------------------------
// Constants
//-----------------------------------------------------------------------------

const RANGE_SIZE = 9

function getRangeKey(page) {
  const start = Math.floor((page - 1) / RANGE_SIZE) * RANGE_SIZE + 1
  return `${start}-${start + RANGE_SIZE - 1}`
}

//-----------------------------------------------------------------------------
// Hook: usePreloadPDFPages
//-----------------------------------------------------------------------------

/**
 * Hook that preloads and caches PDF pages into memory.
 *
 * @param {Object} params
 * @param {string} params.bookId – Book identifier
 * @param {React.MutableRefObject} params.pdfRef – Ref to PDF document
 *
 * @returns {{
 *   preload: () => Promise<void>,
 *   visiblePages: Array<Object>,
 *   cacheRef: React.MutableRefObject
 * }}
 */
export default function usePreloadPDFPages({ bookId, pdfRef }) {
  const dispatch = useDispatch()

  const cacheRef = useRef({
    pages: new Map(),   // `${bookId}-${scale}-${page}` => bitmap
    ranges: new Map(),  // `rangeKey` => true
  })

  const loadingRef = useRef(false)
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

  const renderedPagesMap = useMemo(() => {
    const map = {}
    renderedRanges.forEach(([from, to]) => {
      for (let i = from; i <= to; i++) {
        map[i] = true
      }
    })
    return map
  }, [renderedRanges])

  const preload = useCallback(() => {
    if (!pdfRef.current || loadingRef.current || !Number.isInteger(validCurrentPage)) {
      return Promise.resolve()
    }

    return preloadByScale({
      pdf: pdfRef.current,
      scale,
      currentPage: validCurrentPage,
      renderedRanges,
      renderedPages: renderedPagesMap,
      loadingRef,
      concurrency: 2,

      onPages: (pages) => {
        Object.entries(pages).forEach(([pageNum, data]) => {
          const pageKey = `${bookId}-${scale}-${pageNum}`
          const rangeKey = getRangeKey(Number(pageNum))

          cacheRef.current.pages.set(pageKey, data)
          cacheRef.current.ranges.set(rangeKey, true)
        })

        // Keep only last 3 ranges
        const rangeKeys = Array.from(cacheRef.current.ranges.keys())
        if (rangeKeys.length > 3) {
          const toDelete = rangeKeys.slice(0, rangeKeys.length - 3)
          toDelete.forEach(rangeKey => {
            const [start, end] = rangeKey.split('-').map(Number)
            for (let p = start; p <= end; p++) {
              const k = `${bookId}-${scale}-${p}`
              cacheRef.current.pages.delete(k)
            }
            cacheRef.current.ranges.delete(rangeKey)
          })
        }

        setVersion(v => v + 1)
      },

      onRange: (range) => {
        dispatch(setRenderedRanges({ bookId, scale, range }))
      },
    })
  }, [bookId, scale, validCurrentPage, pdfRef, renderedRanges, renderedPagesMap, dispatch])

  useEffect(() => {
    cacheRef.current.pages.clear()
    cacheRef.current.ranges.clear()
  }, [bookId])

  useEffect(() => {
    if (!pdfRef.current) return

    const half = Math.floor(RANGE_SIZE / 2)
    const start = Math.max(1, validCurrentPage - half)
    const end = Math.min(safeTotalPages, validCurrentPage + half)

    const isRangeCached = renderedRanges.some(([a, b]) => start >= a && end <= b)

    const missingPages = []
    for (let p = start; p <= end; p++) {
      const key = `${bookId}-${scale}-${p}`
      if (!cacheRef.current.pages.has(key)) missingPages.push(p)
    }

    if (!isRangeCached || missingPages.length > 0) {
      console.log('[ preload()]', {
        reason: !isRangeCached ? 'range not cached' : 'bitmap(s) missing',
        missingPages,
      })

      let abortFn
      preload()?.then(fn => { abortFn = fn })

      return () => {
        if (abortFn) abortFn()
      }
    } else {
      console.log('[ Skip preload – all bitmaps cached]')
    }
  }, [validCurrentPage, preload, renderedRanges, safeTotalPages, scale])

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
        const data = cacheRef.current.pages.get(key)
        return data ? { pageNumber: num, ...data } : null
      })
      .filter(Boolean),
    [visiblePageNumbers, bookId, scale, version]
  )

  return {
    preload,
    visiblePages,
    cacheRef,
  }
}
