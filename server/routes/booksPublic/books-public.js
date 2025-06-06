/**
 * @file books-public.js
 * @description
 * Public route for serving PDF files from GridFS by filename.
 * Used by pdfjs-dist (no authentication required).
 */

import express from 'express'
import { pdfBucket } from '../../setupGridFS.js'

const router = express.Router()

// ───────────────────────────────────────────────────────────
// GET /api/books/file/:filename – PUBLIC access to PDF stream
// ───────────────────────────────────────────────────────────
router.get('/file/:filename', async (req, res) => {
  try {
    if (!pdfBucket) {
      return res.status(503).send('PDF bucket not ready')
    }

    const { filename } = req.params
    const range = req.headers.range
    if (!range) {
      res.setHeader('Accept-Ranges', 'bytes')
      return res.status(416).send('Range header required')
    }

    const filesColl = pdfBucket.s.db.collection('pdfs.files')
    const fileDoc = await filesColl.findOne({ filename })
    if (!fileDoc) return res.status(404).send('File not found')

    const fileSize = fileDoc.length
    const parts = range.replace(/bytes=/, '').split('-')
    const start = parseInt(parts[0], 10)
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
    const chunkSize = end - start + 1

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'application/pdf',
    })

    pdfBucket
      .openDownloadStreamByName(filename, { start, end: end + 1 })
      .pipe(res)
  } catch (err) {
    console.error('[PDF STREAM ERROR]', err)
    res.status(500).send('Error streaming PDF')
  }
})


export default router
