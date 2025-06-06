/**
 * @file uploadBook.js
 * @description
 * Controller for uploading a book with PDF, metadata and optional cover image.
 * Stores the PDF in GridFS (bucket "pdfs") and saves a Book document.
 */

import { getPdfBucket } from '../setupGridFS.js'
import Book from '../models/Book.js'
import { Readable } from 'stream'

// -----------------------------------------------------------------------------
// UploadBook Controller
// -----------------------------------------------------------------------------

/**
 * Handles book upload:
 * 1) Validates presence and MIME type of the PDF file
 * 2) Streams the PDF into GridFS under a unique filename
 * 3) Creates a new Book document with metadata, including GridFS fileId and filename
 * 4) Responds with the saved Book object
 *
 * @param {Object} req - Express request, expecting multipart/form-data with "pdf" file
 * @param {Object} res - Express response
 */
export const UploadBook = async (req, res) => {
  let fileId = null
  const pdfBucket = getPdfBucket()
  try {
    //----------------------------------------------------------------
    // 1) Basic validation
    //----------------------------------------------------------------
    const pdfFile = req.files?.pdf?.[0]
    if (!pdfFile) return res.status(400).json({ error: 'Missing PDF file' })
    if (!pdfFile.mimetype.includes('pdf')) {
      return res.status(415).json({ error: 'Only PDF files are accepted' })
    }

    const totalPages = parseInt(req.body.totalPages, 10) || 1
    if (totalPages < 1) {
      return res.status(400).json({ error: 'totalPages must be > 0' })
    }

    //----------------------------------------------------------------
    // 2) Upload PDF to GridFS
    //----------------------------------------------------------------
    const filename = `${req.user.id}_${Date.now()}_${pdfFile.originalname.replace(/[/\\]+/g, '_')}`

    await new Promise((resolve, reject) => {
      const readableStream = Readable.from(pdfFile.buffer)
      const uploadStream = pdfBucket.openUploadStream(filename, {
        contentType: pdfFile.mimetype,
      })

      fileId = uploadStream.id

      readableStream.pipe(uploadStream)
      uploadStream.on('finish', resolve)
      uploadStream.on('error', reject)
    })

    //----------------------------------------------------------------
    // 3) Build new Book document
    //----------------------------------------------------------------
    const {
      title = pdfFile.originalname,
      author = '',
      description = '',
      publicationDate,
      genre = '',
      collection = '',
    } = req.body

    const tags = (req.body.tags || '')
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)

    const newBook = new Book({
      owner: req.user.id,
      meta: {
        title,
        author,
        description,
        tags,
        cover: req.body.cover || '',
        totalPages,
        publicationDate: publicationDate ? new Date(publicationDate) : undefined,
        genre,
        documentType: 'PDF',
        collection,
        source: 'user',
        addedAt: Date.now(),
      },
      file: {
        filename,
        fileId,
      },
      flags: {
        isArchived: false,
        isFavorited: false,
        isDownloaded: false,
      },
      stats: {
        currentPage: 1,
        maxVisitedPage: 1,
        isCompleted: false,
      },
    })

    const saved = await newBook.save()
    res.status(201).json(saved)
  } catch (err) {
    if (fileId) {
      try {
        await pdfBucket.delete(fileId)
      } catch (cleanupError) {
        console.error('[ROLLBACK ERROR] Failed to delete orphaned file:', cleanupError)
      }
    }
    console.error('[UPLOAD ERROR]', err)
    res.status(500).json({ error: 'Upload failed' })
  }
}
