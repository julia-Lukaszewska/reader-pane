/**
 * books-get.js – Express router for book-related API endpoints.
 *
 * Route map
 * ──────────────────────────────────────────────────────────
 * GET    /static           → list static metadata
 * GET    /:id/live         → get flags & stats
 * PATCH  /:id/live         → update flags & stats
 * GET    /                 → list full books
 * GET    /:id              → single full book
 * GET    /:id/cache        → rendered cache (pages & ranges)
 * GET    /:id/file-url     → { fileUrl }
 * GET    /:id/file         → stream PDF from GridFS
 */

import express from "express";
import Book from "../models/Book.js";
import { bucket } from "../setupGridFS.js"; // GridFSBucket instance

const router = express.Router();

//------------------------------------------------------------
// GET /api/books/static – static metadata only
//------------------------------------------------------------
router.get("/static", async (req, res) => {
  try {
    const books = await Book.find(
      { owner: req.user.id },
      {
        "meta.title": 1,
        "meta.author": 1,
        "meta.totalPages": 1,
        "meta.cover": 1,
        "meta.tags": 1,
        "meta.language": 1,
        "meta.collection": 1,
      }
    ).lean();
    res.status(200).json(books);
  } catch (err) {
    console.error("[STATIC]", err);
    res.status(500).json({ error: "Failed to fetch static books" });
  }
});

//------------------------------------------------------------
// GET /api/books/:id/live – mutable flags & stats
//------------------------------------------------------------
router.get("/:id/live", async (req, res) => {
  try {
    const book = await Book.findOne(
      { _id: req.params.id, owner: req.user.id },
      { flags: 1, stats: 1 }
    ).lean();

    if (!book) return res.status(404).json({ error: "Book not found" });
    res.status(200).json(book);
  } catch (err) {
    console.error("[LIVE GET]", err);
    res.status(500).json({ error: "Failed to fetch live data" });
  }
});

//------------------------------------------------------------
// PATCH /api/books/:id/live – update flags & stats
//------------------------------------------------------------
router.patch("/:id/live", async (req, res) => {
  try {
    const updates = {};
    if (req.body.flags) updates.flags = req.body.flags;
    if (req.body.stats) updates.stats = req.body.stats;

    if (!Object.keys(updates).length)
      return res.status(400).json({ error: "No flags or stats provided" });

    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!book) return res.status(404).json({ error: "Book not found" });
    res.status(200).json({ flags: book.flags, stats: book.stats });
  } catch (err) {
    console.error("[LIVE PATCH]", err);
    res.status(500).json({ error: "Failed to update live data" });
  }
});

//------------------------------------------------------------
// GET /api/books – full books list
//------------------------------------------------------------
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({ owner: req.user.id }).sort({ "meta.addedAt": -1 });
    res.status(200).json(books);
  } catch (err) {
    console.error("[GET ALL]", err);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

//------------------------------------------------------------
// GET /api/books/:id – single full book
//------------------------------------------------------------
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, owner: req.user.id });
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.status(200).json(book);
  } catch (err) {
    console.error("[GET ONE]", err);
    res.status(500).json({ error: "Failed to fetch book" });
  }
});

//------------------------------------------------------------
// GET /api/books/:id/cache – rendered pages & ranges
//------------------------------------------------------------
router.get("/:id/cache", async (req, res) => {
  try {
    const book = await Book.findOne(
      { _id: req.params.id, owner: req.user.id },
      "flags.renderedPages flags.renderedRanges"
    ).lean();

    if (!book) return res.status(404).json({ error: "Book not found" });

    res.status(200).json({
      renderedPages: book.flags.renderedPages,
      renderedRanges: book.flags.renderedRanges,
    });
  } catch (err) {
    console.error("[CACHE]", err);
    res.status(500).json({ error: "Failed to fetch cache data" });
  }
});

//------------------------------------------------------------
// GET /api/books/:id/file-url – return relative URL to PDF
//------------------------------------------------------------
router.get("/:id/file-url", async (req, res) => {
  try {
    const book = await Book.findOne(
      { _id: req.params.id, owner: req.user.id },
      "filename"
    ).lean();

    if (!book) return res.status(404).json({ error: "Book not found" });

    res.status(200).json({ fileUrl: `/api/books/${book._id}/file` });
  } catch (err) {
    console.error("[FILE URL]", err);
    res.status(500).json({ error: "Failed to build file URL" });
  }
});

//-----------------------------------------------------------
// GET /api/books/:id/file – stream PDF from GridFS
//------------------------------------------------------------
router.get("/:id/file", async (req, res) => {
  try {
    const book = await Book.findOne(
      { _id: req.params.id, owner: req.user.id },
      "filename"
    ).lean();

    if (!book) return res.status(404).json({ error: "Book not found" });

    res.set("Content-Type", "application/pdf");
    bucket.openDownloadStreamByName(book.filename).pipe(res);
  } catch (err) {
    console.error("[FILE STREAM]", err);
    res.status(500).json({ error: "Failed to stream file" });
  }
});

export default router;