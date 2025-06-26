import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectBookId, selectCurrentPage } from '@/store/selectors/readerSelectors'
import { selectBookById } from '@/store/selectors/singleBookSelectors'
import { setCurrentRange } from '@/store/slices/streamSlice'
import { CHUNK_SIZE } from '@reader/utils/pdfConstants'
import { getRangeAround } from '@reader/utils/getRangeAround'
import useRangeStreamer from './useRangeStreamer'

export default function useCurrentRangeLoader(ready) {
  const dispatch = useDispatch()
  const bookId = useSelector(selectBookId)
  const book = useSelector(selectBookById(bookId))
  const chunkSize = book?.file?.rangeSize ?? CHUNK_SIZE
  const currentPage = useSelector(selectCurrentPage)
  const streamRange = useRangeStreamer()

  useEffect(() => {
    if (!ready) return

    const range = getRangeAround(currentPage, chunkSize)
    dispatch(setCurrentRange(range))
    streamRange(range)
  }, [ready, currentPage, chunkSize, dispatch, streamRange])
}
