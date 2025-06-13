/**
 * @file useLoadPDFDocument.js
 * @description
 * React hook that loads a PDF document for the active book using pdf.js.
 * Fetches the file as blob (RTK Query) and loads it via ArrayBuffer.
 */

import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import * as pdfjsLib from 'pdfjs-dist'

import { useGetBookByIdQuery } from '@/store/api/booksPrivateApi'
import { useGetPdfFileQuery } from '@/store/api/pdfStreamApi'
import { selectIsLoggedIn } from '@store/api/authApi/authSelectors'

export default function useLoadPDFDocument({ pdfRef, onLoaded }) {
  const { bookId } = useParams()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const {
    data: book,
    isFetching: isFetchingBook,
  } = useGetBookByIdQuery(bookId, {
    skip: !bookId || !isLoggedIn,
  })

  const filename = book?.file?.filename

  const {
    data: fileBlob,
    isFetching: isFetchingPdf,
    isError,
  } = useGetPdfFileQuery(filename, {
    skip: !filename || !isLoggedIn || isFetchingBook,
  })

  useEffect(() => {
    console.log('[useLoadPDFDocument] effect fired', {
      bookId,
      filename,
      fileBlob,
      book,
      pdfRef: pdfRef?.current,
    })

    if (!book || !filename || !pdfRef || pdfRef.current) return

    if (!fileBlob) {
      console.log('[useLoadPDFDocument] waiting for blob...')
      return
    }

    let cancelled = false

    ;(async () => {
      try {
        const buffer = await fileBlob.arrayBuffer()
        if (cancelled) return

        const loadingTask = pdfjsLib.getDocument({ data: buffer })
        const pdf = await loadingTask.promise
        if (cancelled) return

        pdfRef.current = pdf
        if (onLoaded) onLoaded(pdf)

        console.log('[useLoadPDFDocument] PDF loaded successfully')
      } catch (error) {
        console.error('[useLoadPDFDocument] Failed to load PDF:', error)
      }
    })()

    return () => {
      cancelled = true
      console.log('[useLoadPDFDocument] cleanup: cancelled')
    }
  }, [bookId, fileBlob, filename, book, pdfRef, onLoaded])

  return {
    isFetching: isFetchingBook || isFetchingPdf,
    isError,
  }
}
