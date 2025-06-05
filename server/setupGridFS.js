/**
 * @file setupGridFS.js
 * @description
 * Creates and exports a single GridFS bucket instance (bucketName: "pdfs").
 * The bucket is attached to global so any module can import { gfs }.
 */

import mongoose from 'mongoose'
import Grid from 'gridfs-stream'

Grid.mongo = mongoose.mongo               // wire driver

if (!Grid.mongo.ObjectID && Grid.mongo.ObjectId) {
  Grid.mongo.ObjectID = Grid.mongo.ObjectId
}
let gfs = null

mongoose.connection.once('open', () => {
  gfs = Grid(mongoose.connection.db)
  gfs.collection('pdfs')
  console.log('[GridFS] Bucket "pdfs" initialised')
})

export { gfs }

/**
 * Convenience helper for streaming a file out of GridFS.
 * @param {string} filename
 * @returns {import('stream').Readable}
 */
export const openDownloadStream = (filename) =>
  gfs.createReadStream({ filename, root: 'pdfs' })
