/**
 * books-get.js – Express router for book‑related API endpoints.
 *
 * Public endpoints
 * ───────────────────────────────────────────────────────────
 * GET    /static                → list lightweight metadata
 * GET    /:id/live              → read mutable flags & stats
 * PATCH  /:id/live              → update mutable flags & stats
 * GET    /                      → list full book docs (owner‑scoped)
 * GET    /:id                   → single full book
 * GET    /:id/cache             → rendered pages / ranges
 * GET    /:id/file-url          → **signed** absolute PDF URL
 * GET    /file/:filename        → stream PDF with JWT token
 */

import express from "express";
import jwt from "jsonwebtoken";
import Book from "../models/Book.js";
import { bucket } from "../setupGridFS.js";

const router = express.Router();
const FILE_TOKEN_SECRET = process.env.FILE_TOKEN_SECRET ?? "CHANGE_ME_FILE_SECRET"; // < 256‑bit secret!
const FILE_TOKEN_TTL = "15m"; // signed URL lifetime

/**
 * Build a short‑lived JWT for a given book. The token is passed as a query
 * string so pdf.js can fetch the file cross‑domain without cookies.
 */
function createFileToken(book) {
  return jwt.sign(
    { filename: book.filename, owner: String(book.owner) },
    FILE_TOKEN_SECRET,
    { expiresIn: FILE_TOKEN_TTL }
  );
}

// ───────────────────────────────────────────────────────────
// GET /api/books/static – lightweight metadata
// ───────────────────────────────────────────────────────────
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
    res.json(books);
  } catch (err) {
    console.error("[STATIC]", err);
    res.status(500).json({ error: "Failed to fetch static books" });
  }
});

// ───────────────────────────────────────────────────────────
// GET /api/books/:id/live – read mutable flags / stats
// ───────────────────────────────────────────────────────────
router.get("/:id/live", async (req, res) => {
  try {
    const book = await Book.findOne(
      { _id: req.params.id, owner: req.user.id },
      { flags: 1, stats: 1 }
    ).lean();

    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (err) {
    console.error("[LIVE GET]", err);
    res.status(500).json({ error: "Failed to fetch live data" });
  }
});

// ───────────────────────────────────────────────────────────
// PATCH /api/books/:id/live – update mutable flags / stats
// ───────────────────────────────────────────────────────────
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
    res.json({ flags: book.flags, stats: book.stats });
  } catch (err) {
    console.error("[LIVE PATCH]", err);
    res.status(500).json({ error: "Failed to update live data" });
  }
});

// ───────────────────────────────────────────────────────────
// GET /api/books – full documents (owner scope)
// ───────────────────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({ owner: req.user.id }).sort({ "meta.addedAt": -1 });
    res.json(books);
  } catch (err) {
    console.error("[GET ALL]", err);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// ───────────────────────────────────────────────────────────
// GET /api/books/:id – single book
// ───────────────────────────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, owner: req.user.id });
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (err) {
    console.error("[GET ONE]", err);
    res.status(500).json({ error: "Failed to fetch book" });
  }
});

// ───────────────────────────────────────────────────────────
// GET /api/books/:id/cache – rendered pages / ranges
// ───────────────────────────────────────────────────────────
router.get("/:id/cache", async (req, res) => {
  try {
    const book = await Book.findOne(
      { _id: req.params.id, owner: req.user.id },
      "flags.renderedPages flags.renderedRanges"
    ).lean();

    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json({
      renderedPages: book.flags.renderedPages,
      renderedRanges: book.flags.renderedRanges,
    });
  } catch (err) {
    console.error("[CACHE]", err);
    res.status(500).json({ error: "Failed to fetch cache data" });
  }
});

// ───────────────────────────────────────────────────────────
// GET /api/books/:id/file-url – signed absolute URL
// ───────────────────────────────────────────────────────────
router.get("/:id/file-url", async (req, res) => {
  try {
    const book = await Book.findOne(
      { _id: req.params.id, owner: req.user.id },
      "filename owner"
    ).lean();

    if (!book) return res.status(404).json({ error: "Book not found" });

    const token = createFileToken(book);
    const base = process.env.PUBLIC_API_URL ?? `${req.protocol}://${req.get("host")}`;
    res.json({ fileUrl: `${base}/api/books/file/${encodeURIComponent(book.filename)}?token=${token}` });
  } catch (err) {
    console.error("[FILE URL]", err);
    res.status(500).json({ error: "Failed to build file URL" });
  }
});

// ───────────────────────────────────────────────────────────
// GET /api/books/file/:filename – stream PDF with JWT auth
// ───────────────────────────────────────────────────────────
router.get("/file/:filename", async (req, res) => {
  try {
    // Verify signed token (sent as ?token=…)
    const { token } = req.query;
    if (!token) return res.status(401).send("Unauthorized");

    let payload;
    try {
      payload = jwt.verify(token, FILE_TOKEN_SECRET);
    } catch (err) {
      return res.status(401).send("Unauthorized");
    }

    // Ensure filename matches token (basic integrity)
    if (payload.filename !== req.params.filename)
      return res.status(403).send("Forbidden");

    // Stream from GridFS
    res.set("Content-Type", "application/pdf");
    bucket.openDownloadStreamByName(req.params.filename).pipe(res);
  } catch (err) {
    console.error("[FILE STREAM]", err);
    res.status(500).json({ error: "Failed to stream file" });
  }
});

export default router;
