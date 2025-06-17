export default async function renderPages({
  pdf,
  scale,
  from,
  to,
  renderedPages = {},
  signal,
  concurrency = 2,
}) {
  console.log('[renderPages] start →', { from, to, scale, concurrency })

  const toRender = []
  for (let i = from; i <= to; i++) {
    if (!renderedPages[i]) toRender.push(i)
  }

  //---------------------------------------------------
  // Setup and retry helper
  //---------------------------------------------------
  const newPages = {}
  const wait = ms => new Promise(r => setTimeout(r, ms))

  async function renderOne(pageNum) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError')

    // 1. get page
    let page
    for (let attempt = 0;; attempt++) {
      try {
        page = await pdf.getPage(pageNum)
        break
      } catch (err) {
        if (attempt >= 2) throw err
        await wait(100 * (attempt + 1))
      }
    }

    // 2. prepare canvas
    const viewport = page.getViewport({ scale })
    const canvas = typeof OffscreenCanvas !== 'undefined'
      ? new OffscreenCanvas(viewport.width, viewport.height)
      : Object.assign(document.createElement('canvas'), {
          width: viewport.width,
          height: viewport.height,
        })
    const ctx = canvas.getContext('2d')

    // 3. Render page to canvas
    for (let attempt = 0;; attempt++) {
      if (signal?.aborted) throw new DOMException('Aborted', 'AbortError')
      try {
        await page.render({ canvasContext: ctx, viewport }).promise
        break
      } catch (err) {
        if (attempt >= 2) throw err
        await wait(100 * (attempt + 1))
      }
    }

    // 4. Convert canvas to Blob URL
    const blob = canvas.convertToBlob
      ? await canvas.convertToBlob()
      : await new Promise(res => canvas.toBlob(res))
    const url = URL.createObjectURL(blob)

    newPages[pageNum] = {
      url,
      width: viewport.width,
      height: viewport.height,
    }
  }

  // Queue rendering with limited concurrency
  const queue = [...toRender]
  while (queue.length) {
    const batch = queue.splice(0, concurrency)
    await Promise.all(batch.map(pageNum => renderOne(pageNum)))
  }

  console.log('[ newPages final]', newPages)
  console.log('[renderPages] done, new:', Object.keys(newPages).length)
  return newPages
}
