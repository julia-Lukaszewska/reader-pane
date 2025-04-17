//-----------------------------------------------------------------------------
//------useLoadPDFDocument – load PDF to ref on book open  
//-----------------------------------------------------------------------------

import { useEffect } from 'react'
import * as pdfjsLib from 'pdfjs-dist/build/pdf'

export const useLoadPDFDocument = ({ activeBook, pdfRef, preload }) => {
  useEffect(() => {
    if (!activeBook?.fileUrl) return

    const loadPDF = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(activeBook.fileUrl) // Load PDF task  
        const pdf = await loadingTask.promise // Wait for the document to be fully loaded  

        pdfRef.current = pdf // Save loaded document to ref  

        preload() // Immediately trigger preload after loading  
      } catch (err) {
        console.error('[useLoadPDFDocument] Failed to load PDF:', err) // Log loading error  
      }
    }

    loadPDF()
  }, [activeBook?.fileUrl, pdfRef, preload]) // Rerun when book changes  
}
