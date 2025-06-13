/**
 * @file StreamBookController.js
 * @description
 * Controller for streaming a PDF file from GridFS by filename.
 * 1) Finds file by filename
 * 2) Streams file (with support for Range header)
 * 3) Sets correct headers and status
 */

import { getGridFsBucket } from '../config/gridfs.js'

export const StreamBookController = async (req, res) => {
  try {
    const bucket = getGridFsBucket()
    const { filename } = req.params

    console.log('[STREAM → start]', {
      filename,
      userId: req.user?.id,
      rangeHeader: req.headers.range,
    })

    const filesColl = bucket.s.db.collection('books_files.files')
    const fileDoc = await filesColl.findOne({ filename })
    if (!fileDoc) {
      return res.status(404).send('File not found')
    }

    const fileSize = fileDoc.length
    const range = req.range

    console.log('[STREAM → file found]', {
      fileSize,
      rangeParsed: range,
    })

    // --- PARTIAL REQUEST (with Range header)
    if (range && typeof range.start === 'number') {
      const { start, end } = range

      if (start >= fileSize) {
        res.setHeader('Content-Range', `bytes */${fileSize}`)
        return res.status(416).send('Requested Range Not Satisfiable')
      }

      const chunkEnd = typeof end === 'number' ? end : fileSize - 1
      const chunkSize = chunkEnd - start + 1

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${chunkEnd}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'application/pdf',
      })

      console.log('[STREAM]', filename, '→ range', `${start}-${chunkEnd} / ${fileSize}`)

      bucket
        .openDownloadStreamByName(filename, { start, end: chunkEnd + 1 })
        .pipe(res)

    } else {
      // --- FULL REQUEST (no Range header)
      res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Length': fileSize,
        'Accept-Ranges': 'bytes',
      })

      console.log('[STREAM]', filename, '→ full file')

      bucket.openDownloadStreamByName(filename).pipe(res)
    }

  } catch (err) {
    console.error('[STREAM PDF ERROR]', {
      filename: req.params?.filename,
      error: err?.message,
    })
    res.status(500).json({ error: 'Unable to stream file' })
  }
}
