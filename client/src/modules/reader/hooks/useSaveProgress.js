import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import {
  selectBookId,
  selectCurrentPage,
} from '@/store/selectors/readerSelectors'
import { useUpdateProgressAutoMutation } from '@/store/api/booksPrivateApi'

export default function useSaveProgress() {
  const bookId = useSelector(selectBookId)
  const currentPage = useSelector(selectCurrentPage)

  const [update] = useUpdateProgressAutoMutation()
  const prevRef = useRef(currentPage)

  useEffect(() => {
    if (!bookId) return
    if (prevRef.current !== currentPage) {
      prevRef.current = currentPage
      update({ id: bookId, currentPage })
    }
  }, [bookId, currentPage, update])

  useEffect(() => {
    return () => {
      if (bookId) update({ id: bookId, currentPage })
    }
  }, [bookId, currentPage, update])
}
