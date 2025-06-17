/**
 * @file renderPages.js
 * @description
 * Renders a range of PDF pages into image bitmaps using canvas.
 * Supports aborting via signal and parallel rendering with concurrency control.
 */

//-----------------------------------------------------------------------------
// Function: renderPages
//-----------------------------------------------------------------------------
/**
 * Renders a set of PDF pages to image bitmaps using canvas.
 * Skips pages already present in renderedPages.
 *
 * @async
 * @function renderPages
 * @param {Object} params
 * @param {Object} params.pdf – Loaded PDF document (PDFDocumentProxy)
 * @param {number} params.scale – Zoom level
 * @param {number} params.from – First page to render (inclusive)
 * @param {number} params.to – Last page to render (inclusive)
 * @param {AbortSignal} [params.signal] – Optional abort controller signal
 * @param {Object} [params.renderedPages={}] – Previously rendered pages
 * @param {number} [params.concurrency=2] – Number of parallel render tasks
 * @returns {Promise<Object>} Map of newly rendered pages (keyed by page number)
 */
export default async function renderPages({
  pdf,
  scale,
  from,
  to,
  signal,
  renderedPages = {},
  concurrency = 2,
}) {
  console.log('[renderPages] start →', { from, to, scale, concurrency })

  //-----------------------------------------------------------------------------
  // Collect pages to render (exclude cached)
  //-----------------------------------------------------------------------------
  const pagesToRender = []
  for (let p = from; p <= to; p++) {
    if (!renderedPages[p]) pagesToRender.push(p)
  }
  const newPages = {}

  //-----------------------------------------------------------------------------
  // Helpers: wait() and retry()
  //-----------------------------------------------------------------------------
  const wait = ms => new Promise(r => setTimeout(r, ms))

  async function retry(fn, attempts = 3) {
    for (let i = 0; i < attempts; i++) {
      if (signal?.aborted) throw new DOMException('Aborted', 'AbortError')
      try {
        return await fn()
      } catch (err) {
        if (i === attempts - 1) throw err
        await wait(100 * (i + 1))
      }
    }
  }

  //-----------------------------------------------------------------------------
  // Render a single page
  //-----------------------------------------------------------------------------
  async function renderOne(pageNum) {
    try {
      console.log(`Rendering page ${pageNum}`)

      const page = await retry(() => pdf.getPage(pageNum))
      const viewport = page.getViewport({ scale })

      const canvas = typeof OffscreenCanvas !== 'undefined'
        ? new OffscreenCanvas(viewport.width, viewport.height)
        : Object.assign(document.createElement('canvas'), {
            width: viewport.width,
            height: viewport.height,
          })

      const ctx = canvas.getContext('2d')

      await retry(() => page.render({ canvasContext: ctx, viewport }).promise)

      const bitmap = canvas.transferToImageBitmap
        ? canvas.transferToImageBitmap()
        : await createImageBitmap(canvas)

      newPages[pageNum] = {
        bitmap,
        width: viewport.width,
        height: viewport.height,
      }

      console.log(`Finished page ${pageNum}`)
    } catch (err) {
      console.error(`Error rendering page ${pageNum}`, err)
    }
  }

  //-----------------------------------------------------------------------------
  // Render pages in batches
  //-----------------------------------------------------------------------------
  for (let i = 0; i < pagesToRender.length; i += concurrency) {
    const batch = pagesToRender.slice(i, i + concurrency)
    console.log('Rendering batch:', batch)
    await Promise.all(batch.map(renderOne))
  }

  //-----------------------------------------------------------------------------
  // Return rendered page data
  //-----------------------------------------------------------------------------
  console.log('[newPages final]', newPages)
  console.log('[renderPages] done, new:', Object.keys(newPages).length)
  return newPages
}
