//-----------------------------------------------------------------------------
// Hook: useVisiblePages  – unified for scroll / single / double (optimized)
//-----------------------------------------------------------------------------
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setVisiblePages } from '@/store/slices/streamSlice'
import {
  selectPageViewMode,
  selectCurrentPage,
  selectTotalPages,
} from '@/store/selectors/readerSelectors'
import { selectStreamScale } from '@/store/selectors/streamSelectors'
import { RENDER_OFFSETS } from '@reader/utils/pdfConstants'

export default function useVisiblePages(containerRef, pageHeight) {
  const dispatch = useDispatch()
  const mode     = useSelector(selectPageViewMode)
  const scale    = useSelector(selectStreamScale)
  const curPage  = useSelector(selectCurrentPage)
  const total    = useSelector(selectTotalPages)

  const prev = useRef([])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const { before, after } = RENDER_OFFSETS[mode]

    const calcPages = () => {
      if (mode === 'scroll') {
        const { scrollTop, clientHeight } = el
        const pageH = pageHeight * scale
        const firstVis = Math.floor(scrollTop / pageH) + 1
        const lastVis  = Math.floor((scrollTop + clientHeight - 1) / pageH) + 1

        const start = Math.max(1, firstVis - before)
        const end   = Math.min(total, lastVis + after)

        const arr = []
        for (let p = start; p <= end; p++) arr.push(p)
        return arr
      }

      const step  = mode === 'double' ? 2 : 1
      const last  = Math.min(total, curPage + (step - 1))
      const start = Math.max(1, curPage - before)
      const end   = Math.min(total, last + after)

      const arr = []
      for (let p = start; p <= end; p++) arr.push(p)
      return arr
    }

    const update = () => {
      const list = calcPages()
      const prevList = prev.current
      const changed =
        list.length !== prevList.length || list.some((v, i) => v !== prevList[i])
      if (!changed) return

      prev.current = list
      dispatch(setVisiblePages(list))
    }

    update()

    if (mode !== 'scroll') return
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        update()
      })
    }
    el.addEventListener('scroll', onScroll)

    return () => el.removeEventListener('scroll', onScroll)
  }, [containerRef, pageHeight, mode, scale, curPage, total, dispatch])
}
