/**
 * @file useUploadPDF.js
 * @description React hook that validates, extracts metadata, renders cover, and uploads a PDF book to the backend.
 */

import { useState } from 'react'
import { useUploadBookMutation } from '@/store/api/booksApi'
import usePDFValidation from './usePDFValidation'
import { extractPDFMetadata } from './extractPDFMetadata'
import { renderPDFCover } from './renderPDFCover'

//-----------------------------------------------------------------------------
// Hook: useUploadPDF
//-----------------------------------------------------------------------------

/**
 * Provides `handleUpload` for processing and uploading a PDF file,
 * along with an `uploading` state flag.
 *
 * @returns {Object} An object with:
 *   - handleUpload: async (file: File) => Promise<{ success: boolean, savedBook?: any }>
 *   - uploading: boolean
 */
const useUploadPDF = () => {
  //-------------------------------------------------------------------
  // Setup: RTK mutation, validation hook, loading state
  //-------------------------------------------------------------------
  const [uploadBook] = useUploadBookMutation()
  const { validate } = usePDFValidation()
  const [uploading, setUploading] = useState(false)

  //---------------------------------------------------------------------
  // Upload handler
  //----------------------------------------------------------------------
  /**
   * Validates the file, extracts PDF metadata and cover image, builds FormData,
   * and uploads to the backend.
   *
   * @param {File} file - PDF file to upload
   * @returns {Promise<{ success: boolean, savedBook?: any }>}
   */
    const handleUpload = async (file) => {
    // Validate PDF
    if (!validate(file)) return { success: false }

    setUploading(true)
    try {
      // Extract metadata from PDF
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

      // Generate cover image
      const cover = await renderPDFCover(file)

      // Build FormData
      const formData = new FormData()
      formData.append('file', file)
      formData.append('title', title)
      formData.append('author', author)
      formData.append('subject', subject)
      if (keywords.length) formData.append('keywords', keywords.join(','))
      if (language) formData.append('language', language)
      if (publicationDate) formData.append('publicationDate', publicationDate)
      if (publishedYear) formData.append('publishedYear', publishedYear)
      formData.append('totalPages', totalPages)
      formData.append('cover', cover)

      // Upload via API
      const savedBook = await uploadBook(formData).unwrap()

 // Ensure fileUrl is set inside meta for immediate use
      const fileUrl = savedBook.meta?.fileUrl || savedBook.fileUrl || ''
      return {
        success: true,
        savedBook: {
          ...savedBook,
          meta: {
            ...savedBook.meta,
            fileUrl,
          },
        },
      }
    } finally {
      setUploading(false)
    }
  }

  return { handleUpload, uploading }
}


export default useUploadPDF
