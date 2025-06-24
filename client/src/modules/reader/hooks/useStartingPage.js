import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  useGetBookByIdQuery,
  useGetBookFileUrlQuery,
} from '@/store/api/booksPrivateApi'
import { setReaderState } from '@/store/slices/readerSlice'

/**
 * Ładuje metadane książki i ustawia readera na ostatnią
 * zapisaną stronę (stats.currentPage).
 */
export default function useStartingPage(bookId) {
  const dispatch = useDispatch()
  const [ready, setReady] = useState(false)
  const didInit = useRef(false)

  /* --- RTK Query -------------------------------------------------------- */
  const { data: book }   = useGetBookByIdQuery(bookId, { skip: !bookId })
  const { data: fileUrl, isLoading: fileLoading }
    = useGetBookFileUrlQuery(bookId, { skip: !bookId })

  /* --- Derived ---------------------------------------------------------- */
  const fileReady    = !fileLoading && Boolean(fileUrl)
  const totalPages   = book?.meta?.totalPages   ?? 1
  const currentPage  = book?.stats?.currentPage ?? 1   // ← KLUCZOWA ZMIANA

  /* --- Init reader ------------------------------------------------------ */
  useEffect(() => {
    if (!fileReady || !book || didInit.current) return

    dispatch(setReaderState({
      bookId,
      totalPages,
      currentPage,
      fileUrl,
    }))

    didInit.current = true
    setReady(true)
  }, [bookId, book, fileReady, dispatch, totalPages, currentPage, fileUrl])

  return ready
}
