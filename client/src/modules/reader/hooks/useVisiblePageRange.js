import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getVisiblePages } from '@reader/utils/pdfPageNavigation'
import {
  selectCurrentPage,
  selectTotalPages,
  selectPageViewMode
} from '@/store/selectors/readerSelectors'
/**
 * @param {Object} params
 * @param {number} params.currentPage
 * @param {number} params.totalPages
 * @param {string} params.viewMode       // 'single' | 'double' | 'scroll'
 */
export default function useVisiblePageRange() {
  const currentPage = useSelector(selectCurrentPage)
  const totalPages = useSelector(selectTotalPages)
  const viewMode = useSelector(selectPageViewMode)
  return useMemo(
    () => getVisiblePages({ currentPage, totalPages, viewMode }),
    [currentPage, totalPages, viewMode]
  )
}