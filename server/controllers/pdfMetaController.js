import fs from 'fs'
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.js'
const { getDocument } = pdfjs

export async function extractPdfMetadata(bufferOrPath) {
  let data
  if (Buffer.isBuffer(bufferOrPath)) {
    data = new Uint8Array(bufferOrPath)
  } else if (typeof bufferOrPath === 'string') {
    data = new Uint8Array(fs.readFileSync(bufferOrPath))
  } else {
    throw new Error('Invalid input for PDF metadata extraction')
  }

  const doc = await getDocument({ data }).promise
  const numPages = doc.numPages
  const pages = []

  for (let i = 1; i <= numPages; i++) {
    const page = await doc.getPage(i)
    const { width, height } = page.getViewport({ scale: 1.0 })
    const rotation = page.rotate
    pages.push({ pageNumber: i, width, height, rotation, dpi: 72 })
  }

  return pages
}