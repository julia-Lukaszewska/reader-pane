import * as pdfjsLib from 'pdfjs-dist'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  useGetBookByIdQuery,
  useGetBookFileUrlQuery,
} from '@/store/api/booksPrivateApi'
import { setReaderState } from '@/store/slices/readerSlice'

export default function useStartingPage(bookId) {
  const dispatch = useDispatch()
  const [isInitialized, setInitialized] = useState(false)
  const didInitRef = useRef(false)

  const { data: bookData } = useGetBookByIdQuery(bookId, { skip: !bookId })
  const { data: fileUrl, isLoading: fileLoading } = useGetBookFileUrlQuery(bookId, { skip: !bookId })

  const fileReady = !fileLoading && Boolean(fileUrl)
  const totalPages = bookData?.meta?.totalPages ?? 1
  const currentPage = bookData?.stats?.currentPage ?? 1

  useEffect(() => {
    if (!bookData || !fileReady || didInitRef.current) return

    dispatch(setReaderState({
      bookId,
      totalPages,
      currentPage,
      fileUrl,
    }))

    didInitRef.current = true
    setInitialized(true)
  }, [bookData, fileReady, dispatch, bookId])

  return isInitialized
}
