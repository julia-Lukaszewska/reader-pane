/**
 * @file usePrepareBookMetadata.js
 * @description React hook that prepares complete book metadata by extracting PDF metadata and rendering the cover image.
 */

import { extractPDFMetadata } from './extractPDFMetadata'
import { renderPDFCover } from './renderPDFCover'

//-----------------------------------------------------------------------------
// Hook: usePrepareBookMetadata
//-----------------------------------------------------------------------------

/**
 * Provides a `prepareMetadata` function that:
 * 1. Extracts metadata (title, author, pages, etc.) from a PDF file.
 * 2. Renders the first page as a cover image.
 *
 * @returns {Object} An object with:
 *   - prepareMetadata: async (file: File) => Promise<Object>
 *       Resolves to metadata object including `cover` (data URL).
 */
export const usePrepareBookMetadata = () => {
  /**
   * Extracts metadata and cover image from the PDF file.
   *
   * @param {File} file - PDF file object to process
   * @returns {Promise<Object>} Metadata object with properties:
   *   - title, author, subject, keywords, language
   *   - publicationDate, publishedYear, totalPages
   *   - cover: base64 PNG data URL
   */
  const prepareMetadata = async (file) => {
    const meta = await extractPDFMetadata(file)
    const cover = await renderPDFCover(file)
    return { ...meta, cover }
  }

  return { prepareMetadata }
}
