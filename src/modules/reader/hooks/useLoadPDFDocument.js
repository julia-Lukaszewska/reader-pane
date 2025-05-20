import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import * as pdfjsLib from 'pdfjs-dist'
import { useGetBookFileUrlQuery } from '@/store/api/booksApi'

export default function useLoadPDFDocument({ pdfRef, onLoaded }) {
  const bookId = useSelector((s) => s.book.activeBookId)

  // fetch file URL
  const { data: fileUrl, isSuccess } = useGetBookFileUrlQuery(bookId, {
    skip: !bookId,
    refetchOnMountOrArgChange: false,
  })

  useEffect(() => {
    if (!isSuccess || !fileUrl) return
    console.log('[useLoadPDFDocument] fileUrl:', fileUrl)
    let cancelled = false

    const loadPdf = async () => {
      try {
        console.log('[useLoadPDFDocument] start getDocument')
        const task = pdfjsLib.getDocument(fileUrl)
        const pdf = await task.promise
        if (cancelled) return

        console.log('[useLoadPDFDocument] loaded PDF numPages:', pdf.numPages)
        pdfRef.current = pdf

        if (typeof onLoaded === 'function') {
          console.log('[useLoadPDFDocument] onLoaded() fired')
          onLoaded()
        }
      } catch (err) {
        console.error('[useLoadPDFDocument] error:', err)
      }
    }

    loadPdf()

    return () => {
      console.log('[useLoadPDFDocument] cleanup/unmount')
      cancelled = true
      pdfRef.current = null
    }
  }, [isSuccess, fileUrl, onLoaded, pdfRef])
}
