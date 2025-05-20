
import { useEffect } from 'react'
import { useGetProgressQuery } from '@/store/api/booksApi'
import { useDispatch } from 'react-redux'
import { setCurrentPage, setMaxVisitedPage } from '@/store/slices/readerSlice'


export default function useInitReadingProgress(bookId) {
  const dispatch = useDispatch()
  const { data } = useGetProgressQuery(bookId, { skip: !bookId })

  useEffect(() => {
    if (!data) return
    console.log('[InitReadingProgress] loaded:', data)
    dispatch(setCurrentPage(data.currentPage))
    dispatch(setMaxVisitedPage(data.maxVisitedPage))
  }, [data, dispatch])
}
