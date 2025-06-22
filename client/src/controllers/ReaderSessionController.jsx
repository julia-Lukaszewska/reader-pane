import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useLastOpenedBook from '@/modules/reader/hooks/useLastOpenedBook'
import useStartingPage from '@/modules/reader/hooks/useStartingPage'
import useStreamingPdfManager from '@/modules/reader/hooks/useStreamingPdfManager'

import { selectCurrentScale } from '@/store/selectors/readerSelectors'


export default function ReaderSessionController({ children, containerRef }) {
  const { bookId: routeBookId } = useParams()
  const resolvedBookId = useLastOpenedBook(routeBookId)

  const ready = useStartingPage(resolvedBookId)
  const scale = useSelector(selectCurrentScale)



const { pdfRef } = useStreamingPdfManager({
    bookId: resolvedBookId,

    scale,
  })

  if (!ready) return null

  return children({
    pdfRef,
    containerRef,
  })
}
