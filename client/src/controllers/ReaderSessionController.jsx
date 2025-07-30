//-----------------------------------------------------------------------------
// ReaderSessionController – dynamic rangeSize version
//-----------------------------------------------------------------------------
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import useLastOpenedBook    from '@/modules/reader/hooks/useLastOpenedBook'
import useStartingPage      from '@/modules/reader/hooks/useStartingPage'
import usePreloadController from '@/modules/reader/hooks/usePreloadController'
import useVisiblePages      from '@/modules/reader/hooks/useVisiblePages'
import useSaveProgress      from '@/modules/reader/hooks/useSaveProgress'
import useScrollCurrentPage from '@/modules/reader/hooks/useScrollCurrentPage'
import { selectCurrentRange }      from '@/store/selectors/streamSelectors'
import { selectBookById }          from '@/store/selectors'
import {
  selectCurrentPage,

  selectPageViewMode,
} from '@/store/selectors/readerSelectors'
import { setCurrentRange, resetStreamState } from '@/store/slices/streamSlice'

import { CHUNK_SIZE, PAGE_HEIGHT } from '@reader/utils/pdfConstants'
import { getRangeAround }          from '@reader/utils/getRangeAround'

export default function ReaderSessionController({ children, containerRef }) {
  /* --- resolve book ID --------------------------------------------------- */
  const { bookId: routeBookId } = useParams()
  const resolvedBookId = useLastOpenedBook(routeBookId)

  /* --- ensure starting page is set -------------------------------------- */
  const ready = useStartingPage(resolvedBookId)

  /* --- pull dynamic rangeSize from store -------------------------------- */
  const book       = useSelector(selectBookById(resolvedBookId))
  const rangeSize  = book?.file?.rangeSize ?? CHUNK_SIZE   // ← NEW
  const chunkSize  = rangeSize                            // alias for clarity

  /* --- reset stream state when book changes ----------------------------- */
  const dispatch = useDispatch()
  useEffect(() => {
    if (resolvedBookId) dispatch(resetStreamState())
  }, [resolvedBookId, dispatch])

  /* --- track visible pages (scroll / resize) ---------------------------- */
  useVisiblePages(containerRef, PAGE_HEIGHT)
  useScrollCurrentPage(containerRef, PAGE_HEIGHT)
  useSaveProgress()


  /* --- update currentRange in Redux ------------------------------------- */
  const currentRange = useSelector(selectCurrentRange)
 
  const currentPage  = useSelector(selectCurrentPage)

  const mode         = useSelector(selectPageViewMode)

  useEffect(() => {
    if (!ready) return

    if (mode === 'scroll') {
      if (!currentRange) {
        dispatch(setCurrentRange(getRangeAround(currentPage, chunkSize)))
        return
      }

      if (currentPage > currentRange[1]) {
        const start = currentRange[0] + chunkSize
        dispatch(setCurrentRange([start, start + chunkSize - 1]))
      } else if (currentPage < currentRange[0]) {
        const start = Math.max(1, currentRange[0] - chunkSize)
        dispatch(setCurrentRange([start, start + chunkSize - 1]))
      }
    } else {
      const range = getRangeAround(currentPage, chunkSize)
      if (
        !currentRange ||
        currentRange[0] !== range[0] ||
        currentRange[1] !== range[1]
      ) {
        dispatch(setCurrentRange(range))
      }
    }
  }, [ready, mode, currentPage, currentRange, chunkSize, dispatch])

  /* --- trigger preloading of adjacent chunks ---------------------------- */
  usePreloadController()

  if (!ready) return null
  return children({ containerRef })
}
