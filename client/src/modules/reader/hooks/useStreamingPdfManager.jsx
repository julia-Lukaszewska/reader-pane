
import { useRef, useEffect, useState } from 'react'
import usePDFStreamer from './usePDFStreamer'
import usePreloadPDFPages from './usePreloadPDFPages'

export default function useStreamingPdfManager({
  bookId
  
}) {
  const pdfRef = useRef(null)
  const [pdfReady, setPdfReady] = useState(false)

  const { loading, error } = usePDFStreamer({
 
    pdfRef,
    onLoaded: () => setPdfReady(true),
  })

  const { preload, visiblePages } = usePreloadPDFPages({
    bookId,
    pdfRef,
  })

  useEffect(() => {
    if (pdfReady) {
         console.log('[🔁 preload() triggered]')
        preload()
    }
  }, [pdfReady, preload])

  return {
    loading,
    error,
    visiblePages,
    pdfRef,
  }
}
