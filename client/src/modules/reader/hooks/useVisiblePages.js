/**
 * @file src/modules/reader/hooks/useVisiblePages.js
 * @description
 * Hook for tracking which PDF pages are visible in a scrollable container.
 * Emits an array of visible page numbers (with buffer) to Redux streamSlice.
 * 
 * - Works only in scroll mode
 * - Automatically adjusts for zoom (scale)
 * - Emits updates only if the visible range changes
 * 
 * Buffer configuration (from PRELOAD_OFFSETS):
 * - scroll mode: ±6 pages
 * - single-page view: ±4 pages
 * - double-page view: ±6 pages
 */

//-----------------------------------------------
// Imports
//-----------------------------------------------
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setVisiblePages } from '@/store/slices/streamSlice'
import { PRELOAD_OFFSETS } from '@reader/utils/pdfConstants'

//---------------------------------------------
// Hook: useVisiblePages
//-------------------------------------------------
/**
 * Tracks visible page numbers in a scrolling container and dispatches to Redux.
 *
 * @param {React.RefObject} containerRef - Ref to the scrolling container element
 * @param {number} pageHeight - Original height of a single PDF page (before scaling)
 */
export default function useVisiblePages(containerRef, pageHeight) {
  const dispatch = useDispatch()
  const scale = useSelector(s => s.stream.scale)
  const mode = useSelector(s => s.reader.pageViewMode)
  const current = useSelector(s => s.reader.currentPage)
  const total = useSelector(s => s.reader.totalPages)
  const prevRef = useRef([])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const { before, after } = PRELOAD_OFFSETS[mode]

    /**
     * Computes visible pages with buffer based on scroll position and zoom scale.
     * 
     * @returns {number[]} Array of visible page numbers
     */
    const calcVisible = () => {

      if (mode === 'scroll') {
        const { scrollTop, clientHeight } = el
        const pageH = pageHeight * scale
        const first = Math.max(1, Math.floor(scrollTop / pageH) + 1 - before)
        const last = Math.floor((scrollTop + clientHeight - 1) / pageH) + 1 + after
        const arr = []
        for (let p = first; p <= last; p++) arr.push(p)
        return arr
      }

      const start = Math.max(1, current - before)
      let end = Math.min(total, current + after)
      if (mode === 'double') end = Math.min(total, end + 1)

      const arr = []
for (let p = start; p <= end; p++) arr.push(p)
      return arr
    }

   if (mode === 'scroll') {
      let ticking = false
      const onScroll = () => {
        if (ticking) return
        ticking = true
        requestAnimationFrame(() => {
          ticking = false
          const visible = calcVisible()
          const prev = prevRef.current
          if (
            visible.length !== prev.length ||
            visible.some((v, i) => v !== prev[i])
          ) {
            prevRef.current = visible
            dispatch(setVisiblePages(visible))
          }
        })
      }

      onScroll()
      el.addEventListener('scroll', onScroll)
      return () => el.removeEventListener('scroll', onScroll)
 }

    const visible = calcVisible()
    const prev = prevRef.current
    if (
      visible.length !== prev.length ||
      visible.some((v, i) => v !== prev[i])
    ) {
      prevRef.current = visible
      dispatch(setVisiblePages(visible))
    }
  }, [containerRef, pageHeight, scale, mode, current, total, dispatch])
}
