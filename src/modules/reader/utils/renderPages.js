/**
 * @file renderPages.js
 * @description Renders a range of PDF pages to image data URLs at a given scale.
 */



//-----------------------------------------------------------------------------
// Function: renderPages
//-----------------------------------------------------------------------------

/**
 * Renders pages from `from` to `to` using `pdf.getPage` and returns new images.
 *
 * Skips pages already present in `renderedPages`.
 *
 * @param {Object} params
 * @param {Object} params.pdf - PDFJS document instance
 * @param {number} params.scale - Zoom scale for rendering
 * @param {number} params.from - First page number to render (1-based)
 * @param {number} params.to - Last page number to render (inclusive)
 * @param {Object} params.renderedPages - Map of already-rendered pages `{ [page]: {...} }`
 * @returns {Promise<Object>} Map of newly rendered pages, keyed by page number
 */
export default async function renderPages({
  pdf,
  scale,
  from,
  to,
  renderedPages,
}) {
  console.log('[renderPages] start →', { from, to, scale })

  // Guard: ensure PDF document is available
  if (!pdf) {
    console.warn('[renderPages] No PDF document → aborting')
    return {}
  }

  const already = renderedPages || {}
  const newPages = {}

  // Render each page in the specified range
  for (let i = from; i <= to; i++) {
    if (already[i]) {
      console.log(`[renderPages] Page ${i} already rendered → skipping`)
      continue
    }
    try {
      console.log(`[renderPages] Rendering page ${i}`)

      const page = await pdf.getPage(i)
      const viewport = page.getViewport({ scale })

      // Create canvas for rendering
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      canvas.width = viewport.width
      canvas.height = viewport.height

      // Render page into canvas
      await page.render({ canvasContext: ctx, viewport }).promise

      // Store rendered image data
      newPages[i] = {
        id: `p${i}-s${scale}`,
        dataUrl: canvas.toDataURL('image/png'),
        width: viewport.width,
        height: viewport.height,
        pageNumber: i,
      }

      canvas.remove()
    } catch (err) {
      console.error(`[renderPages] Error rendering page ${i}:`, err)
    }
  }

  console.log('[renderPages] done → total new pages:', Object.keys(newPages).length)
  return newPages
}
