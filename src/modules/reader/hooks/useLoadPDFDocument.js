/**
 * @file useLoadPDFDocument.js
 * @description Hook that loads a PDF document using pdf.js once `fileUrl` is ready for the active book.
 */  

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import * as pdfjsLib from 'pdfjs-dist'
import { useGetBookFileUrlQuery } from '@/store/api/booksApi'

//-----------------------------------------------------------------------------
// Hook: useLoadPDFDocument
//-----------------------------------------------------------------------------

/**
 * Loads a PDF document from backend for the active bookId using pdf.js.
 * Sets the result in `pdfRef.current` and calls `onLoaded()` when done.
 *
 * @param {Object} params
 * @param {React.MutableRefObject} params.pdfRef - Ref to store the loaded PDF document
 * @param {Function} [params.onLoaded] - Optional callback after successful load
 */
export default function useLoadPDFDocument({ pdfRef, onLoaded }) {
  const bookId = useSelector((s) => s.book.activeBookId)

  // 📡 Pobieranie fileUrl z backendu
  const { data: fileUrl, isSuccess } = useGetBookFileUrlQuery(bookId, {
    skip: !bookId,
    refetchOnMountOrArgChange: false,
  })

  //-----------------------------------------------------------------------------  
  //  Debug logi stanu  
  //-----------------------------------------------------------------------------

  useEffect(() => {
    console.log('[STATE CHANGE] bookId:', bookId)
  }, [bookId])

  useEffect(() => {
    console.log('[STATE CHANGE] fileUrl:', fileUrl)
  }, [fileUrl])

  useEffect(() => {
    console.log('[STATE CHANGE] isSuccess:', isSuccess)
  }, [isSuccess])

  useEffect(() => {
    console.log('[useLoadPDFDocument] pdfRef:', pdfRef)
  }, [pdfRef])

  //-----------------------------------------------------------------------------  
  //  Główna logika ładowania PDF
  //-----------------------------------------------------------------------------

  useEffect(() => {
    if (!bookId) {
      console.log('[useLoadPDFDocument] Exit early – brak bookId')
      return
    }

    if (!fileUrl) {
      console.log('[useLoadPDFDocument] ⏳ Czekam na fileUrl...')
      return
    }

    console.log('[useLoadPDFDocument] fileUrl ready:', fileUrl)

    let cancelled = false

    const loadPdf = async () => {
      try {
        console.log('[useLoadPDFDocument] start getDocument')
        const task = pdfjsLib.getDocument(fileUrl)
        const pdf = await task.promise

        if (cancelled) {
          console.log('[useLoadPDFDocument]  Anulowano ładowanie PDF')
          return
        }

        console.log('[useLoadPDFDocument]  PDF loaded ✓ numPages:', pdf.numPages)
        pdfRef.current = pdf

        if (typeof onLoaded === 'function') {
          console.log('[useLoadPDFDocument]  onLoaded() fired')
          onLoaded()
        }
      } catch (err) {
        console.error('[useLoadPDFDocument]  Błąd podczas ładowania PDF:', err)
      }
    }

    loadPdf()

    return () => {
      cancelled = true
      // ❗ NIE czyścimy pdfRef.current – może być nadal potrzebne
      console.log('[useLoadPDFDocument] cleanup/unmount – cancelled = true')
    }
  }, [fileUrl, bookId, pdfRef, onLoaded])
}
