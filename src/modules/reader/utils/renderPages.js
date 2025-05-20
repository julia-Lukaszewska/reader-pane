export default async function renderPages({
  pdf,
  scale,
  from,
  to,
  renderedPages,
}) {
  console.log('[renderPages] start →', { from, to, scale })

  if (!pdf) {
    console.warn('[renderPages] No PDF document provided → aborting')
    return {}
  }

  const already   = renderedPages || {}
  const newPages  = {}

  for (let i = from; i <= to; i++) {
    if (already[i]) {
      console.log(`[renderPages] Page ${i} already rendered → skipping`)
      continue
    }
    try {
      console.log(`[renderPages] Rendering page ${i}…`)
      const page     = await pdf.getPage(i)
      const viewport = page.getViewport({ scale })
      const canvas   = document.createElement('canvas')
      const ctx      = canvas.getContext('2d')

      canvas.width  = viewport.width
      canvas.height = viewport.height

      await page.render({ canvasContext: ctx, viewport }).promise

      newPages[i] = {
        dataUrl:    canvas.toDataURL('image/png'),
        width:      viewport.width,
        height:     viewport.height,
        pageNumber: i,
      }

      console.log(`[renderPages] Page ${i} rendered ✓`)
      canvas.remove()
    } catch (err) {
      console.error(`[renderPages] Error rendering page ${i}:`, err)
    }
  }

  console.log('[renderPages] done → total new pages:', Object.keys(newPages).length)
  return newPages
}