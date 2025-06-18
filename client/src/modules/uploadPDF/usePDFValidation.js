/**
 * @file usePDFValidation.js
 * @description React hook that provides PDF file validation (type and size).
 */

import { useCallback } from 'react'

//-----------------------------------------------------------------------------
// Hook: usePDFValidation
//-----------------------------------------------------------------------------

/**
 * Provides a `validate` function to check if a File object:
 * - is a PDF (application/pdf)
 * - does not exceed the size limit (default: 20 MB)
 *
 * Shows an alert if validation fails.
 *
 * @returns {Object} An object with:
 *   - validate: (file: File) => boolean
 */
const usePDFValidation = () => {
  const MAX_SIZE_MB = 50
  const validate = useCallback((file) => {
    if (!file) {
      alert('No file selected.')
      return false
    }

    if (file.type !== 'application/pdf') {
      alert('Invalid file format. Please upload a PDF file.')
      return false
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert(`File too large. Maximum allowed size is ${MAX_SIZE_MB} MB.`)
      return false
    }

    return true
  }, [])

  return { validate }
}

export default usePDFValidation
