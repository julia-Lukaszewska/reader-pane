/**
 * @file useStreamingPdfManager.js
 * @description
 * Combines loading a remote PDF (via usePDFStreamer) with page preloading (via usePreloadPDFPages).
 * Exposes loading state, visible pages, and a reference to the PDF document.
 */

import { useRef, useEffect, useState } from 'react'
import usePDFStreamer from './usePDFStreamer'
import usePreloadPDFPages from './usePreloadPDFPages'


//-----------------------------------------------------------------------------
// Hook: useStreamingPdfManager
//-----------------------------------------------------------------------------

/**
 * Manages loading and rendering of streamed PDF pages.
 *
 * @param {Object} params
 * @param {string} params.bookId – Book identifier
 * @returns {{
 *   loading: boolean,
 *   error: Error|null,
 *   visiblePages: Array<Object>,
 *   pdfRef: React.MutableRefObject
 * }}
 */
export default function useStreamingPdfManager({ bookId, visiblePageNumbers = [], scale = 1 }) {
  const pdfRef = useRef(null)
  const [pdfReady, setPdfReady] = useState(false)

usePDFStreamer({
    pdfRef,
    onLoaded: () => setPdfReady(true),
  })

    const { preload, visiblePages } = usePreloadPDFPages({
    bookId,
    pdfRef,
    visiblePageNumbers,
    scale,
  })

  useEffect(() => {
    if (!pdfReady) return
    preload()
  }, [pdfReady, preload, visiblePageNumbers])

  return {
    visiblePages,
    preload,
    pdfRef,
  }
}
