/**
 * @file src/components/PdfViewer.js
 * @description
 * Component for rendering PDF pages in scroll mode using pre-rendered bitmaps.
 * 
 * Features:
 * - Tracks visible pages with useVisiblePages (only in scroll mode)
 * - Streams and renders missing page ranges using useRangeStreamer
 * - Draws ImageBitmaps from BitmapCache into <canvas> elements
 * - Displays loading skeletons for pages not yet rendered
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

import useRangeStreamer from '@reader/hooks/useRangeStreamer'
import useVisiblePages from '@reader/hooks/useVisiblePages'
import { BitmapCache } from '@reader/utils/bitmapCache'
import Skeleton from '@/components/Skeleton'

import {
  selectVisiblePagesByMode,
} from '@/store/selectors/readerSelectors'

//-----------------------------------------------------------------------------
// Constants
//-----------------------------------------------------------------------------
const PAGE_H = 842 // A4 page height at 72 DPI (unscaled)

//-----------------------------------------------------------------------------
// Component: PdfViewer
//-----------------------------------------------------------------------------
/**
 * Renders visible PDF pages using <canvas> elements in scroll view.
 * Handles lazy loading of missing chunks using range-based streaming.
 */
export default function PdfViewer() {
  const containerRef = useRef(null)
  useVisiblePages(containerRef, PAGE_H) // works only in 'scroll' mode
  const streamRange = useRangeStreamer()

  const visiblePages = useSelector(selectVisiblePagesByMode)
  const { preloadedRanges, scale } = useSelector(s => s.stream)

  const scaleKey = scale.toFixed(2)
  const rendered = useSelector(
    s => s.stream.renderedPages[scaleKey] ?? {}
  )

  // Stream missing page ranges if not already covered
  useEffect(() => {
    if (!visiblePages.length) return

    const first = Math.min(...visiblePages)
    const last = Math.max(...visiblePages)

    const rangesForScale = preloadedRanges[scaleKey] ?? []
    const covered = rangesForScale.some(([s, e]) => first >= s && last <= e)

    if (!covered) {
      const chunkStart = Math.floor((first - 1) / 8) * 8 + 1
      streamRange([chunkStart, chunkStart + 7])
    }
  }, [visiblePages, preloadedRanges, scaleKey, streamRange])

  // Render canvases
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
            data-page={pageNum}
            style={{ height: PAGE_H * scale, margin: '0 auto' }}
          >
            {bmp ? (
              <canvas
                ref={c => {
                  if (!c) return
                  c.width = bmp.width
                  c.height = bmp.height
                  c.getContext('2d').drawImage(bmp, 0, 0)
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
