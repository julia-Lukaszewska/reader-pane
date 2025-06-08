/**
 * @file useLoadPDFDocument.js
 * @description
 * React hook that loads a PDF document for the active book using pdf.js.
 * Fetches the file as blob (RTK Query) and loads it via ArrayBuffer.
 */

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as pdfjsLib from 'pdfjs-dist'
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
  const book = useSelector((state) => state.books.entities?.[bookId])
  const filename = book?.file?.filename

  const { data: fileBlob, isFetching, isError } = useGetPdfFileQuery(filename, {
    skip: !filename,
  })

  useEffect(() => {
    if (!fileBlob || !book || !filename || !pdfRef || pdfRef.current) return

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
      } catch (error) {
        console.error('[useLoadPDFDocument] Failed to load PDF:', error)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [fileBlob, filename, book, pdfRef, onLoaded])

  return { isFetching, isError }
}
