

import express from 'express'
import { getPdfBucket } from '../../setupGridFS.js'

const router = express.Router()

// GET /api/books/file/:filename
router.get('/file/:filename', async (req, res) => {
  const pdfBucket = getPdfBucket()
  if (!pdfBucket) {
    console.warn('[PDF STREAM]  pdfBucket not initialized')
    return res.status(503).send('PDF bucket not ready')
  }

  const { filename } = req.params
  const range = req.headers.range


  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Expose-Headers', 'Content-Length, Content-Range')


  const filesColl = pdfBucket.s.db.collection('pdfs.files')
  const fileDoc = await filesColl.findOne({ filename })
  if (!fileDoc) {
    console.warn(`[PDF STREAM]  File not found: ${filename}`)
    return res.status(404).send('File not found')
  }

  const fileSize = fileDoc.length


  if (!range) {
    console.log(`[PDF STREAM]  Sending full "${filename}" (${fileSize} bytes)`)
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': fileSize,
      'Accept-Ranges': 'bytes',
    })
    return pdfBucket.openDownloadStreamByName(filename).pipe(res)
  }


  const [startStr, endStr] = range.replace(/bytes=/, '').split('-')
  const start = Number(startStr)
  const end   = endStr ? Number(endStr) : fileSize - 1


  if (Number.isNaN(start) || start >= fileSize) {
    console.warn(`[PDF STREAM]  Invalid Range: "${range}", size = ${fileSize}`)
    res.setHeader('Content-Range', `bytes */${fileSize}`)
    return res.status(416).send('Requested Range Not Satisfiable')
  }

  const chunkSize = end - start + 1
  console.log(`[PDF STREAM]  Streaming "${filename}" [${start}-${end}] (${chunkSize} bytes)`)

  res.writeHead(206, {
    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
    'Accept-Ranges' : 'bytes',
    'Content-Length': chunkSize,
    'Content-Type'  : 'application/pdf',
  })

  pdfBucket
    .openDownloadStreamByName(filename, { start, end: end + 1 }) 
})

export default router
