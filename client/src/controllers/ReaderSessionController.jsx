import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import useLastOpenedBook from '@/modules/reader/hooks/useLastOpenedBook'
import useStartingPage from '@/modules/reader/hooks/useStartingPage'
import useVisiblePages from '@reader/hooks/useVisiblePages'
import useRangeStreamer from '@reader/hooks/useRangeStreamer'

import { selectVisiblePages, selectCurrentRange } from '@/store/selectors/streamSelectors'
import { getRangeAround } from '@reader/utils/getRangeAround'
import { setCurrentRange } from '@/store/slices/streamSlice'

export default function ReaderSessionController({ children, containerRef }) {
  const { bookId: routeBookId } = useParams()
  const resolvedBookId = useLastOpenedBook(routeBookId)
  const ready = useStartingPage(resolvedBookId)

  const dispatch = useDispatch()
  const visiblePages = useSelector(selectVisiblePages)
  const currentRange = useSelector(selectCurrentRange)
  const streamRange = useRangeStreamer()

  useVisiblePages(containerRef, 792)

  const streamedRangesRef = useRef(new Set())

  useEffect(() => {
    if (!ready || !visiblePages.length) return
    const range = getRangeAround(visiblePages[0])
    dispatch(setCurrentRange(range))
    console.log('[📘 Session] setCurrentRange →', range)
  }, [ready, visiblePages])

  useEffect(() => {
    if (!ready || !currentRange) return

    const key = `${currentRange[0]}-${currentRange[1]}`
    if (streamedRangesRef.current.has(key)) {
      console.log('[⏭️ Skipping already streamed]', key)
      return
    }

    console.log('[📥 Streaming range]', currentRange)
    streamedRangesRef.current.add(key)
    streamRange(currentRange)
  }, [ready, currentRange])

  if (!ready) return null

  return children({ containerRef })
}
