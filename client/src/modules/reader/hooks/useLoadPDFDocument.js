/**
 * @file useLoadPDFDocument.js
 * @description
 * React hook that loads a PDF document for the active book using pdf.js.
 * Fetches the file as blob (RTK Query) and loads it via ArrayBuffer.
 */

import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as pdfjsLib from 'pdfjs-dist'
import { useGetBookByIdQuery } from '@/store/api/booksApi'
import { useGetPdfFileQuery } from '@/store/api/pdfStreamApi'

/**
 * Loads a PDF document using pdf.js with binary data from a secured endpoint.
 *
 * @param {Object} params
 * @param {React.MutableRefObject} params.pdfRef - Ref to store the loaded PDF document
 * @param {Function} [params.onLoaded] - Optional callback triggered after PDF is loaded
 * @returns {{ isFetching: boolean, isError: boolean }}
 */
export default function useLoadPDFDocument({ pdfRef, onLoaded }) {
  const { bookId } = useParams()

  // Step 1: Fetch book metadata (includes filename)
  const { data: book, isFetching: isFetchingBook } = useGetBookByIdQuery(bookId, {
    skip: !bookId,
  })

  const filename = book?.file?.filename

  // Step 2: Fetch PDF blob stream
  const {
    data: fileBlob,
    isFetching: isFetchingPdf,
    isError,
  } = useGetPdfFileQuery(filename, {
    skip: !filename,
  })

  useEffect(() => {
    console.log('[useLoadPDFDocument] effect fired', {
      bookId,
      filename,
      fileBlob,
      pdfRef: pdfRef?.current,
    })

    if (!fileBlob || !book || !filename || !pdfRef || pdfRef.current) {
      console.log('[useLoadPDFDocument] skip loading due to missing data')
      return
    }

    let cancelled = false

    ;(async () => {
      try {
        console.log('[useLoadPDFDocument] loading PDF...')
        const buffer = await fileBlob.arrayBuffer()
        if (cancelled) return

        const loadingTask = pdfjsLib.getDocument({ data: buffer })
        const pdf = await loadingTask.promise
        if (cancelled) return

        pdfRef.current = pdf
        console.log('[useLoadPDFDocument] PDF loaded successfully')

        if (onLoaded) onLoaded(pdf)
      } catch (error) {
        console.error('[useLoadPDFDocument] Failed to load PDF:', error)
      }
    })()

    return () => {
      cancelled = true
      console.log('[useLoadPDFDocument] cleanup, cancelled = true')
    }
  }, [fileBlob, filename, book, pdfRef, onLoaded])

  return {
    isFetching: isFetchingBook || isFetchingPdf,
    isError,
  }
}
