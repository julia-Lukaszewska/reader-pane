import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import useLastOpenedBook     from '@/modules/reader/hooks/useLastOpenedBook'
import useStartingPage       from '@/modules/reader/hooks/useStartingPage'
import useStreamingPdfManager from '@/modules/reader/hooks/useStreamingPdfManager'
import useVisiblePageRange    from '@/modules/reader/hooks/useVisiblePageRange'

import { setVisiblePages, setCurrentRange } from '@/store/reader/streamSlice'
import { selectCurrentScale } from '@/store/selectors/readerSelectors'
import { getRangeAround }     from '@reader/utils/getRangeAround'

export default function ReaderSessionController({ children, containerRef }) {
  const { bookId: routeBookId } = useParams()
  const resolvedBookId = useLastOpenedBook(routeBookId)

  const ready = useStartingPage(resolvedBookId)
  const scale = useSelector(selectCurrentScale) 

  const dispatch      = useDispatch()
  const visiblePages  = useVisiblePageRange()      
  const { pdfRef }    = useStreamingPdfManager({   
    bookId: resolvedBookId,
  })

  useEffect(() => {
    if (!ready || !visiblePages.length) return

    dispatch(setVisiblePages(visiblePages))

    const range = getRangeAround(visiblePages[0])  
  }, [ready, visiblePages, dispatch])

  if (!ready) return null

  return children({
    pdfRef,
    containerRef,
  })
}
