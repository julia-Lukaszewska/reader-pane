// src/hooks/useVisiblePages.js

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setVisiblePages } from '@/store/slices/streamSlice'

/**
 * useVisiblePages
 * --------------------------
 * Hook that observes scroll position inside the container,
 * calculates which PDF pages are currently visible,
 * and updates Redux state with the visible page numbers.
 *
 * @param {React.RefObject<HTMLElement>} containerRef - Reference to the scrollable container (usually <div> holding pages)
 * @param {number} pageHeight - Height of a single page at scale = 1
 * @param {number} [bufferPages=2] - Number of extra pages above/below viewport to include as buffer
 */
export default function useVisiblePages(
  containerRef,
  pageHeight
) {
  const dispatch = useDispatch()
  const scale = useSelector((s) => s.stream.scale)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onScroll = () => {
      const { scrollTop, clientHeight } = el
      const pageH = pageHeight * scale

      // Estimate visible page range with buffer
          const firstVisible = Math.max(1, Math.floor(scrollTop / pageH) + 1)
      const lastVisible = Math.floor((scrollTop + clientHeight - 1) / pageH) + 1

      const newVisible = []
for (let p = firstVisible; p <= lastVisible; p++) newVisible.push(p)
  console.log('[ VisiblePages] setVisiblePages', newVisible)
      // Update Redux with new visible page numbers
      dispatch(setVisiblePages(newVisible))
    }

    onScroll() // initial run
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [containerRef, pageHeight,  scale])
}
