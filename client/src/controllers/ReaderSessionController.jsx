import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useLastOpenedBook from '@/modules/reader/hooks/useLastOpenedBook'
import useStartingPage from '@/modules/reader/hooks/useStartingPage'
import useStreamingPdfManager from '@/modules/reader/hooks/useStreamingPdfManager'
import useVisiblePageRange from '@/modules/reader/hooks/useVisiblePageRange'
import { selectCurrentScale } from '@/store/selectors/readerSelectors'
import useSyncCurrentPage from '@/modules/reader/hooks/useSyncCurrentPage'

export default function ReaderSessionController({ children, containerRef }) {
  const { bookId: routeBookId } = useParams()
  const resolvedBookId = useLastOpenedBook(routeBookId)

  const ready = useStartingPage(resolvedBookId)
  const scale = useSelector(selectCurrentScale)
  useSyncCurrentPage(resolvedBookId)

  const visiblePageNumbers = useVisiblePageRange()

  const { visiblePages, pdfRef } = useStreamingPdfManager({
    bookId: resolvedBookId,
    visiblePageNumbers,
    scale,
  })

  if (!ready) return null

  return children({
    pdfRef,
    visiblePages,
    containerRef,
  })
}
