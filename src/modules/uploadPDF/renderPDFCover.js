/**
 * @file renderPDFCover.js
 * @description Renders the first page of a PDF file as a PNG data URL for use as a cover image.
 */

import * as pdfjsLib from 'pdfjs-dist'

//-----------------------------------------------------------------------------
// Function: renderPDFCover
//-----------------------------------------------------------------------------

/**
 * Renders page 1 of a PDF file into an image data URL.
 *
 * @param {File} file - PDF file object
 * @returns {Promise<string>} Base64-encoded PNG data URL of the rendered cover
 */
export const renderPDFCover = async (file) => {
  // Load the PDF document
  const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise

  // Get the first page
  const page = await pdf.getPage(1)
  const viewport = page.getViewport({ scale: 1 })

  // Create canvas to render page
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  canvas.width = viewport.width
  canvas.height = viewport.height

  // Render the page into the canvas
  await page.render({ canvasContext: context, viewport }).promise

  // Return PNG data URL
  return canvas.toDataURL('image/png')
}
