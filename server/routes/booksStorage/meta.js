/**
 * @file routes/booksStorage/meta.js
 * @description
 * Endpoint to return PDF page metadata (width, height, rotation).
 */
import express from 'express'
import cors from 'cors'
import { extractPdfMetadata } from '../../controllers/pdfMetaController.js'
import { getGridFSFileBuffer } from '../../utils/gridFSFile.js'
import { getCorsOptions } from '../../config/cors/index.js'
import checkBookOwner from '../../middlewares/checkBookOwner.js'

const router = express.Router()
const corsOptions = getCorsOptions(process.env.BRANCH || process.env.NODE_ENV)

router.get('/:filename/meta', cors(corsOptions), checkBookOwner, async (req, res) => {
  try {
    const buffer = await getGridFSFileBuffer(req.params.filename)
    const metadata = await extractPdfMetadata(buffer)
    res.json(metadata)
  } catch (err) {
    console.error('[META ERROR]', err)
    res.status(500).json({ error: 'Could not extract PDF metadata' })
  }
})

export default router