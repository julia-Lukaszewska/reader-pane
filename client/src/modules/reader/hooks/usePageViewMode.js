import { useSelector, useDispatch } from 'react-redux'
import {
  setCurrentPage as setCurrentPageAction,
  setPageViewMode as setPageViewModeAction,

} from '@/store/slices/readerSlice'
import { setScaleIndex as setScaleIndexAction } from '@/store/slices/streamSlice'
export default function usePageViewMode() {
  const dispatch = useDispatch()

  const currentPage = useSelector((state) => state.reader.currentPage)
  const scaleIndex = useSelector((state) => state.reader.scaleIndex)
  const pageViewMode = useSelector((state) => state.reader.pageViewMode)

  const setCurrentPage = (page) => {
    const pageNum = Number.isFinite(page) ? Math.floor(page) : 1
    const clamped = Math.max(1, pageNum)
    // TODO: enforce a maximum page count when available
    dispatch(setCurrentPageAction(clamped))
  }

  const setPageViewMode = (mode) => dispatch(setPageViewModeAction(mode))
  const setScaleIndex = (index) => dispatch(setScaleIndexAction(index))

  return {
    currentPage,
    scaleIndex,
    pageViewMode,
    setCurrentPage,
    setPageViewMode,
    setScaleIndex,
  }
}
