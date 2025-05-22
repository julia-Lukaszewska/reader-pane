/**
 * @file usePDFPageCounter.js
 * @description React hook that provides a function to count pages in a PDF file using PDF.js.
 */

import { useCallback } from 'react'
import * as pdfjsLib from 'pdfjs-dist'

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'

//-----------------------------------------------------------------------------
// Hook: usePDFPageCounter
//-----------------------------------------------------------------------------

/**
 * Provides a `countPages` function that returns the total number of pages
 * in a given PDF file.
 *
 * @returns {Object} An object with:
 *   - countPages: async (file: File) => number
 */
const usePDFPageCounter = () => {
  /**
   * Counts the number of pages in the provided PDF file.
   *
   * @param {File} file - PDF file object
   * @returns {Promise<number>} Total page count
   */
  const countPages = useCallback(async (file) => {
    const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise
    return pdf.numPages
  }, [])

  return { countPages }
}

export default usePDFPageCounter
