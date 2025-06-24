import { getGridFSFileBuffer } from '../utils/gridFSFile.js'
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'
import { createCanvas } from '@napi-rs/canvas'

const CACHE_LIMIT = 12
const TTL_MS = 5 * 60 * 1000 // 5 minutes
const cache = new Map()

function getCacheKey(filename, pageNum, scale) {
  return `${filename}|${pageNum}|${scale}`
}

function evictIfNeeded() {
  if (cache.size <= CACHE_LIMIT) return
  const oldestKey = [...cache.entries()].sort((a, b) => a[1].last - b[1].last)[0][0]
  cache.delete(oldestKey)
}

export async function renderPageImage(filename, pageNum, scale = 1) {
  const key = getCacheKey(filename, pageNum, scale)
  const now = Date.now()
  const cached = cache.get(key)
  if (cached && now - cached.ts < TTL_MS) {
    cached.last = now
    return cached.buffer
  }

  const buffer = await getGridFSFileBuffer(filename)
  const pdf = await getDocument({ data: new Uint8Array(buffer) }).promise
    if (!Number.isFinite(pageNum) || !Number.isInteger(pageNum) || pageNum < 1 || pageNum > pdf.numPages) {
    const err = new Error('Page number out of range')
    err.status = 400
    throw err
  }
  const page = await pdf.getPage(pageNum)
  const viewport = page.getViewport({ scale })
  const canvas = createCanvas(viewport.width, viewport.height)
  const ctx = canvas.getContext('2d')
  await page.render({ canvasContext: ctx, viewport }).promise
  const out = canvas.toBuffer('image/png')

  cache.set(key, { buffer: out, ts: now, last: now })
  evictIfNeeded()
await pdf.destroy()
  return out
}
