import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import useLastOpenedBook from '@/modules/reader/hooks/useLastOpenedBook'
import useStartingPage from '@/modules/reader/hooks/useStartingPage'
import useVisiblePages from '@reader/hooks/useVisiblePages'

import { selectVisiblePages } from '@/store/selectors/streamSelectors'
import { getRangeAround } from '@reader/utils/getRangeAround'
import { setCurrentRange } from '@/store/slices/streamSlice'

export default function ReaderSessionController({ children, containerRef }) {
  const { bookId: routeBookId } = useParams()
  const resolvedBookId = useLastOpenedBook(routeBookId)
  const ready = useStartingPage(resolvedBookId)

  const dispatch = useDispatch()
  const visiblePages = useSelector(selectVisiblePages)

  useVisiblePages(containerRef, 792) 

  useEffect(() => {
    if (!ready || !visiblePages.length) return
    const range = getRangeAround(visiblePages[0])
    dispatch(setCurrentRange(range))
  }, [ready, visiblePages, dispatch])

  if (!ready) return null

  return children({ containerRef })
}
