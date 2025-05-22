/**
 * @file usePDFValidation.js
 * @description React hook that provides PDF file validation.
 */

import { useCallback } from 'react'

//-----------------------------------------------------------------------------
// Hook: usePDFValidation
//-----------------------------------------------------------------------------

/**
 * Provides a `validate` function to check if a File object is a PDF.
 * Shows an alert if validation fails.
 *
 * @returns {Object} An object with:
 *   - validate: (file: File) => boolean
 */
const usePDFValidation = () => {
  /**
   * Validates that the provided file is a PDF.
   *
   * @param {File} file - The file to validate
   * @returns {boolean} True if valid PDF, otherwise false
   */
  const validate = useCallback((file) => {
    if (!file || file.type !== 'application/pdf') {
      alert('Invalid file format. Please upload a PDF file.')
      return false
    }
    return true
  }, [])

  return { validate }
}

export default usePDFValidation
