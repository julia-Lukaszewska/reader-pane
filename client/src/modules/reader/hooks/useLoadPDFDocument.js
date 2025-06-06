/**
 * @file useLoadPDFDocument.js
 * @description
 * Hook that loads a PDF document for the active bookId using pdf.js.
 * Stores the loaded PDF in pdfRef.current and triggers onLoaded when done.
 */

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as pdfjsLib from 'pdfjs-dist'
import useEnsureBookFileUrl from './useEnsureBookFileUrl'

/**
 * Loads a PDF document from the backend once bookId, fileUrl, and access token are available.
 * - Uses pdf.js to load and cache the document in pdfRef
 * - Calls onLoaded callback once document is fully loaded
 *
 * @param {Object} params
 * @param {React.MutableRefObject} params.pdfRef - Ref to store the loaded PDF document
 * @param {Function} [params.onLoaded] - Optional callback triggered after PDF is loaded
 * @returns {{ isFetching: boolean, isError: boolean }}
 */
export default function useLoadPDFDocument({ pdfRef, onLoaded }) {
  const { bookId } = useParams()
  const access = useSelector((state) => state.auth.access)
  const fileUrl = useEnsureBookFileUrl( bookId )

  const [isFetching, setIsFetching] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    console.log('[useLoadPDFDocument] bookId:', bookId)
    console.log('[useLoadPDFDocument] fileUrl:', fileUrl)

    if (!bookId || !access || !fileUrl) {
      console.log('[useLoadPDFDocument] Skipping PDF load – missing bookId, access, or fileUrl')
      return
    }

    if (!pdfRef) return
    if (pdfRef.current) {
      console.log('[useLoadPDFDocument] PDF already loaded – skipping')
      return
    }

    console.log('[useLoadPDFDocument] Loading PDF from:', fileUrl)

    let cancelled = false
    setIsFetching(true)
    setIsError(false)

    ;(async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({
          url: import.meta.env.VITE_API_URL + fileUrl,
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
console.log('[useLoadPDFDocument] full URL:', import.meta.env.VITE_API_URL + fileUrl)

    return () => {
      cancelled = true
    }
  }, [bookId, access, fileUrl])

  return { isFetching, isError }
}
