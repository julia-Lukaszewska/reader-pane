/**
 * @file setupGridFS.js
 * @description
 * Creates and exports a single GridFS bucket instance (bucketName: "pdfs").
 * Exports helpers to stream and delete files from GridFS.
 */

import mongoose from 'mongoose'
import { GridFSBucket, ObjectId } from 'mongodb'

// -----------------------------------------------------------------------------
// INIT BUCKET – One shared GridFS bucket across the app
// -----------------------------------------------------------------------------

let pdfBucket = null

mongoose.connection.once('open', () => {
  pdfBucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: 'pdfs',
  })
  console.log('[GridFS] Bucket "pdfs" initialised')
})

/**
 * Returns initialized GridFSBucket instance.
 * @returns {GridFSBucket} pdfBucket instance
 */
export { pdfBucket }

// -----------------------------------------------------------------------------
// STREAMING UTILITIES
// -----------------------------------------------------------------------------

/**
 * Streams a file by filename (usually not recommended for large apps).
 * @param {string} filename
 * @returns {import('stream').Readable}
 */
export const openDownloadStream = (filename) =>
  pdfBucket?.openDownloadStreamByName(filename)

/**
 * Deletes a file from GridFS by _id or filename.
 * @param {string|ObjectId} idOrName - GridFS file _id or filename
 * @returns {Promise<boolean>} true if file deleted, false otherwise
 */
export const deleteFromBucket = async (idOrName) => {
  if (!pdfBucket) throw new Error('GridFS bucket not initialized')
  const filesColl = pdfBucket.s.db.collection('pdfs.files')

  // Try to find by ObjectId
  let fileDoc = null
  if (ObjectId.isValid(idOrName)) {
    fileDoc = await filesColl.findOne({ _id: new ObjectId(idOrName) })
  }
  // If not found, try by filename
  if (!fileDoc) {
    fileDoc = await filesColl.findOne({ filename: idOrName })
  }

  if (!fileDoc) return false
  await pdfBucket.delete(fileDoc._id)
  return true
}

