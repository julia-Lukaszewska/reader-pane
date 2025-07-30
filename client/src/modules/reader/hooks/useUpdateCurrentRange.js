import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentRange } from '@/store/slices/streamSlice'
import {
  selectPageViewMode,
  selectTotalPages,
} from '@/store/selectors/readerSelectors'
import { selectStreamScale } from '@/store/selectors/streamSelectors'
import { CHUNK_SIZE } from '@reader/utils/pdfConstants'

export default function useUpdateCurrentRange(containerRef, pageHeight) {
  const dispatch = useDispatch()
  const mode = useSelector(selectPageViewMode)
  const scale = useSelector(selectStreamScale)
  const totalPages = useSelector(selectTotalPages)

  useEffect(() => {
    if (mode !== 'scroll') return

    const el = containerRef.current
    if (!el) return

    const onScroll = () => {
      const pagePx = pageHeight * scale
      if (!pagePx) return

      const scrollTop = el.scrollTop
      const currentPage = Math.floor(scrollTop / pagePx) + 1
      const start = Math.floor((currentPage - 1) / CHUNK_SIZE) * CHUNK_SIZE + 1
      const end = Math.min(start + CHUNK_SIZE - 1, totalPages)

      dispatch(setCurrentRange([start, end]))
    }

    el.addEventListener('scroll', onScroll)
    onScroll() // init

    return () => el.removeEventListener('scroll', onScroll)
  }, [containerRef, pageHeight, scale, totalPages, mode, dispatch])
}
