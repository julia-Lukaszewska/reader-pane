/**
 * @file uploadBook.js
 * @description Controller for uploading a book with PDF, metadata and optional cover image.
 * Stores the PDF in GridFS (bucket "pdfs") and saves a Book document.
 */

import { pdfBucket } from '../setupGridFS.js'
import Book from '../models/Book.js'
import { Readable } from 'stream'

export const UploadBook = async (req, res) => {
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
        cover: '',                                  // cover handling not implemented here
        fileKey: filename,                          // raw GridFS filename
        fileUrl: `/api/books/file/${filename}`,     // <- frontend can use this directly
        totalPages,
        publicationDate: publicationDate ? new Date(publicationDate) : undefined,
        genre,
        documentType: 'PDF',
        collection,
        source: 'user',
        addedAt: Date.now(),
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
    console.error('[UPLOAD ERROR]', err)
    res.status(500).json({ error: 'Upload failed' })
  }
}
