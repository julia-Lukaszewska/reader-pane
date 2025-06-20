import { getGridFsBucket } from '../config/gridfs.js'

export async function getGridFSFileBuffer(filename) {
  const bucket = getGridFsBucket()
  if (!bucket) throw new Error('GridFS bucket not initialized')

  const chunks = []
  await new Promise((resolve, reject) => {
    bucket
      .openDownloadStreamByName(filename)
      .on('data', chunk => chunks.push(chunk))
      .on('error', reject)
      .on('end', resolve)
  })
  return Buffer.concat(chunks)
}
