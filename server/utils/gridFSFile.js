import { getGridFsBucket } from '../config/gridfs.js'

export async function getGridFSFileBuffer(filename) {
  const bucket = getGridFsBucket()
  if (!bucket) throw new Error('[GridFS] Bucket not initialized')

  const filesColl = bucket.s.db.collection('books_files.files')
  const exists = await filesColl.findOne({ filename })
  if (!exists) throw new Error(`[GridFS] File "${filename}" not found`)

  const chunks = []
  await new Promise((resolve, reject) => {
    bucket
      .openDownloadStreamByName(filename)
      .on('data', chunk => chunks.push(chunk))
      .on('error', err => {
        console.error('[GridFS Stream Error]', err)
        reject(err)
      })
      .on('end', resolve)
  })
  return Buffer.concat(chunks)
}
