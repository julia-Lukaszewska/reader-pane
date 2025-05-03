//-----------------------------------------------------------------------------
//------ useLoadPDFDocument – load PDF to ref on book open and trigger initial preload 
//-----------------------------------------------------------------------------
import { useEffect } from 'react'
import * as pdfjsLib from 'pdfjs-dist'

const useLoadPDFDocument = ({ activeBook, pdfRef, preload }) => {
  useEffect(() => {
    if (!activeBook?.fileUrl) return

    const loadPDF = async () => {
      try {
        console.log('[useLoadPDFDocument] Loading PDF URL:', activeBook.fileUrl) // Debug 
        const loadingTask = pdfjsLib.getDocument(activeBook.fileUrl) // Load PDF task 
        const pdf = await loadingTask.promise // Wait for full load 

        pdfRef.current = pdf // Save to ref 
        preload() // Trigger preload 
      } catch (err) {
        console.error('[useLoadPDFDocument] Failed to load PDF:', err) // Log error 
      }
    }

    loadPDF()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeBook?.fileUrl]) // Only rerun when fileUrl changes 
}

export default useLoadPDFDocument // Export the hook 
