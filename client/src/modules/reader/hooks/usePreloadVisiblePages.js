/**
 * @file usePreloadVisiblePages.js
 * @description
 * Manages smart preloading and bitmap caching of PDF pages based on current scale and page.
 * Caches rendered pages and maintains up to 3 ranges in memory.
 */

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { preloadByScale } from '@reader/utils'
import { setRenderedRanges } from '@/store/slices/readerSlice'
import { store } from '@/store'

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
export default function usePreloadVisiblePages({
  bookId,
  pdfRef,
  visiblePageNumbers = [],
  scale = 1.0,
  dispatchRenderedRange = true,
}) {

  const cacheRef = useRef({
    pages: new Map(),   // `${bookId}-${scale}-${page}` => bitmap
    ranges: new Map(),  // `rangeKey` => true
  })

  const loadingRef = useRef(false)
  const [version, setVersion] = useState(0)

  const renderedRanges = useMemo(() => {
    return Array.from(cacheRef.current.ranges.keys()).map(key =>
      key.split('-').map(Number)
    )
  }, [version])

  const renderedPagesMap = useMemo(() => {
    const map = {}
    cacheRef.current.pages.forEach((_, key) => {
      const num = Number(key.split('-').pop())
      map[num] = true
    })
    return map
  }, [version])

  const preload = useCallback(() => {
    const currentPage = visiblePageNumbers?.[0]
    if (!pdfRef.current || loadingRef.current || !Number.isInteger(currentPage)) {
      return Promise.resolve()
    }

    return preloadByScale({
      pdf: pdfRef.current,
      scale,
      currentPage,
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
        if (dispatchRenderedRange) {
          store.dispatch(setRenderedRanges({ bookId, scale, range }))
        }
      },
    })
  }, [bookId, scale, pdfRef, renderedRanges, renderedPagesMap, visiblePageNumbers, dispatchRenderedRange])

  useEffect(() => {
    cacheRef.current.pages.clear()
    cacheRef.current.ranges.clear()
  }, [bookId])

  useEffect(() => {
    if (!pdfRef.current) return

    const isRangeCached = renderedRanges.some(([a, b]) =>
      visiblePageNumbers.every(p => p >= a && p <= b)
    )

    const missingPages = visiblePageNumbers.filter(p => {
      const key = `${bookId}-${scale}-${p}`
      return !cacheRef.current.pages.has(key)
    })

    if (!isRangeCached || missingPages.length > 0) {
      console.log('[ preload()]', {
        reason: !isRangeCached ? 'range not cached' : 'bitmap(s) missing',
        missingPages,
      })

      let abortFn
      preload()?.then(fn => {
        abortFn = fn
      })

      return () => {
        if (abortFn) abortFn()
      }
    } else {
      console.log('[ Skip preload – all bitmaps cached]')
    }
  }, [visiblePageNumbers, preload, renderedRanges, scale])

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