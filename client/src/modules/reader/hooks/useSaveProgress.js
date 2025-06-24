import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import {
  selectBookId,
  selectCurrentPage,
} from '@/store/selectors/readerSelectors'
import { useUpdateProgressAutoMutation } from '@/store/api/booksPrivateApi'
import useDebouncedCallback from '@/hooks/useDebouncedCallback'

export default function useSaveProgress() {
  const bookId = useSelector(selectBookId)
  const currentPage = useSelector(selectCurrentPage)

  const [update] = useUpdateProgressAutoMutation()
  const saveDebounced = useDebouncedCallback(update, 500)
  const prevRef = useRef(currentPage)

  useEffect(() => {
    if (!bookId) return
    if (prevRef.current !== currentPage) {
      prevRef.current = currentPage
      saveDebounced({ id: bookId, currentPage })
    }
  }, [bookId, currentPage, saveDebounced])

  useEffect(() => {
    return () => {
      if (bookId) update({ id: bookId, currentPage })
    }
  }, [bookId, currentPage, update])
}
