import React from 'react'
import { useParams } from 'react-router-dom'

import useLastOpenedBook from '@/modules/reader/hooks/useLastOpenedBook'
import useStartingPage from '@/modules/reader/hooks/useStartingPage'
import useStreamingPdfManager from '@/modules/reader/hooks/useStreamingPdfManager'

export default function ReaderSessionController({ children }) {
  const { bookId: routeBookId } = useParams()
  const resolvedBookId = useLastOpenedBook(routeBookId)

  const ready = useStartingPage(resolvedBookId)

  const { visiblePages, pdfRef } = useStreamingPdfManager({
    bookId: resolvedBookId,
  })

  if (!ready) return null

  return children({
    pdfRef,
    visiblePages,
  })
}
