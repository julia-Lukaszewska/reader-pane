import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useUpdateBookMutation } from '@/store/api/booksPrivateApi'
import { selectCurrentPage } from '@/store/selectors/readerSelectors'
import useDebouncedCallback from '@/hooks/useDebouncedCallback'

export default function useSyncCurrentPage(bookId) {
  const [updateBook] = useUpdateBookMutation()
  const currentPage = useSelector(selectCurrentPage)
  const lastRef = useRef(currentPage)

  const send = useDebouncedCallback(page => {
    if (!bookId) return
    updateBook({ id: bookId, changes: { flags: { currentPage: page } } })
  }, 500)

  useEffect(() => {
    if (currentPage === lastRef.current) return
    lastRef.current = currentPage
    send(currentPage)
  }, [currentPage, send])

  useEffect(() => {
    return () => {
      const page = lastRef.current
      if (bookId && page) {
        updateBook({ id: bookId, changes: { flags: { currentPage: page } } })
      }
    }
  }, [bookId, updateBook])
}
