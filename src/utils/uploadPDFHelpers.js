import * as pdfjsLib from 'pdfjs-dist'

//-----------------------------------------------------------------------------
//------ Helpers for validating and analyzing PDF files during upload
//-----------------------------------------------------------------------------

// Validate if the file is a proper PDF
const validatePDF = (file) => {
  if (!file || file.type !== 'application/pdf') {
    alert('Invalid file format. Please upload a PDF file.')
    return false
  }
  return true
}

// Count number of pages in the uploaded PDF file
const countPDFPages = async (file) => {
  try {
    console.log('[countPDFPages] Counting pages for file:', file?.name)
    const loadingTask = pdfjsLib.getDocument(URL.createObjectURL(file))
    const pdf = await loadingTask.promise
    console.log('[countPDFPages] Total pages:', pdf.numPages)
    return pdf.numPages
  } catch (err) {
    console.error('[countPDFPages] Failed to count pages:', err)
    throw new Error('Nie udało się policzyć stron PDF.')
  }
}

//-----------------------------------------------------------------------------
//------ Export all helpers together
//-----------------------------------------------------------------------------

export { validatePDF, countPDFPages }
