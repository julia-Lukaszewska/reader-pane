import { useMemo } from 'react'
import { getVisiblePages } from '@reader/utils/pdfPageNavigation'

/**
 * @param {Object} params
 * @param {number} params.currentPage
 * @param {number} params.totalPages
 * @param {string} params.viewMode       // 'single' | 'double' | 'scroll'
 */
export default function useVisiblePageRange({ currentPage, totalPages, viewMode }) {
  return useMemo(
    () => getVisiblePages({ currentPage, totalPages, viewMode }),
    [currentPage, totalPages, viewMode]
  )
}