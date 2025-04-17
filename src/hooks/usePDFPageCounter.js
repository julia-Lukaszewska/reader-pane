import { useCallback } from 'react' // React hook  
import * as pdfjsLib from 'pdfjs-dist' // PDF.js library  

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js' // Set path to PDF.js worker file  

// -----------------------------------------------------------------------------
//------ usePDFPageCounter hook  
// -----------------------------------------------------------------------------

/**
 * Hook that returns a function to count number of pages in a PDF file.
 * Uses PDF.js to parse the document from a File object.
 */
const usePDFPageCounter = () => {
  /**
   * Loads a PDF file and returns its total number of pages.
   * Accepts a File object (from input).
   */
  const countPages = useCallback(async (file) => {
    const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise // Load PDF document  
    return pdf.numPages // Return total page count  
  }, [])

  return { countPages } // Named export of hook API  
}

export { usePDFPageCounter } // Export hook (named)  
