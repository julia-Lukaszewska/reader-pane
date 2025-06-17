/**
 * @file routes/booksPrivate/bookFileUrl.js
 * @description
 * Endpoint to retrieve the file URL and metadata for a private book by ID.
 * - Returns JSON `{ fileUrl, file }`
 * - Calculates ETag for response body and handles 304 Not Modified
 * - Sets `Cache-Control: private, must-revalidate`
 */
import express from 'express'
import Books from '../../models/Book.js'
import crypto from 'crypto'

//-----------------------------------------------------
//------ Router Setup
//-----------------------------------------------------
const router = express.Router()

//-----------------------------------------------------
//------ GET /api/books/private/:id/file-url
//-----------------------------------------------------
/**
 * @route GET /api/books/private/:id/file-url
 * @description Returns the access URL and metadata for the book's file.
 *              Uses ETag to support client-side caching.
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 */
router.get('/:id/file-url', async (req, res) => {
  const book = await Books.findById(req.params.id)
  if (!book || !book.file?.filename) {
    return res.status(404).json({ message: 'No file for this book' })
  }

  //---------------------------------------------------
  //------ Prepare Response Body & ETag
  //---------------------------------------------------
  const payload = {
    fileUrl: `/api/books/storage/${encodeURIComponent(book.file.filename)}`,
    file: book.file,
  }
  const body = JSON.stringify(payload)
  const etag = crypto.createHash('md5').update(body).digest('hex')

  //---------------------------------------------------
  //------ Handle 304 Not Modified
  //---------------------------------------------------
  const clientETag = req.headers['if-none-match']
  if (clientETag === etag) {
    return res.status(304).end()
  }

  //---------------------------------------------------
  //------ Set Headers & Send Response
  //---------------------------------------------------
  res.set('ETag', etag)
  res.set('Cache-Control', 'private, must-revalidate')
  return res.status(200).json(payload)
})

export default router
