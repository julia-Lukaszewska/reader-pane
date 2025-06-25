import { PDFDocument } from 'pdf-lib'

export async function splitPdfIntoRanges(buffer, bucket, baseName, rangeSize = 24) {
  const srcDoc = await PDFDocument.load(buffer)
  const totalPages = srcDoc.getPageCount()
  const tasks = []

  for (let start = 1; start <= totalPages; start += rangeSize) {
    const end = Math.min(start + rangeSize - 1, totalPages)
    tasks.push(async () => {
      const outDoc = await PDFDocument.create()
      const pages = await outDoc.copyPages(srcDoc, Array.from({ length: end - start + 1 }, (_, i) => start - 1 + i))
      pages.forEach(p => outDoc.addPage(p))
      const bytes = await outDoc.save()
      const filename = `${baseName}_r${start}-${end}.pdf`
      const fileId = await new Promise((resolve, reject) => {
        const up = bucket.openUploadStream(filename, { contentType: 'application/pdf' })
        up.end(Buffer.from(bytes), err => err ? reject(err) : resolve(up.id))
      })
      console.log(`[RANGE UPLOADED] ${filename}`)
      return { start, end, filename, fileId }
    })
  }

  const settled = await Promise.allSettled(tasks.map(t => t()))
const ranges = []
for (const r of settled) {
  if (r.status === 'fulfilled') ranges.push(r.value)
  else console.error('[RANGE UPLOAD FAIL]', r.reason)
}

return {
  totalPages,
  rangeSize,
  ranges,
}
}