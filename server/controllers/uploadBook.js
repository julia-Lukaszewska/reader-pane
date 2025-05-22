/**
 * @file uploadBook.js
 * @description Controller for uploading a book with PDF, metadata and optional cover image.
 * Exports: handleUploadBook (used in POST /api/books)
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Book from '../models/Book.js'

// ------------------------------------------------------------------
// Constant for upload directory – imported from books-upload.js
// ------------------------------------------------------------------
import { uploadsDir } from '../routes/books-upload.js'

/**
 * POST /api/books — Upload PDF + meta + optional base64 cover.
 * @async
 * @function handleUploadBook
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @returns {Promise<void>} Sends status 201 with book JSON or error
 */
export const handleUploadBook = async (req, res) => {
  try {
    //----------------------------------------------------------------
    // Validation
    //----------------------------------------------------------------
    if (!req.file) {
      return res.status(400).json({ error: 'Missing PDF file' })
    }
    if (!req.file.mimetype.includes('pdf')) {
      return res.status(415).json({ error: 'Only PDF files are accepted' })
    }

    const totalPagesRaw = parseInt(req.body.totalPages, 10)
    if (!Number.isInteger(totalPagesRaw) || totalPagesRaw < 1) {
      return res.status(400).json({ error: 'totalPages must be a number > 0' })
    }
    const totalPages = totalPagesRaw

    //----------------------------------------------------------------
    // Fields from req.body
    //----------------------------------------------------------------
    const {
      title,
      author,
      description,
      publicationDate,
      genre,
      documentType,
      collection,
    } = req.body

    //----------------------------------------------------------------
    // Convert tags (CSV or array) → array
    //----------------------------------------------------------------
    const tags = Array.isArray(req.body.tags)
      ? req.body.tags
      : (req.body.tags || '')
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)

    //----------------------------------------------------------------
    // File URL
    //----------------------------------------------------------------
    const fileUrl = `${req.protocol}://${req.get('host')}/files/${req.file.filename}`

    //----------------------------------------------------------------
    // Cover (base64 → PNG), if provided
    //----------------------------------------------------------------
    let coverUrl = ''
    if (req.body.cover) {
      const base64 = req.body.cover.replace(/^data:image\/\w+;base64,/, '')
      const buffer = Buffer.from(base64, 'base64')
      const coverName = `${req.file.filename}-cover.png`
      const coverPath = path.join(uploadsDir, coverName)

      fs.writeFileSync(coverPath, buffer)
      coverUrl = `${req.protocol}://${req.get('host')}/files/${coverName}`
    }

    //----------------------------------------------------------------
    // Create book document
    //----------------------------------------------------------------
    const newBook = new Book({
      meta: {
        title:           title || req.file.originalname,
        author:          author || '',
        description:     description || '',
        tags,
        cover:           coverUrl,
        fileUrl,
        totalPages,
        publicationDate: publicationDate ? new Date(publicationDate) : undefined,
        publishedYear:   req.body.publishedYear ? parseInt(req.body.publishedYear, 10) : null,
        genre:           genre || '',
        documentType:    req.file.mimetype.includes('pdf') ? 'PDF' : 'unknown',
        collection:      collection || '',
        source:          'user',
        addedAt:         Date.now(),
      },
      flags: { isArchived: false, isFavorited: false, isDownloaded: false },
      stats: { currentPage: 1, maxVisitedPage: 1, isCompleted: false },
    })

    //----------------------------------------------------------------
    // Save and respond
    //----------------------------------------------------------------
    const saved = await newBook.save()
    res.status(201).json(saved)
  } catch (err) {
    console.error('[UPLOAD]', err)
    res.status(500).json({ error: 'Upload failed due to server error' })
  }
}
