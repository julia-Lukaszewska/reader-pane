/**
 * @file books-public.js
 * @description
 * Public route for serving PDF files from GridFS by filename.
 * Used by pdfjs-dist (no authentication required).
 */

import express from 'express'
import { pdfBucket } from '../setupGridFS.js'

const router = express.Router()

// ───────────────────────────────────────────────────────────
// GET /api/books/file/:filename – PUBLIC access to PDF stream
// ───────────────────────────────────────────────────────────
router.get('/file/:filename', async (req, res) => {
  try {
    const stream = pdfBucket.openDownloadStreamByName(req.params.filename)
    stream.on('error', () => res.status(404).send('File not found'))
    res.set('Content-Type', 'application/pdf')
    stream.pipe(res)
  } catch (err) {
    console.error('[PUBLIC FILE STREAM]', err)
    res.status(500).json({ error: 'Failed to stream PDF' })
  }
})

export default router
