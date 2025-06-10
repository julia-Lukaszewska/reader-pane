/**
 * @file useUploadPDF.js
 * @description React hook that validates, extracts metadata, renders cover,
 *              and uploads a PDF book to the backend (GridFS).
 */

import { useUploadBookMutation } from '@/store/api/booksPrivateApi'
import usePDFValidation from './usePDFValidation'
import { extractPDFMetadata } from './extractPDFMetadata'
import { renderPDFCover } from './renderPDFCover'

//-----------------------------------------------------------------------------
// Hook: useUploadPDF
//-----------------------------------------------------------------------------

/**
 * Provides `handleUpload` for processing and uploading a PDF file,
 * along with an `uploading` state flag from RTK Query.
 *
 * @returns {Object} {
 *   handleUpload: async (file: File) => Promise<{ success: boolean, savedBook?: any, error?: string }>,
 *   uploading: boolean
 * }
 */
const useUploadPDF = () => {
  //-------------------------------------------------------------------
  // Setup: RTK mutation + validation hook
  //-------------------------------------------------------------------
  const [uploadBook, { isLoading: uploading }] = useUploadBookMutation()
  const { validate } = usePDFValidation()

  //-------------------------------------------------------------------
  // Upload handler
  //-------------------------------------------------------------------
  /**
   * Validates the file, extracts PDF metadata and cover image, builds
   * FormData, and uploads it to the backend.
   *
   * @param {File} file - PDF file to upload
   * @returns {Promise<{ success: boolean, savedBook?: any, error?: string }>}
   */
  const handleUpload = async (file) => {
    // 1) Validate PDF (type, size etc.)
    if (!validate(file)) return { success: false, error: 'Invalid file' }

    try {
      //-----------------------------------------------------------------
      // 2) Extract metadata from PDF
      //-----------------------------------------------------------------
      const {
        title,
        author,
        subject,
        keywords,
        language,
        publicationDate,
        publishedYear,
        totalPages,
      } = await extractPDFMetadata(file)

      //-----------------------------------------------------------------
      // 3) Generate cover image (base64 PNG)
      //-----------------------------------------------------------------
      const cover = await renderPDFCover(file)

      //-----------------------------------------------------------------
      // 4) Build FormData
      //-----------------------------------------------------------------
      const formData = new FormData()
      formData.append('pdf', file)
      formData.append('title', title)
      formData.append('author', author)
      formData.append('subject', subject)
      if (keywords.length)   formData.append('keywords', keywords.join(','))
      if (language)          formData.append('language', language)
      if (publicationDate)   formData.append('publicationDate', publicationDate)
      if (publishedYear)     formData.append('publishedYear', publishedYear)
      formData.append('totalPages', totalPages)
      formData.append('cover', cover)

      //-----------------------------------------------------------------
      // 5) Upload via API
      //-----------------------------------------------------------------
      const savedBook = await uploadBook(formData).unwrap()
      return { success: true, savedBook }

    } catch (error) {
      console.error('[Upload Error]', error)
      return { success: false, error: error.message || 'Upload failed' }
    }
  }

  return { handleUpload, uploading }
}

export default useUploadPDF
