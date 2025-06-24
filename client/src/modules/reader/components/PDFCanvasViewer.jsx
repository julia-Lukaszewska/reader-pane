/**
 * @file PDFCanvasViewer.jsx
 * @description
 * Universal viewer for rendered PDF pages using canvas.
 * - Supports all view modes (single, double, scroll)
 * - Streams and renders missing page ranges as ImageBitmaps
 * - Uses Redux selectors and BitmapCache
 * - Handles skeletons and canvas cleanup
 *
 * Props:
 * - containerRef (RefObject): optional external scroll container
 * - sidebarOpen (boolean): adjusts width for sidebar
 * - direction (string): layout direction, e.g. 'row' or 'column'
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import useRangeStreamer from '@reader/hooks/useRangeStreamer'
import useVisiblePages from '@reader/hooks/useVisiblePages'
import { BitmapCache } from '@reader/utils/bitmapCache'
import Skeleton from '@/components/Skeleton'

import { selectVisiblePagesByMode } from '@/store/selectors/readerSelectors'
import {
  selectRenderedPages,
  selectStreamScale,
  selectPreloadedRanges,
} from '@/store/selectors/streamSelectors'
import { PAGE_HEIGHT } from '@reader/utils/pdfConstants'

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const ScrollWrapper = styled.div`
  width: ${({ $sidebar }) => ($sidebar ? 'calc(100vw - 20rem)' : '100vw')};
  height: calc(100vh - 17vh);
  overflow: auto;
  padding: 2rem;
`

const PagesContainer = styled.div`
  display: flex;
  flex-direction: ${({ $dir }) => $dir};
  justify-content: center;
  align-items: center;
  min-height: 100%;
  gap: 0.3rem;
`

const Canvas = styled.canvas`
  margin: 1rem;
  object-fit: contain;
  display: block;
`



//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
/**
 * PDFCanvasViewer
 * 
 * Displays visible PDF pages using <canvas> and ImageBitmaps.
 * Streams missing ranges dynamically based on visibility.
 *
 * @param {Object} props
 * @param {React.RefObject} [props.containerRef] - Scroll container ref
 * @param {boolean} [props.sidebarOpen=false] - Whether sidebar is open
 * @param {'row'|'column'} [props.direction='row'] - Layout direction
 */
export default function PDFCanvasViewer({
  containerRef,
  sidebarOpen = false,
  direction = 'row',
}) {
  const wrapper = containerRef ?? useRef(null)
  const pageRefs = useRef({})

  const visiblePages = useSelector(selectVisiblePagesByMode)
  const scale = useSelector(selectStreamScale)
  const scaleKey = scale.toFixed(2)
  const rendered = useSelector(selectRenderedPages)[scaleKey] ?? {}
  const preloadedRanges = useSelector(selectPreloadedRanges)[scaleKey] ?? []

  const streamRange = useRangeStreamer()
  useVisiblePages(wrapper, PAGE_HEIGHT)

  //-----------------------------------------------------------------------------
  // Streaming: load range if not already preloaded
  //-----------------------------------------------------------------------------
  useEffect(() => {
    if (!visiblePages.length) return

    const first = Math.min(...visiblePages)
    const last = Math.max(...visiblePages)

    const covered = preloadedRanges.some(([s, e]) => first >= s && last <= e)
    if (!covered) {
      const chunkStart = Math.floor((first - 1) / 8) * 8 + 1
      streamRange([chunkStart, chunkStart + 7])
    }
  }, [visiblePages, preloadedRanges, scaleKey, streamRange])

  //-----------------------------------------------------------------------------
  // Rendering: draw bitmaps to canvas
  //-----------------------------------------------------------------------------
  useEffect(() => {
    visiblePages.forEach(page => {
      const meta = rendered[page]
      const bmp = meta && BitmapCache.get(meta.bitmapId)
      const canvas = pageRefs.current[page]
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!bmp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        return
      }

      canvas.width = bmp.width
      canvas.height = bmp.height
      ctx.drawImage(bmp, 0, 0)
    })
  }, [visiblePages, rendered, scaleKey])

  //-----------------------------------------------------------------------------
  // Render
  //-----------------------------------------------------------------------------
  return (
    <ScrollWrapper ref={wrapper} $sidebar={sidebarOpen}>
      <PagesContainer $dir={direction}>
        {visiblePages.map(page => {
          const meta = rendered[page]
          const bmp = meta && BitmapCache.get(meta.bitmapId)

          return (
            <Canvas
              key={page}
              ref={el => (pageRefs.current[page] = el)}
              width={bmp?.width || 1}
              height={bmp?.height || 1}
              data-page={page}
            />
          )
        })}
      </PagesContainer>
    </ScrollWrapper>
  )
}
