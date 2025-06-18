/**
 * @file UploadBookController.js
 * @description
 * Controller for uploading a book with PDF, metadata and optional cover image.
 * 1) Validates incoming PDF and metadata
 * 2) Streams PDF into GridFS (bucket "books_files")
 * 3) Creates a Book document in MongoDB
 */

import { getGridFsBucket } from '../config/gridfs.js'
import Book from '../models/Book.js'
import { Readable } from 'stream'

// -----------------------------------------------------------------------------
// UploadBook Controller
// -----------------------------------------------------------------------------
export const UploadBookController = async (req, res) => {
  let fileId = null
  const gridFsBucket = getGridFsBucket()

  try {
    // 1) Basic validation
    const pdfFile = req.files?.pdf?.[0]
    if (!pdfFile) {
      return res.status(400).json({ error: 'Missing PDF file' })
    }
    if (!pdfFile.mimetype.includes('pdf')) {
      return res.status(415).json({ error: 'Only PDF files are accepted' })
    }
const coverFile = req.files?.cover?.[0]
let coverBuffer = null
if (coverFile && coverFile.buffer) {
  coverBuffer = coverFile.buffer
}

    const totalPages = parseInt(req.body.totalPages, 10) || 1
    if (totalPages < 1) {
      return res.status(400).json({ error: 'totalPages must be > 0' })
    }

    // 2) Upload PDF to GridFS
    const filename = `${req.user.id}_${Date.now()}_${pdfFile.originalname.replace(/[/\\]+/g, '_')}`
    await new Promise((resolve, reject) => {
      const readableStream = Readable.from(pdfFile.buffer)
      const uploadStream = gridFsBucket.openUploadStream(filename, {
        contentType: pdfFile.mimetype,
      })
      fileId = uploadStream.id
      readableStream.pipe(uploadStream)
      uploadStream.on('finish', resolve)
      uploadStream.on('error', reject)
    })

    // 3) Build new Book document
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
       cover: coverBuffer ? `data:image/jpeg;base64,${coverBuffer.toString('base64')}` : '',

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
    // rollback orphaned file
    if (fileId) {
      try {
        await gridFsBucket.delete(fileId)
      } catch (cleanupErr) {
        console.error('[ROLLBACK ERROR] Failed to delete orphaned file:', cleanupErr)
      }
    }
    console.error('[UPLOAD BOOK ERROR]', err)
    res.status(500).json({ error: 'Upload failed' })
  }
}
