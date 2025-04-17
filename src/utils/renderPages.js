//-----------------------------------------------------------------------------
//------ renderPages: Renders PDF pages to data URLs at a given scale  
//-----------------------------------------------------------------------------

/**
 * Renders individual PDF pages from `from` to `to` at a specific scale.
 * Skips pages that already exist in `renderedPages[scale]`.
 * Dispatches new pages and updates rendered range.
 */

export async function renderPages({
  pdf,
  scale,
  from,
  to,
  renderedPages,
  dispatch,
}) {
  if (!pdf || from > pdf.numPages) return // No PDF or invalid range  

  const pages = {} // Store rendered pages as image data URLs  

  for (let i = from; i <= Math.min(to, pdf.numPages); i++) {
    if (renderedPages?.[scale]?.[i]) continue // Skip already rendered page  

    try {
      const page = await pdf.getPage(i)
      const viewport = page.getViewport({ scale })

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      canvas.width = viewport.width
      canvas.height = viewport.height

      await page.render({ canvasContext: ctx, viewport }).promise

      const dataUrl = canvas.toDataURL('image/png') // Convert to image URL  

      pages[i] = {
        dataUrl,
        width: viewport.width,
        height: viewport.height,
      }
    } catch (err) {
      console.error(`Error rendering page ${i}:`, err)  
    }
  }

  if (Object.keys(pages).length > 0) {
    // Save rendered pages to context  
    dispatch({ type: 'ADD_RENDERED_PAGES', payload: { scale, pages } })

    // Optionally update range if not handled elsewhere  
    dispatch({
      type: 'SET_RENDERED_RANGE',
      payload: { scale, range: [from, to] },
    })
  }
}
