 import { useEffect } from 'react'
import { useParams} from 'react-router-dom'
import { useSelector } from 'react-redux'
import useLastOpenedBook from '@/modules/reader/hooks/useLastOpenedBook'
import useStartingPage from '@/modules/reader/hooks/useStartingPage'
import useStreamingPdfManager from '@/modules/reader/hooks/useStreamingPdfManager'
import useVisiblePageRange from '@/modules/reader/hooks/useVisiblePageRange'
import {
  selectCurrentPage,
  selectTotalPages,
  selectPageViewMode,
  selectCurrentScale,
} from '@/store/selectors/readerSelectors'

export default function ReaderSessionController({ children , containerRef }) {
  const { bookId: routeBookId } = useParams()
  const resolvedBookId = useLastOpenedBook(routeBookId)

  const ready = useStartingPage(resolvedBookId)
 const currentPage = useSelector(selectCurrentPage)
  const totalPages = useSelector(selectTotalPages)
  const pageViewMode = useSelector(selectPageViewMode)
  const scale = useSelector(selectCurrentScale)
useEffect(() => {
    console.log('🔢 currentPage:', currentPage, 'totalPages:', totalPages, 'viewMode:', pageViewMode)
  }, [currentPage, totalPages, pageViewMode])
  const visiblePageNumbers = useVisiblePageRange({
    currentPage,
    totalPages,
    pageViewMode,
  })
   useEffect(() => {
    console.log('👀 visiblePageNumbers:', visiblePageNumbers)
  }, [visiblePageNumbers])
  const { visiblePages, pdfRef } = useStreamingPdfManager({
    bookId: resolvedBookId,
     visiblePageNumbers,
    scale,
  })
useEffect(() => {
    console.log('📑 pdfRef.current:', pdfRef.current, 'visiblePages:', visiblePages)
  }, [pdfRef, visiblePages])
  if (!ready) return null

  return children({
    pdfRef,
    visiblePages,
     containerRef ,
  })
}
