//-----------------------------------------------------------------------------
//------ renderPages: Renders PDF pages to data URLs at a given scale 
//-----------------------------------------------------------------------------

import { addRenderedPages, setRenderedRange } from '@/store' // Redux actions 

const renderPages = async ({
  pdf,
  scale,
  from,
  to,
  renderedPages,
  dispatch,
}) => {
  if (!pdf || from > pdf.numPages) return // No PDF or invalid range 

  const pages =  // Collect newly rendered pages 

  for (let i = from; i <= Math.min(to, pdf.numPages); i++) {
    if (renderedPages?.[scale]?.[i]) continue // Skip if already rendered 

    try {
      const page = await pdf.getPage(i) // Get page object 
      const viewport = page.getViewport({ scale }) // Compute viewport 

      const canvas = document.createElement('canvas') // Create canvas 
      const ctx = canvas.getContext('2d') // Get context 

      canvas.width = viewport.width // Set width 
      canvas.height = viewport.height // Set height 

      await page.render({ canvasContext: ctx, viewport }).promise // Render page 

      const dataUrl = canvas.toDataURL('image/png') // Convert to data URL 

      pages[i] = { dataUrl, width: viewport.width, height: viewport.height } // Store page 
    } catch (err) {
      console.error(`Error rendering page ${i}:`, err) // Log error 
    }
  }

  if (Object.keys(pages).length > 0) {
    // Dispatch under key = scale so cache works correctly
    dispatch(addRenderedPages({ [scale]: pages })) // Add pages to cache 
    dispatch(setRenderedRange({ scale, range: [from, to] })) // Track rendered range 
  }
}

export default renderPages // Export as default 
