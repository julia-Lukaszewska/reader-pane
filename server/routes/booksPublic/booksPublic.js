// /**
//  * @file routes/booksPublic/booksPublic.js
//  * @description Express router for streaming public book PDF files from GridFS.
//  */

// import express from 'express'
// import { getGridFsBucket } from '../../config/gridfs.js'

// const router = express.Router()

// //------------------------------------------------------------------
// // GET /api/books/public/file/:filename
// // Streams PDF file from GridFS with support for Range requests.
// // Publicly accessible without authentication.
// //------------------------------------------------------------------
// router.get('/file/:filename', async (req, res) => {
//   const gridFsBucket = getGridFsBucket()
//   if (!gridFsBucket) {
//     console.warn('[GridFS STREAM] bucket not initialized')
//     return res.status(503).send('Bucket not ready')
//   }

//   const { filename } = req.params
//   const range = req.headers.range

//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Expose-Headers', 'Content-Length, Content-Range')

//   const filesColl = gridFsBucket.s.db.collection('books_files.files')
//   const fileDoc = await filesColl.findOne({ filename })
//   if (!fileDoc) {
//     console.warn(`[GridFS STREAM] File not found: ${filename}`)
//     return res.status(404).send('File not found')
//   }

//   const fileSize = fileDoc.length

//   // No Range header: return full file
//   if (!range) {
//     console.log(`[GridFS STREAM] Sending full "${filename}" (${fileSize} bytes)`)
//     res.set({
//       'Content-Type': 'application/pdf',
//       'Content-Length': fileSize,
//       'Accept-Ranges': 'bytes',
//     })
//     return gridFsBucket.openDownloadStreamByName(filename).pipe(res)
//   }

//   // With Range header: return partial content
//   const [startStr, endStr] = range.replace(/bytes=/, '').split('-')
//   const start = Number(startStr)
//   const end = endStr ? Number(endStr) : fileSize - 1

//   if (Number.isNaN(start) || start >= fileSize) {
//     console.warn(`[GridFS STREAM] Invalid Range: "${range}", size = ${fileSize}`)
//     res.setHeader('Content-Range', `bytes */${fileSize}`)
//     return res.status(416).send('Requested Range Not Satisfiable')
//   }

//   const chunkSize = end - start + 1
//   console.log(`[GridFS STREAM] Streaming "${filename}" [${start}-${end}] (${chunkSize} bytes)`)

//   res.writeHead(206, {
//     'Content-Range': `bytes ${start}-${end}/${fileSize}`,
//     'Accept-Ranges': 'bytes',
//     'Content-Length': chunkSize,
//     'Content-Type': 'application/pdf',
//   })

//   gridFsBucket.openDownloadStreamByName(filename, { start, end: end + 1 }).pipe(res)
// })

// export default router
