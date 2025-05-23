/**
 * @file extractPDFMetadata.js
 * @description Extracts metadata from a PDF file using pdf.js: title, author, subject, keywords, language, creation date, and total pages.
 */

import * as pdfjsLib from 'pdfjs-dist'

//-----------------------------------------------------------------------------
// Function: extractPDFMetadata
//-----------------------------------------------------------------------------

/**
 * Reads PDF metadata and returns a structured object.
 *
 * @param {File} file - PDF file object selected by the user
 * @returns {Promise<Object>} Resolves with metadata:
 *   - title: string
 *   - author: string
 *   - subject: string
 *   - keywords: string[]
 *   - language: string
 *   - publicationDate: ISO string or null
 *   - publishedYear: number or null
 *   - totalPages: number
 */
export const extractPDFMetadata = async (file) => {
  // Load PDF document
  const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise

  // Read metadata
  const meta = await pdf.getMetadata()
  const info = meta.info || {}

  // Basic metadata fields with fallbacks
  const title = info.Title || file.name.replace(/\.pdf$/i, '')
  const author = info.Author || ''
  const subject = info.Subject || ''
  const keywords = info.Keywords ? info.Keywords.split(/\s*,\s*/) : []
 const language = info.Language?.trim() || 'unknown'



  // Parse CreationDate of format D:YYYYMMDDHHmmSS
  let publicationDate = null
  if (info.CreationDate) {
    const ds = info.CreationDate.replace(/^D:/, '')
    const year = ds.substr(0, 4)
    const month = ds.substr(4, 2) || '01'
    const day = ds.substr(6, 2) || '01'
    const hour = ds.substr(8, 2) || '00'
    const min = ds.substr(10, 2) || '00'
    const sec = ds.substr(12, 2) || '00'
    publicationDate = new Date(
      `${year}-${month}-${day}T${hour}:${min}:${sec}Z`
    ).toISOString()
  }

  // Extract year from publicationDate
  let publishedYear = null
  if (publicationDate) {
    publishedYear = new Date(publicationDate).getUTCFullYear()
  }

  // Total number of pages
  const totalPages = pdf.numPages

  return {
    title,
    author,
    subject,
    keywords,
    language,
    publicationDate,
    publishedYear,
    totalPages,
  }
}
