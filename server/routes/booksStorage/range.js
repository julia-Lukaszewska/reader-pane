/**
 * @file routes/booksStorage/range.js
 * @description
 * Streams a selected range of PDF pages.
 */

import express from 'express'
import cors from 'cors'
import { randomBytes } from 'crypto'
import { PDFDocument } from 'pdf-lib'

import checkBookOwner from '../../middlewares/checkBookOwner.js'
import { getCorsOptions } from '../../config/cors/index.js'
import { getGridFSFileBuffer } from '../../utils/gridFSFile.js'
import { getGridFsBucket, deleteFile } from '../../config/gridfs.js'
import { StreamBookController } from '../../controllers/StreamBookController.js'

const router = express.Router()
const corsOptions = getCorsOptions(process.env.BRANCH || process.env.NODE_ENV)

router.get('/:filename/pages', cors(corsOptions), checkBookOwner, async (req, res) => {
  const start = parseInt(req.query.start, 10)
  const end = parseInt(req.query.end, 10)

  if (Number.isNaN(start) || Number.isNaN(end) || start < 1 || end < start) {
    return res.status(400).json({ error: 'Invalid start or end parameters' })
  }

  try {
    const buffer = await getGridFSFileBuffer(req.params.filename)

    if (!buffer || !buffer.length) {
      console.error('[RANGE] Empty or missing file buffer:', req.params.filename)
      return res.status(404).json({ error: 'File not found or empty' })
    }

    const srcDoc = await PDFDocument.load(buffer)
    const total = srcDoc.getPageCount()
    const from = Math.min(start, total)
    const to = Math.min(end, total)

    const outDoc = await PDFDocument.create()
    const pages = await outDoc.copyPages(srcDoc, Array.from({ length: to - from + 1 }, (_, i) => from - 1 + i))
    pages.forEach(p => outDoc.addPage(p))
    const outBytes = await outDoc.save()

    const bucket = getGridFsBucket()
    const tempName = `tmp_${randomBytes(8).toString('hex')}.pdf`

    const fileId = await new Promise((resolve, reject) => {
      const up = bucket.openUploadStream(tempName, { contentType: 'application/pdf' })
      up.end(Buffer.from(outBytes), err => err ? reject(err) : resolve(up.id))
    })

    req.params.filename = tempName

    res.on('finish', async () => {
      try {
        await deleteFile(fileId)
      } catch (err) {
        console.error('[RANGE CLEANUP ERROR]', err)
      }
    })

    await StreamBookController(req, res)

  } catch (err) {
    console.error('[RANGE STREAM ERROR]', err)
    res.status(500).json({ error: 'Server error while streaming range' })
  }
})

export default router
