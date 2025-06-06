/**
 * @file setupGridFS.js
 * @description
 * Creates and exports a single GridFS bucket instance (bucketName: "pdfs").
 * Exports helpers to wait for bucket init and access it safely.
 */

import mongoose from 'mongoose'
import { GridFSBucket, ObjectId } from 'mongodb'

// -----------------------------------------------------------------------------
// INIT BUCKET (async-safe)
// -----------------------------------------------------------------------------

let pdfBucket = null

/**
 * Promise that resolves once the MongoDB connection is open
 * and the GridFS bucket is ready to use.
 */
export const pdfBucketReady = new Promise((resolve) => {
  mongoose.connection.once('open', () => {
    pdfBucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: 'pdfs',
    })
    console.log('[GridFS] Bucket "pdfs" initialized')
    resolve()
  })
})

/**
 * Returns the current GridFS bucket instance.
 * @returns {GridFSBucket|null}
 */
export const getPdfBucket = () => pdfBucket

// -----------------------------------------------------------------------------
// STREAMING UTILITIES
// -----------------------------------------------------------------------------

/**
 * Streams a file by filename (only if bucket is ready).
 * @param {string} filename
 * @returns {import('stream').Readable|null}
 */
export const openDownloadStream = (filename) =>
  pdfBucket?.openDownloadStreamByName(filename) || null

/**
 * Deletes a file from GridFS by _id or filename.
 * @param {string|ObjectId} idOrName - GridFS file _id or filename
 * @returns {Promise<boolean>} true if deleted, false otherwise
 */
export const deleteFromBucket = async (idOrName) => {
  if (!pdfBucket) throw new Error('GridFS bucket not initialized')
  const filesColl = pdfBucket.s.db.collection('pdfs.files')

  let fileDoc = null
  if (ObjectId.isValid(idOrName)) {
    fileDoc = await filesColl.findOne({ _id: new ObjectId(idOrName) })
  }
  if (!fileDoc) {
    fileDoc = await filesColl.findOne({ filename: idOrName })
  }

  if (!fileDoc) return false
  await pdfBucket.delete(fileDoc._id)
  return true
}
