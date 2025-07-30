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

  const prev = useRef([])

  const updateVisiblePages = useCallback(() => {
    const el = containerRef.current
    if (!el || !pageHeight || pageHeight === 0) return

    let start, end

    if (mode === 'scroll') {
   
      return
    } else {
      // single / double mode
      const { before, after } = RENDER_OFFSETS[mode]
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
  }, [containerRef, pageHeight, mode, scale, curPage, total, dispatch])

  useEffect(() => {
    if (mode === 'scroll') return 

    updateVisiblePages()
  }, [mode, updateVisiblePages])
}