/**
 * @file useLoadPDFDocument.js
 * @description
 * Hook that loads a PDF document for the active bookId using pdf.js.
 * Stores the loaded PDF in pdfRef.current and triggers onLoaded when done.
 */

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import * as pdfjsLib from 'pdfjs-dist'
import { useGetBookFileUrlQuery } from '@/store/api/booksApi'

/**
 * Loads a PDF document from the backend once fileUrl is available.
 * - Only runs if bookId and access token are present
 * - Uses pdf.js to load and cache the document in pdfRef
 * - Calls onLoaded callback once document is fully loaded
 *
 * @param {Object} params
 * @param {React.MutableRefObject} params.pdfRef - Ref to store the loaded PDF document
 * @param {Function} [params.onLoaded] - Optional callback triggered after PDF is loaded
 * @returns {{ isFetching: boolean, isError: boolean }}
 */
export default function useLoadPDFDocument({ pdfRef, onLoaded }) {
  const bookId = useSelector(state => state.book.activeBookId)
  const access = useSelector(state => state.auth.access)

  const skip = !bookId || !access

  const {
    data: fileUrl,
    isFetching,
    isError
  } = useGetBookFileUrlQuery(bookId, {
    skip,
    refetchOnMountOrArgChange: true
  })

  useEffect(() => {
    if (skip) {
      console.log('[useLoadPDFDocument] Skipping PDF load – no bookId or no access')
      return
    }

    if (!fileUrl || !pdfRef) return

    if (pdfRef.current) {
      console.log('[useLoadPDFDocument] PDF already loaded in memory – skipping fetch')
      return
    }

    console.log('[useLoadPDFDocument] Loading PDF from:', fileUrl)

    let cancelled = false

    ;(async () => {
      try {
        const { promise } = pdfjsLib.getDocument(fileUrl)
        const pdf = await promise
        if (cancelled) return

        console.log('[useLoadPDFDocument] PDF loaded successfully, pages:', pdf.numPages)

        pdfRef.current = pdf
        onLoaded?.(pdf)
      } catch (error) {
        console.error('[useLoadPDFDocument] Error loading PDF:', error)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [fileUrl, bookId, skip])

  return { isFetching, isError }
}
