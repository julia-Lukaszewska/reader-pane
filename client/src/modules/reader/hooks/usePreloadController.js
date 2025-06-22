import { useCallback, useRef } from "react"
import preloadByScale from "@reader/utils/preloadByScale"
import { getPageRangeKey } from "@reader/utils/pdfPageNavigation"
import { setRenderedRanges } from "@/store/slices/readerSlice"
import { DEFAULT_RANGE_SIZE } from "@reader/utils/pdfConstants"

/**
 * usePreloadController
 *
 * Provides a memoized function that preloads nearby PDF pages using `preloadByScale`.
 * Handles:
 * - caching loaded pages using `updateCache`
 * - dispatching updated rendered ranges to Redux
 * - managing render concurrency and deduplication via `loadingRef`
 *
 * @param {Object} params
 * @param {string} params.bookId - Unique book ID
 * @param {number} params.scale - Current zoom level
 * @param {number} params.currentPage - Currently focused page number
 * @param {React.MutableRefObject} params.pdfRef - Ref to the loaded PDF.js document
 * @param {Array<[number, number]>} params.renderedRanges - Page ranges already stored in Redux
 * @param {Set<number>} params.renderedPagesMap - Quick-access set of already cached page numbers
 * @param {Function} params.updateCache - Local memory cache updater
 * @param {Function} params.dispatch - Redux dispatch function
 * @param {React.MutableRefObject<boolean>} params.loadingRef - Ref to prevent overlapping renders
 * @param {Function} params.setVersion - Function to force re-render on cache update
 *
 * @returns {() => Promise<void>} Preload function
 */
export default function usePreloadController({
  bookId,
  scale,
  currentPage,
  pdfRef,
  renderedRanges,
  renderedPagesMap,
  updateCache,
  dispatch,
  loadingRef,
  setVersion,
}) {
  return useCallback(
    (targetPage = currentPage) => {
      if (
        !pdfRef.current ||
        loadingRef.current ||
        !Number.isInteger(targetPage)
      ) {
        return Promise.resolve()
      }

      return preloadByScale({
        pdf: pdfRef.current,
        scale,
        currentPage: targetPage,
        renderedRanges,
        renderedPages: renderedPagesMap,
        loadingRef,
        concurrency: 2,

        onPages: (pages) => {
          const { rangeKey } = getPageRangeKey(targetPage, DEFAULT_RANGE_SIZE)

          updateCache({
            bookId,
            scale,
            pages,
            rangeKey
          })
          setVersion((v) => v + 1)
        },

        onRange: (range) => {
          dispatch(setRenderedRanges({ bookId, scale, range }))
        },
      })
    },
    [
      bookId,
      scale,
      currentPage,
      pdfRef,
      renderedRanges,
      renderedPagesMap,
      dispatch,
      updateCache,
      loadingRef,
      setVersion,
    ],
  )
}
