/**
 * @file setupGridFS.js
 * @description
 * Creates and exports a single GridFS bucket instance (bucketName: "pdfs").
 * The bucket is attached to global so any module can import { pdfBucket }.
 */

import mongoose from 'mongoose'
import { GridFSBucket } from 'mongodb'

// pdfBucket instance shared across app
let pdfBucket = null

mongoose.connection.once('open', () => {
  // Create GridFS bucket once DB is ready
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

/**
 * Convenience helper for streaming a file out of GridFS.
 * @param {string} filename
 * @returns {import('stream').Readable}
 */
export const openDownloadStream = (filename) =>
  pdfBucket?.openDownloadStreamByName(filename)
