/**
 * @file useLoadPDFDocument.js
 * @description
 * Hook that loads a PDF document for the active bookId using pdf.js.
 * Stores the loaded PDF in pdfRef.current and triggers onLoaded when done.
 */

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import * as pdfjsLib from 'pdfjs-dist'

/**
 * Loads a PDF document from the backend once bookId and access token are available.
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
  const [isFetching, setIsFetching] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (skip) {
      console.log('[useLoadPDFDocument] Skipping PDF load – no bookId or no access')
      return
    }

    if (!pdfRef) return
    if (pdfRef.current) {
      console.log('[useLoadPDFDocument] PDF already loaded in memory – skipping fetch')
      return
    }

    const url = `${import.meta.env.VITE_API_URL}/books/${bookId}/file`
    console.log('[useLoadPDFDocument] Loading PDF from:', url)

    let cancelled = false
    setIsFetching(true)
    setIsError(false)

    ;(async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({
          url,
          httpHeaders: { Authorization: `Bearer ${access}` },
        })
        const pdf = await loadingTask.promise
        if (cancelled) return

        console.log('[useLoadPDFDocument] PDF loaded successfully, pages:', pdf.numPages)
        pdfRef.current = pdf
        onLoaded?.(pdf)
      } catch (error) {
        if (cancelled) return
        console.error('[useLoadPDFDocument] Error loading PDF:', error)
        setIsError(true)
      } finally {
        if (!cancelled) setIsFetching(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [bookId, access, skip])

  return { isFetching, isError }
}
