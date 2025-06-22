import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  useGetBookByIdQuery,
  useGetBookFileUrlQuery,
} from '@/store/api/booksPrivateApi'
import { setReaderState } from '@/store/slices/readerSlice'

//-----------------------------------------------------
//------ useStartingPage Hook
//-----------------------------------------------------

/**
 * @function useStartingPage
 * @description
 * Initializes reader state when both book metadata and PDF URL are ready.
 * - Fetches book metadata (including totalPages and currentPage)
 * - Fetches the PDF file URL
 * - Dispatches `setReaderState` once per mount
 * @param {string} bookId - ID of the book to start reading
 * @returns {boolean} True once initialization has run
 */
export default function useStartingPage(bookId) {
  const dispatch = useDispatch()
  const [isInitialized, setInitialized] = useState(false)
  const didInitRef = useRef(false)

  //-----------------------------------------------------
  //------ RTK Query Hooks
  //-----------------------------------------------------
  const { data: bookData } = useGetBookByIdQuery(bookId, { skip: !bookId })
  const {
    data: fileUrl,
    isLoading: fileLoading,
  } = useGetBookFileUrlQuery(bookId, { skip: !bookId })

  //-----------------------------------------------------
  //------ Derived Values
  //-----------------------------------------------------
  const fileReady = !fileLoading && Boolean(fileUrl)
  const totalPages = bookData?.meta?.totalPages ?? 1
   const currentPage =
    bookData?.flags?.currentPage ??
    bookData?.stats?.currentPage ??
    1

  //-----------------------------------------------------
  //------ Effect: Initialize Reader State
  //-----------------------------------------------------
  useEffect(() => {
    if (!bookData || !fileReady || didInitRef.current) return

    dispatch(
      setReaderState({
        bookId,
        totalPages,
        currentPage,
        fileUrl,
      })
    )

    didInitRef.current = true
    setInitialized(true)
  }, [bookData, fileReady, dispatch, bookId, totalPages, currentPage, fileUrl])

  return isInitialized
}
