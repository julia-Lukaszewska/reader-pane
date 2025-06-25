import { renderPageImage } from '../PageImageController.js'

export const pageImage = async (req, res) => {
  const { filename, num } = req.params
  const scale = parseFloat(req.query.scale) || 1.0
  try {
    const img = await renderPageImage(filename, Number(num), scale)
    res.set('Content-Type', 'image/png')
    res.send(img)
  } catch (err) {
    console.error('[PAGE IMG ERROR]', err)
    if (err?.status === 400) {
      return res.status(400).json({ error: err.message })
    }
    res.status(500).json({ error: 'Failed to render page image' })
  }
}