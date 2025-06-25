import { getGridFSFileBuffer } from '../../utils/gridFSFile.js'
import { getGridFsBucket, deleteFile } from '../../config/gridfs.js'
import { PDFDocument } from 'pdf-lib'
import { randomBytes } from 'crypto'
import { fullFile } from './fullFile.js'

export const dynamicRange = async (req, res, next) => {
  const start = parseInt(req.query.start, 10)
  const end = parseInt(req.query.end, 10)
  if (Number.isNaN(start) || Number.isNaN(end) || start < 1 || end < start) {
    return res.status(400).json({ error: 'Invalid start or end parameters' })
  }
  try {
    console.log(`[RANGE DYNAMIC] ${req.params.filename} pages ${start}-${end}`)
    const buffer = await getGridFSFileBuffer(req.params.filename)
    const srcDoc = await PDFDocument.load(buffer)
    const total = srcDoc.getPageCount()
    const from = Math.min(start, total)
    const to = Math.min(end, total)

    const outDoc = await PDFDocument.create()
    const pages = await outDoc.copyPages(
      srcDoc,
      Array.from({ length: to - from + 1 }, (_, i) => from - 1 + i)
    )
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
        console.error('[RANGE CLEAN UP ERROR]', err)
      }
    })
    console.log(`[RANGE TEMP STREAM] ${tempName}`)
    await fullFile(req, res)
  } catch (err) {
    next(err)
  }
}
