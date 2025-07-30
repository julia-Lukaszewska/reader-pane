import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage } from '@/store/slices/readerSlice'
import {
  selectPageViewMode,
  selectTotalPages,
} from '@/store/selectors/readerSelectors'
import { selectStreamScale } from '@/store/selectors/streamSelectors'

export default function useScrollCurrentPage(containerRef, pageHeight) {
  const dispatch = useDispatch()
  const mode = useSelector(selectPageViewMode)
  const scale = useSelector(selectStreamScale)
  const total = useSelector(selectTotalPages)
  const prev = useRef(null)

  useEffect(() => {
    if (mode !== 'scroll') return
    const el = containerRef.current
    if (!el) return

    const calc = () => {
      const page = Math.min(total, Math.floor(el.scrollTop / (pageHeight * scale)) + 1)
      if (page !== prev.current) {
        prev.current = page
        dispatch(setCurrentPage(page))
      }
    }

    calc()
    el.addEventListener('scroll', calc)
    return () => el.removeEventListener('scroll', calc)
  }, [mode, scale, total, containerRef, pageHeight, dispatch])
}