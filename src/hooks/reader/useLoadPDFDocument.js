//-----------------------------------------------------------------------------
//------ useLoadPDFDocument – load PDF to ref on book open and trigger initial preload 
//-----------------------------------------------------------------------------
import { useEffect } from 'react'
import * as pdfjsLib from 'pdfjs-dist/build/pdf'

const useLoadPDFDocument = ({ activeBook, pdfRef, preload }) => {
  useEffect(() => {
    if (!activeBook?.fileUrl) return

    const loadPDF = async () => {
      try {
        console.log('[useLoadPDFDocument] Loading PDF URL:', activeBook.fileUrl) 
        const loadingTask = pdfjsLib.getDocument(activeBook.fileUrl) 
        const pdf = await loadingTask.promise 

        pdfRef.current = pdf 
        preload() 
      } catch (err) {
        console.error('[useLoadPDFDocument] Failed to load PDF:', err) 
      }
    }

    loadPDF()
   
  }, [activeBook?.fileUrl]) 
}

export default useLoadPDFDocument 
