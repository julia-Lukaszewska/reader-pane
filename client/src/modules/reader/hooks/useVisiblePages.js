//-----------------------------------------------------------------------------
// Hook: useVisiblePages – Refactored and patched
//-----------------------------------------------------------------------------
import { useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setVisiblePages } from '@/store/slices/streamSlice'
import { setCurrentPage } from '@/store/slices/readerSlice'
import {
  selectPageViewMode,
  selectCurrentPage,
  selectTotalPages,
} from '@/store/selectors/readerSelectors'
import {
  selectStreamScale,
  selectCurrentRange,
} from '@/store/selectors/streamSelectors'
import { RENDER_OFFSETS } from '@reader/utils/pdfConstants'

/**
 * Helper: generates a page range
 */
const generatePageArray = (start, end) => {
  if (start > end) return []
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

export default function useVisiblePages(containerRef, pageHeight) {
  const dispatch = useDispatch()
    const mode = useSelector(selectPageViewMode)
  const scale = useSelector(selectStreamScale)
  const curPage = useSelector(selectCurrentPage)
  const total = useSelector(selectTotalPages)
  const range = useSelector(selectCurrentRange)

  const prev = useRef([])
   const initializedRef = useRef(false)
  const updateVisiblePages = useCallback(() => {
      const el = containerRef.current
    if (!el) return

    const { before, after } = RENDER_OFFSETS[mode]
    let start, end

   if (mode === 'scroll') {
   const active = range || [curPage, curPage]
      start = Math.max(1, active[0] - before)
      end = Math.min(total, active[1] + after)
    } else {
      const step = mode === 'double' ? 2 : 1
      const last = Math.min(total, curPage + (step - 1))

      start = Math.max(1, curPage - before)
      end = Math.min(total, last + after)

    }

    const list = generatePageArray(start, end)
    const prevList = prev.current

    const changed =
      list.length !== prevList.length || list.some((v, i) => v !== prevList[i])

    if (!changed) return

    prev.current = list
    dispatch(setVisiblePages(list))
  }, [containerRef, pageHeight, mode, scale, curPage, total, range, dispatch])

  useEffect(() => {
    updateVisiblePages()
  }, [updateVisiblePages])
}
