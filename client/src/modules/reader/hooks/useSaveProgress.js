import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import {
  selectBookId,
  selectCurrentPage,
} from '@/store/selectors/readerSelectors'
import { useUpdateProgressAutoMutation } from '@/store/api/booksPrivateApi'
import useDebouncedCallback from '@/hooks/useDebouncedCallback'

export default function useSaveProgress() {
  const initializedRef = useRef(false)
  const bookId = useSelector(selectBookId)
  const currentPage = useSelector(selectCurrentPage)

  const [update] = useUpdateProgressAutoMutation()
  const saveDebounced = useDebouncedCallback(update, 500)
  const prevRef = useRef(currentPage)

useEffect(() => {
  if (!bookId || currentPage < 1) return

  if (!initializedRef.current) {
    initializedRef.current = true
    prevRef.current = currentPage // nie zapisuj, tylko zapamiętaj
    return
  }

  if (Math.abs(prevRef.current - currentPage) >= 2) {
    prevRef.current = currentPage
    saveDebounced({ id: bookId, currentPage })
  }
}, [bookId, currentPage, saveDebounced])

  useEffect(() => {
    return () => {
      saveDebounced.flush?.()
      if (bookId && currentPage >= 1) {
        update({ id: bookId, currentPage })
      }
    }
  }, [bookId, currentPage, update, saveDebounced])
}
