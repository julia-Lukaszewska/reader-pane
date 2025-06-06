/**
 * @file books-public.js
 * @description
 * Public route for serving PDF files from GridFS by filename.
 * Used by pdfjs-dist (no authentication required).
 */

import express from 'express'
import { getPdfBucket } from '../../setupGridFS.js'

const router = express.Router()

// ───────────────────────────────────────────────────────────
// GET /api/books/file/:filename – PUBLIC access to PDF stream
// ───────────────────────────────────────────────────────────
router.get('/file/:filename', async (req, res) => {
  const pdfBucket = getPdfBucket()
  try {
    if (!pdfBucket) {
      console.warn('[PDF STREAM]  pdfBucket not initialized')
      return res.status(503).send('PDF bucket not ready')
    }

    const { filename } = req.params
    const range = req.headers.range

 

    const filesColl = pdfBucket.s.db.collection('pdfs.files')
    const fileDoc = await filesColl.findOne({ filename })

    if (!fileDoc) {
      console.warn(`[PDF STREAM]  File not found: ${filename}`)
      return res.status(404).send('File not found')
    }
if (!range) {
      console.log(`[PDF STREAM]  Sending full "${filename}" (${fileDoc.length} bytes)`)
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Length': fileDoc.length,
        'Accept-Ranges': 'bytes',
      })
      return pdfBucket.openDownloadStreamByName(filename).pipe(res)
    }
    const fileSize = fileDoc.length
    const [startStr, endStr] = range.replace(/bytes=/, '').split('-')
    const start = parseInt(startStr, 10)
    const end = endStr ? parseInt(endStr, 10) : fileSize - 1

    //  Invalid range – return 416
    if (isNaN(start) || start >= fileSize) {
      console.warn(`[PDF STREAM]  Invalid Range: ${range}, fileSize: ${fileSize}`)
      res.setHeader('Content-Range', `bytes */${fileSize}`)
      return res.status(416).send('Requested Range Not Satisfiable')
    }

    const chunkSize = end - start + 1

    console.log(`[PDF STREAM]  Streaming "${filename}" [${start}-${end}] (${chunkSize} bytes)`)

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
