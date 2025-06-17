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

  const newPages = {}

  const wait = (ms) => new Promise((r) => setTimeout(r, ms))

  async function renderOne(pageNum) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError')

    let page
    for (let i = 0; ; i++) {
      try {
        page = await pdf.getPage(pageNum)
        break
      } catch (err) {
        if (i >= 2) throw err
        await wait(100 * (i + 1))
      }
    }

    const viewport = page.getViewport({ scale })

    const canvas =
      typeof OffscreenCanvas !== 'undefined'
        ? new OffscreenCanvas(viewport.width, viewport.height)
        : Object.assign(document.createElement('canvas'), {
            width: viewport.width,
            height: viewport.height,
          })

    const ctx = canvas.getContext('2d')

    for (let i = 0; ; i++) {
      if (signal?.aborted) throw new DOMException('Aborted', 'AbortError')
      try {
        await page.render({ canvasContext: ctx, viewport }).promise
        break
      } catch (err) {
        if (i >= 2) throw err
        await wait(100 * (i + 1))
      }
    }

    const bitmap = canvas.transferToImageBitmap
      ? canvas.transferToImageBitmap()
      : await createImageBitmap(canvas)

    newPages[pageNum] = {
      bitmap,
      width: viewport.width,
      height: viewport.height,
    }
  }


  const queue = [...toRender]
  while (queue.length) {
    const batch = queue.splice(0, concurrency)
    await Promise.all(batch.map((n) => renderOne(n)))
  }

  console.log('[🔎 newPages final]', newPages)
  console.log('[renderPages] done, new:', Object.keys(newPages).length)

  return newPages
}
