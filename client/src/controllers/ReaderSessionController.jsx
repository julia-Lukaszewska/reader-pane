//-----------------------------------------------------------------------------
// ReaderSessionController – lightweight, post-refactor version
//-----------------------------------------------------------------------------
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import useLastOpenedBook    from '@/modules/reader/hooks/useLastOpenedBook'
import useStartingPage      from '@/modules/reader/hooks/useStartingPage'
import usePreloadController from '@/modules/reader/hooks/usePreloadController'
import useVisiblePages      from '@/modules/reader/hooks/useVisiblePages'

import { selectCurrentRange }      from '@/store/selectors/streamSelectors'
import { setCurrentRange, resetStreamState } from '@/store/slices/streamSlice'
import {
  selectCurrentPage,
  selectPageViewMode,
} from '@/store/selectors/readerSelectors'

import { CHUNK_SIZE, PAGE_HEIGHT } from '@reader/utils/pdfConstants'
import { getRangeAround }          from '@reader/utils/getRangeAround'

export default function ReaderSessionController({ children, containerRef }) {
  /* --- resolve book ID --------------------------------------------------- */
  const { bookId: routeBookId } = useParams()
  const resolvedBookId = useLastOpenedBook(routeBookId)

  /* --- ensure starting page is set -------------------------------------- */
  const ready = useStartingPage(resolvedBookId)

  /* --- reset stream state when book changes ----------------------------- */
  const dispatch = useDispatch()
  useEffect(() => {
    if (resolvedBookId) dispatch(resetStreamState())
  }, [resolvedBookId, dispatch])

  /* --- track visible pages (scroll / resize) ---------------------------- */
  useVisiblePages(containerRef, PAGE_HEIGHT)

  /* --- update currentRange in Redux ------------------------------------- */
  const currentRange = useSelector(selectCurrentRange)
  const visiblePages = useSelector(s => s.stream.visiblePages)
  const currentPage  = useSelector(selectCurrentPage)
  const mode         = useSelector(selectPageViewMode)

  useEffect(() => {
    if (!ready || !visiblePages.length) return

    const pivot = mode === 'scroll'
      ? Math.min(...visiblePages)  // scroll → first visible page
      : currentPage                // single / double → current page

    const range = getRangeAround(pivot, CHUNK_SIZE)

    if (
      !currentRange ||
      currentRange[0] !== range[0] ||
      currentRange[1] !== range[1]
    ) {
      dispatch(setCurrentRange(range))
    }
  }, [ready, visiblePages, currentRange, dispatch, mode, currentPage])

  /* --- trigger preloading of adjacent chunks ---------------------------- */
  usePreloadController()

  if (!ready) return null
  return children({ containerRef })
}
