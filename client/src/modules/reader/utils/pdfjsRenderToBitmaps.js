/**
 * @file src/utils/pdfjsRenderToBitmaps.js
 * @description
 * Renders a given range of pages from a PDF Blob into ImageBitmap objects using PDF.js.
 *
 * Features:
 * - Automatically configures the PDF.js worker source path
 * - Supports OffscreenCanvas for rendering when available
 * - Returns an array of objects with page number, bitmap, and dimensions
 *
 * Requirements:
 * - Worker script (pdf.worker.min.js) must be available at the specified path
 *
 * @param {Blob} blob - The PDF file as a Blob
 * @param {Object} opts - Rendering options
 * @param {number} opts.scale - Zoom level (e.g., 1.0)
 * @param {number} opts.start - First page number to render (1-based, inclusive)
 * @param {number} opts.end - Last page number to render (1-based, inclusive)
 * @returns {Promise<Array<{ pageNumber: number, bitmap: ImageBitmap, width: number, height: number }>>}
 */

//-----------------------------------------------------------------------------
// Imports & Worker Setup
//-----------------------------------------------------------------------------
import * as pdfjsLib from 'pdfjs-dist'

// Set the PDF.js worker source path once per project
if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
}

//-----------------------------------------------------------------------------
// Function: pdfjsRenderToBitmaps
//-----------------------------------------------------------------------------
export default async function pdfjsRenderToBitmaps(
  blob,
  { scale = 0.6, start, end }
) {
  const arrayBuffer = await blob.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

  const from = Math.max(1, start)
  const to = Math.min(end, pdf.numPages)

  // Prepare rendering tasks
  const tasks = []
  for (let pageNumber = from; pageNumber <= to; pageNumber++) {
    tasks.push(
      (async () => {
        const page = await pdf.getPage(pageNumber)
        const viewport = page.getViewport({ scale })

        const canvas =
          'OffscreenCanvas' in window
            ? new OffscreenCanvas(viewport.width, viewport.height)
            : Object.assign(document.createElement('canvas'), {
                width: viewport.width,
                height: viewport.height,
              })

        const ctx = canvas.getContext('2d')
        await page.render({ canvasContext: ctx, viewport }).promise

        const bitmap = await createImageBitmap(canvas)
        return {
          pageNumber,
          bitmap,
          width: bitmap.width,
          height: bitmap.height,
        }
      })()
    )
  }

  const results = await Promise.all(tasks)
  await pdf.destroy()
  return results
}
