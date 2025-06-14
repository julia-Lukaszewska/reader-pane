/**
 * @file useLoadPDFDocument.js
 * @description
 * React hook that loads a PDF document using pdf.js.
 * – pobiera metadane książki (jeśli nie przekazane wprost),
 * – ściąga plik PDF jako ArrayBuffer przez RTK Query,
 * – tworzy instancję pdf.js i zapisuje ją w przekazanym refie,
 * – wywołuje onLoaded po udanym załadowaniu.
 */

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetBookByIdQuery } from '@/store/api/booksPrivateApi'
import { useGetPdfFileQuery } from '@/store/api/pdfStreamApi'
import * as pdfjsLib from 'pdfjs-dist'

/**
 * @param {Object} params
 * @param {React.MutableRefObject} params.pdfRef – ref, w którym zostanie zapisany obiekt pdf.js
 * @param {(pdf: import('pdfjs-dist').PDFDocumentProxy) => void} params.onLoaded – callback po załadowaniu
 * @param {Object} [params.book] – opcjonalny obiekt książki, by pominąć dodatkowy fetch
 */
export default function useLoadPDFDocument({ pdfRef, onLoaded, book: propBook }) {
  // 1️⃣ Ustal bookId
  const { bookId: paramId } = useParams()
  const bookId = propBook?._id || paramId

  // 2️⃣ Pobierz książkę tylko jeśli nie przekazano jej wprost
  const {
    data: fetchedBook,
    isFetching: isFetchingBook,
  } = useGetBookByIdQuery(bookId, { skip: !!propBook || !bookId })

  const book = propBook || fetchedBook
  const filename = book?.file?.filename

  // 3️⃣ Pobierz PDF jako ArrayBuffer (patrz pdfStreamApi → responseHandler: 'arrayBuffer')
  const {
    data: fileBuffer,
    isFetching: isFetchingPdf,
    error: pdfError,
  } = useGetPdfFileQuery(filename, { skip: !filename || isFetchingBook })

  useEffect(() => {
    console.log('[useLoadPDFDocument] effect', {
      bookId,
      hasBook: !!book,
      filename,
      fileType: fileBuffer && fileBuffer.constructor.name,
    })

    if (!book || !filename || pdfRef.current) return

    if (!fileBuffer) return // czekamy na buffer

    let cancelled = false
    ;(async () => {
      try {
        // fileBuffer pochodzi jako ArrayBuffer z RTK Query
        const buffer = fileBuffer instanceof ArrayBuffer
          ? fileBuffer
          : fileBuffer instanceof Blob
          ? await fileBuffer.arrayBuffer()
          : new TextEncoder().encode(String(fileBuffer)).buffer

        if (cancelled) return

        const pdf = await pdfjsLib.getDocument({ data: buffer }).promise
        if (cancelled) return

        pdfRef.current = pdf
        onLoaded?.(pdf)
        console.log('[useLoadPDFDocument] PDF loaded ✓')
      } catch (err) {
        console.error('[useLoadPDFDocument] load failed', err)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [book, filename, fileBuffer, pdfRef, onLoaded, bookId, isFetchingBook])

  return {
    isFetching: isFetchingBook || isFetchingPdf,
    error: pdfError,
  }
}
