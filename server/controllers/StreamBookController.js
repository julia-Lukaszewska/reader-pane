/**
 * @file StreamBookController.js
 * @description
 * Streams a PDF from GridFS by filename, with full support for byte‐range requests.
 */
import { getGridFsBucket } from '../config/gridfs.js'
import rangeParser from 'range-parser'

//-----------------------------------------------------
//------ StreamBookController Function
//-----------------------------------------------------
/**
 * @async
 * @function StreamBookController
 * @description
 * Express handler that streams PDF files from GridFS, handling:
 *  - Byte-range requests for partial content (206)
 *  - Full-file downloads (200)
 *  - Proper CORS headers and error handling
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const StreamBookController = async (req, res) => {
  try {
    const { filename } = req.params
    const bucket = getGridFsBucket()

    //-------------------------------------------------
    //------  Find File Metadata
    //-------------------------------------------------
    const filesColl = bucket.s.db.collection('books_files.files')
    const fileDoc = await filesColl.findOne({ filename })
    if (!fileDoc) {
      return res.status(404).send('File not found')
    }

    const fileSize = fileDoc.length
    const rangeHeader = req.headers.range

    //-------------------------------------------------
    //------ Common Response Headers
    //-------------------------------------------------
    res.set({
      'Accept-Ranges': 'bytes',
      'Content-Type': 'application/pdf',
    })

    //-------------------------------------------------
    //------ Handle Range Requests
    //-------------------------------------------------
    if (rangeHeader) {
      const ranges = rangeParser(fileSize, rangeHeader, { combine: true })
      if (ranges === -1 || ranges === -2 || ranges.length === 0) {
        res.set('Content-Range', `bytes */${fileSize}`)
        return res.status(416).send('Requested Range Not Satisfiable')
      }

      const { start, end } = ranges[0]
      const chunkEnd = typeof end === 'number' ? end : fileSize - 1
      const chunkSize = chunkEnd - start + 1

      res.status(206).set({
        'Content-Range': `bytes ${start}-${chunkEnd}/${fileSize}`,
        'Content-Length': chunkSize,
      })

      console.log(`[STREAM] ${filename} → bytes ${start}-${chunkEnd}/${fileSize}`)

      return bucket
        .openDownloadStreamByName(filename, { start, end: chunkEnd + 1 })
        .on('error', err => {
          console.error('[STREAM ERROR]', err)
          res.destroy(err)
        })
        .pipe(res)
    }

    //-------------------------------------------------
    //------  Stream Full File
    //-------------------------------------------------
    res.status(200).set('Content-Length', fileSize)
    console.log(`[STREAM] ${filename} → full (${fileSize} bytes)`)

    return bucket
      .openDownloadStreamByName(filename)
      .on('error', err => {
        console.error('[STREAM ERROR]', err)
        res.destroy(err)
      })
      .pipe(res)

  } catch (err) {
    console.error('[STREAM PDF ERROR]', err)
    return res.status(500).json({ error: 'Unable to stream file' })
  }
}
