import { useRef, useEffect, useState } from 'react'
import usePDFStreamer from './usePDFStreamer'
import usePreloadPDFPages from './usePreloadPDFPages'

//-----------------------------------------------------
//------ useStreamingPdfManager Hook
//-----------------------------------------------------

/**
 * @function useStreamingPdfManager
 * @description
 * Coordinates PDF streaming and preloading for the reader:
 * - Streams the PDF document via usePDFStreamer
 * - Preloads surrounding pages via usePreloadPDFPages once PDF is ready
 * @param {Object} params
 * @param {string} params.bookId   - ID of the book to stream
 * @returns {{
 *   loading: boolean,
 *   error: Error|null,
 *   visiblePages: Array<object>,
 *   pdfRef: React.RefObject<HTMLDivElement>
 * }}
 */
export default function useStreamingPdfManager({ bookId }) {
  //-----------------------------------------------------
  //------ Refs & State
  //-----------------------------------------------------
  const pdfRef   = useRef(null)
  const [pdfReady, setPdfReady] = useState(false)

  //-----------------------------------------------------
  //------ PDF Streaming
  //-----------------------------------------------------
  const { loading, error } = usePDFStreamer({
    pdfRef,
    onLoaded: () => setPdfReady(true),
  })

  //-----------------------------------------------------
  //------ Page Preloading
  //-----------------------------------------------------
  const { preload, visiblePages } = usePreloadPDFPages({
    bookId,
    pdfRef,
  })

  //-----------------------------------------------------
  //------ Effect: Trigger Preload Once PDF Is Ready
  //-----------------------------------------------------
  useEffect(() => {
    if (pdfReady) {
         console.log('[ preload() triggered]')
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
