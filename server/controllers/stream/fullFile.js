import { getGridFsBucket } from '../../config/gridfs.js'
import rangeParser from 'range-parser'

export const fullFile = async (req, res) => {
  try {
    const { filename } = req.params
    const bucket = getGridFsBucket()
    const filesColl = bucket.s.db.collection('books_files.files')
    const fileDoc = await filesColl.findOne({ filename })
    if (!fileDoc) {
      return res.status(404).send('File not found')
    }

    const fileSize = fileDoc.length
    const rangeHeader = req.headers.range

    res.set({
      'Accept-Ranges': 'bytes',
      'Content-Type': 'application/pdf'
    })

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
        'Content-Length': chunkSize
      })

      console.log(`[STREAM] ${filename} \u2192 bytes ${start}-${chunkEnd}/${fileSize}`)

      return bucket
        .openDownloadStreamByName(filename, { start, end: chunkEnd + 1 })
        .on('error', err => {
          console.error('[STREAM ERROR]', err)
          res.destroy(err)
        })
        .pipe(res)
    }

    res.status(200).set('Content-Length', fileSize)
    console.log(`[STREAM] ${filename} \u2192 full (${fileSize} bytes)`)

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