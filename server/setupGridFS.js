/**
 * @file setupGridFS.js
 * @description
 * Creates and exports a single GridFS bucket instance (bucketName: "pdfs").
 * The bucket is attached to global so any module can import { gfs }.
 */

import mongoose from 'mongoose'
import Grid from 'gridfs-stream'

// gfs instance shared across app
let gfs = null

mongoose.connection.once('open', () => {
  // Set correct Mongo driver reference AFTER connection is open
  Grid.mongo = mongoose.mongo

  // Fix for newer MongoDB drivers (ObjectId vs ObjectID)
  if (!Grid.mongo.ObjectID && Grid.mongo.ObjectId) {
    Grid.mongo.ObjectID = Grid.mongo.ObjectId
  }

  // Initialize GridFS
  gfs = Grid(mongoose.connection.db)
  gfs.collection('pdfs')
  console.log('[GridFS] Bucket "pdfs" initialised')
})

/**
 * Returns initialized GridFS instance.
 * @returns {Grid} gfs instance
 */
export { gfs }

/**
 * Convenience helper for streaming a file out of GridFS.
 * @param {string} filename
 * @returns {import('stream').Readable}
 */
export const openDownloadStream = (filename) =>
  gfs?.createReadStream({ filename, root: 'pdfs' })
