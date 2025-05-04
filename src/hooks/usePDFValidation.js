import { useCallback } from 'react' // React hook  

// -----------------------------------------------------------------------------
//------ usePDFValidation hook  
// -----------------------------------------------------------------------------

/**
 * Hook used to validate uploaded file type.
 * Returns a function that checks whether a file is a valid PDF.
 */
const usePDFValidation = () => {
  /**
   * Validates file type based on MIME type.
   * Alerts user if the file is not a PDF.
   */
  const validate = useCallback((file) => {
    if (!file || file.type !== 'application/pdf') {
      alert('Invalid file format. Please upload a PDF file.') // Show error alert in English  
      return false
    }
    return true
  }, [])

  return { validate } // Return validation function  
}

export { usePDFValidation } 
