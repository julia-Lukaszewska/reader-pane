/**
 * @file routes/booksStorage/range.js
 * @description
 * Streams a selected range of PDF pages.
 */
import express from 'express'
import cors from 'cors'
import { randomBytes } from 'crypto'

import checkBookOwner from '../../middlewares/checkBookOwner.js'
import { getCorsOptions } from '../../config/cors/index.js'
import { getGridFSFileBuffer } from '../../utils/gridFSFile.js'
import { getGridFsBucket, deleteFile } from '../../config/gridfs.js'
import { PDFDocument } from 'pdf-lib'
import { StreamBookController } from '../../controllers/StreamBookController.js'
import Book from '../../models/Book.js'
import { getExistingRange } from '../../utils/getExistingRange.js'
const router = express.Router()
const corsOptions = getCorsOptions(process.env.BRANCH || process.env.NODE_ENV)

router.get('/:filename/pages', cors(corsOptions), checkBookOwner, async (req, res, next) => {
  const start = parseInt(req.query.start, 10)
  const end = parseInt(req.query.end, 10)
  if (Number.isNaN(start) || Number.isNaN(end) || start < 1 || end < start) {
    return res.status(400).json({ error: 'Invalid start or end parameters' })
  }
  try {
         const pre = await getExistingRange(req.params.filename, start, end)
    if (pre) {
      console.log(`[RANGE CACHE] ${pre.filename}`)
      req.params.filename = pre.filename
      return StreamBookController(req, res)
    }

    console.log(`[RANGE DYNAMIC] ${req.params.filename} pages ${start}-${end}`)
    const buffer = await getGridFSFileBuffer(req.params.filename)
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
      try { await deleteFile(fileId) } catch (err) { console.error('[RANGE CLEANUP ERROR]', err) }
    })
console.log(`[RANGE TEMP STREAM] ${tempName}`)
    await StreamBookController(req, res)
  } catch (err) {
    next(err)
  }
})

export default router
