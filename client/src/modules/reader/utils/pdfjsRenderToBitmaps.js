import * as pdfjsLib from 'pdfjs-dist'

/**
 * Renders a specified range of PDF pages to ImageBitmap objects using pdf.js.
 * Useful for converting pages to bitmap format before caching or displaying.
 *
 * @param {Blob} blob - The PDF file as a Blob object
 * @param {Object} options - Configuration options
 * @param {number} options.scale - Zoom level (e.g. 1.0 = 100%)
 * @param {number} options.start - First page number to render (1-based, inclusive)
 * @param {number} options.end - Last page number to render (1-based, inclusive)
 * @returns {Promise<Array<{ pageNumber: number, bitmap: ImageBitmap }>>}
 *   An array of rendered pages as ImageBitmaps, each with its page number
 */
export default async function pdfjsRenderToBitmaps(blob, { scale = 1.0, start, end }) {
  // Convert blob to ArrayBuffer for use with PDF.js
  const arrayBuffer = await blob.arrayBuffer()

  // Load PDF document from the ArrayBuffer
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

  const totalPages = pdf.numPages
  const from = Math.max(1, start)
  const to = Math.min(end, totalPages)

  const result = []

  for (let pageNumber = from; pageNumber <= to; pageNumber++) {
    const page = await pdf.getPage(pageNumber)
    const viewport = page.getViewport({ scale })

    // Create an off-screen canvas
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = viewport.width
    canvas.height = viewport.height

    // Render the page into the canvas
    await page.render({ canvasContext: context, viewport }).promise

    // Convert canvas to ImageBitmap for performance and efficient storage
    const bitmap = await createImageBitmap(canvas)

    result.push({ pageNumber, bitmap })
  }

  return result
}
