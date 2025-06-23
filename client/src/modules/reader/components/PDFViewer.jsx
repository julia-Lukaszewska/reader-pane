// src/components/PdfViewer.jsx

import { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

import useRangeStreamer from '@/hooks/useRangeStreamer'
import useVisiblePages from '@/hooks/useVisiblePages'
import { BitmapCache } from '@/utils/BitmapCache'
import Skeleton from '@/components/Skeleton' // loading placeholder

// A4 height at 72 DPI
const PAGE_H = 842

/**
 * PdfViewer
 * -------------------------------------
 * High-level component for rendering a streamed PDF file.
 * Uses virtual scrolling, bitmap cache, and range preloading.
 *
 * Steps:
 * 1. Tracks visible pages using scroll and layout metrics
 * 2. Automatically streams page ranges when user scrolls into unloaded area
 * 3. Renders bitmaps from memory, falling back to <Skeleton /> if missing
 *
 * @param {Object} props
 * @param {string} props.docId – ID of the document in GridFS
 */
export default function PdfViewer({ docId }) {
  const containerRef = useRef(null)

  // Step 1: Track visible pages inside scrollable container
  useVisiblePages(containerRef, PAGE_H)

  // Step 2: Prepare streamer for loading page ranges
  const streamRange = useRangeStreamer()

  // State: current visible pages and already loaded ranges
  const { visiblePages, preloadedRanges } = useSelector(s => s.stream)

  /**
   * Step 3: Detect if visible pages are outside of any preloaded range
   * If yes → trigger streaming of the surrounding chunk (8 pages)
   */
  useEffect(() => {
    if (!visiblePages.length) return

    const first = Math.min(...visiblePages)
    const last = Math.max(...visiblePages)

    const covered = preloadedRanges.some(([s, e]) => first >= s && last <= e)

    if (!covered) {
      // Compute 8-page aligned chunk start
      const chunkStart = Math.floor((first - 1) / 8) * 8 + 1
      streamRange([chunkStart, chunkStart + 7])
    }
  }, [visiblePages, preloadedRanges])

  // Step 4: Render visible pages
  const scale = useSelector(s => s.stream.scale)
  const rendered = useSelector(s => s.stream.renderedPages[scale] || {})

  return (
    <div
      ref={containerRef}
      style={{ overflowY: 'auto', height: '100%', width: '100%' }}
    >
      {Object.keys(rendered).length === 0 && <p>Loading…</p>}

      {visiblePages.map(pageNum => {
        const meta = rendered[pageNum]
        const bmp = meta && BitmapCache.get(meta.bitmapId)

        return (
          <div
            key={pageNum}
            style={{ height: PAGE_H * scale, margin: '0 auto' }}
          >
            {bmp ? (
              <canvas
                ref={c => {
                  if (!c) return
                  const ctx = c.getContext('2d')
                  c.width = bmp.width
                  c.height = bmp.height
                  ctx.drawImage(bmp, 0, 0)
                }}
              />
            ) : (
              <Skeleton height={PAGE_H * scale} />
            )}
          </div>
        )
      })}
    </div>
  )
}
