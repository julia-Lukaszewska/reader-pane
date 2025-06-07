/**
 * @file config/gridfs.js
 * @description
 * Creates and exports a singleton GridFS bucket instance (bucketName: "books_files").
 * Exports helpers to wait for bucket init and access it safely.
 * All file types (PDF, EPUB, audio, etc.) are stored in this bucket.
 */

import mongoose from 'mongoose'
import { GridFSBucket, ObjectId } from 'mongodb'

// -----------------------------------------------------------------------------
// INIT BUCKET (async-safe)
// -----------------------------------------------------------------------------

let gridFsBucket = null

/**
 * Initializes the GridFS bucket when MongoDB is connected.
 */
export function getGridFsBucket() {
  if (!gridFsBucket && mongoose.connection.readyState === 1) {
    gridFsBucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: 'books_files',
    })
    console.log('[GridFS] Bucket "books_files" initialized')
  }
  return gridFsBucket
}

/**
 * Promise that resolves once the MongoDB connection is open
 * and the GridFS bucket is ready to use.
 */
export const gridFsBucketReady = new Promise((resolve) => {
  mongoose.connection.once('open', () => {
    getGridFsBucket()
    resolve()
  })
})

// -----------------------------------------------------------------------------
// STREAMING UTILITIES
// -----------------------------------------------------------------------------

/**
 * Streams a file by filename (only if bucket is ready).
 * @param {string} filename
 * @returns {import('stream').Readable|null}
 */
export const openDownloadStreamByName = (filename) =>
  getGridFsBucket()?.openDownloadStreamByName(filename) || null

/**
 * Deletes a file from GridFS by _id or filename.
 * @param {string|ObjectId} idOrName - GridFS file _id or filename
 * @returns {Promise<boolean>} true if deleted, false otherwise
 */
export const deleteFile = async (idOrName) => {
  const bucket = getGridFsBucket()
  if (!bucket) throw new Error('GridFS bucket not initialized')
  const filesColl = mongoose.connection.db.collection('books_files.files')

  let fileRecord = null
  if (ObjectId.isValid(idOrName)) {
    fileRecord = await filesColl.findOne({ _id: new ObjectId(idOrName) })
  }
  if (!fileRecord) {
    fileRecord = await filesColl.findOne({ filename: idOrName })
  }

  if (!fileRecord) return false
  await bucket.delete(fileRecord._id)
  return true
}
