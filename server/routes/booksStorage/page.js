/**
 * @file routes/booksStorage/page.js
 * Endpoint for returning rendered PDF page images.
 */
import express from 'express'
import cors from 'cors'
import checkBookOwner from '../../middlewares/checkBookOwner.js'
import { getCorsOptions } from '../../config/cors/index.js'
import { renderPageImage } from '../../controllers/PageImageController.js'

const router = express.Router()
const corsOptions = getCorsOptions(process.env.BRANCH || process.env.NODE_ENV)

router.get('/:filename/page/:num', cors(corsOptions), checkBookOwner, async (req, res) => {
  const { filename, num } = req.params
  const scale = parseFloat(req.query.scale) || 1.0
  try {
    const img = await renderPageImage(filename, Number(num), scale)
    res.set('Content-Type', 'image/png')
    res.send(img)
  } catch (err) {
    console.error('[PAGE IMG ERROR]', err)
    res.status(500).json({ error: 'Failed to render page image' })
  }
})

export default router