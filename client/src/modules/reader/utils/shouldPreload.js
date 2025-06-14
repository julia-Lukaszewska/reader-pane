/**
 * @file renderPages.js
 * @description Renders a range of PDF pages to Blob URLs at a given scale, with
 *              cancellation, concurrency control, retry/backoff, and OffscreenCanvas support.
 */

/**
 * @typedef {Object} RenderedPage
 * @property {string} id          Unique identifier for the rendered page
 * @property {string} blobUrl     Object URL of the rendered image blob
 * @property {number} width       Rendered width
 * @property {number} height      Rendered height
 * @property {number} pageNumber  1-based page index
 */

/**
 * Renders pages in the specified range, skipping those already rendered.
 * Supports cancellation (AbortSignal), limited concurrency, retry/backoff,
 * OffscreenCanvas where available, and returns Blob URLs instead of data URLs.
 *
 * @param {Object} params
 * @param {PDFDocumentProxy} params.pdf             PDFJS document instance
 * @param {number}           params.scale           Zoom scale (must be > 0)
 * @param {number}           params.from            First page to render (1-based)
 * @param {number}           params.to              Last page to render (inclusive)
 * @param {Object<number, RenderedPage>} params.renderedPages  Map of already-rendered pages
 * @param {AbortSignal}     [params.signal]        Optional AbortSignal to cancel rendering
 * @param {number}          [params.concurrency=2] Max parallel renders
 * @returns {Promise<Object<number, RenderedPage>>} Newly rendered pages map
 */
export default async function renderPages({
  pdf,
  scale,
  from,
  to,
  renderedPages = {},
  signal,
  concurrency = 2,
}) {
  console.log('[renderPages] start →', { from, to, scale, concurrency });

  // Guard: ensure PDF document and valid params
  if (!pdf) {
    console.warn('[renderPages] No PDF document → aborting');
    return {};
  }
  if (scale <= 0) {
    throw new Error('[renderPages] Invalid scale, must be > 0');
  }
  const numPages = pdf.numPages;
  if (from < 1 || to > numPages || from > to) {
    throw new Error(
      `[renderPages] Invalid page range: from=${from} to=${to}, PDF has ${numPages} pages`
    );
  }

  const toRender = [];
  for (let i = from; i <= to; i++) {
    if (!renderedPages[i]) toRender.push(i);
  }
  const newPages = {};

  // Helper: wait for ms
  const wait = ms => new Promise(res => setTimeout(res, ms));

  // Render a single page with retry/backoff
  async function renderOne(pageNum) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');

    // Fetch page with retries
    let page;
    for (let attempt = 0; ; attempt++) {
      try {
        page = await pdf.getPage(pageNum);
        break;
      } catch (err) {
        if (attempt >= 2) throw err;
        await wait(100 * (attempt + 1));
      }
    }

    const viewport = page.getViewport({ scale });

    // Create canvas (OffscreenCanvas if available)
    const canvas =
      typeof OffscreenCanvas !== 'undefined'
        ? new OffscreenCanvas(viewport.width, viewport.height)
        : document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!(canvas instanceof OffscreenCanvas)) {
      canvas.width = viewport.width;
      canvas.height = viewport.height;
    }

    // Render with retries
    for (let attempt = 0; ; attempt++) {
      if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
      try {
        await page.render({ canvasContext: ctx, viewport }).promise;
        break;
      } catch (err) {
        if (attempt >= 2) throw err;
        await wait(100 * (attempt + 1));
      }
    }

    // Convert to Blob
    const blob = await new Promise(resolve => {
      if (canvas.convertToBlob) {
        canvas.convertToBlob({ type: 'image/png' }).then(resolve);
      } else {
        canvas.toBlob(resolve, 'image/png');
      }
    });

    const blobUrl = URL.createObjectURL(blob);
    const id = `p${pageNum}-s${scale}`;
    newPages[pageNum] = {
      id,
      blobUrl,
      width: viewport.width,
      height: viewport.height,
      pageNumber: pageNum,
    };

    // Clean up DOM canvas
    if (!(canvas instanceof OffscreenCanvas)) {
      canvas.remove();
    }
  }

  // Process pages in batches
  const queue = [...toRender];
  while (queue.length > 0) {
    const batch = queue.splice(0, concurrency);
    await Promise.all(batch.map(num => renderOne(num)));
  }

  console.log(
    '[renderPages] done → total new pages:',
    Object.keys(newPages).length
  );
  return newPages;
}
