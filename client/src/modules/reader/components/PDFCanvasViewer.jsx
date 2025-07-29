//-----------------------------------------------------------------------------
// PDFCanvasViewer – full optimized version
//-----------------------------------------------------------------------------
import React, { useRef, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { BitmapCache } from '@reader/utils/bitmapCache'
import {
  selectRenderedPages,
  selectStreamScale,
} from '@/store/selectors/streamSelectors'
import {
  selectTotalPages
} from '@/store/selectors/readerSelectors'
import { PAGE_HEIGHT } from '@reader/utils/pdfConstants'

/* --- styled components ---------------------------------------------------- */
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
  background: var(--bg-paper, #fff);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
`

/* --- component ------------------------------------------------------------ */
export default function PDFCanvasViewer({
  containerRef,
  visiblePages,
  sidebarOpen = false,
  direction = 'row',
}) {
const fallbackRef = useRef(null)
const wrapper = containerRef || fallbackRef

  const pageRefs = useRef({})

  const total = useSelector(selectTotalPages)
  const scaleKey = scale.toFixed(2)
  const renderedRaw = useSelector(selectRenderedPages)

  // Memoized rendered cache
  const rendered = useMemo(() => renderedRaw[scaleKey] ?? {}, [renderedRaw, scaleKey])

  // Draw logic using requestAnimationFrame
  useEffect(() => {
    const drawPage = (page) => {
      const meta = rendered[page]
      const bmp = meta && BitmapCache.get(meta.bitmapId)
      const canvas = pageRefs.current[page]
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (bmp) {
        canvas.width = bmp.width
        canvas.height = bmp.height
        ctx.drawImage(bmp, 0, 0)
      } else {
        ctx.font = '16px sans-serif'
        ctx.fillStyle = '#aaa'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('Ładowanie...', canvas.width / 2, canvas.height / 2)
      }
    }

    const raf = requestAnimationFrame(() => {
      visiblePages.forEach(drawPage)
    })
    return () => cancelAnimationFrame(raf)
  }, [visiblePages, rendered])

  const placeholderW = PAGE_HEIGHT * scale * 0.75
  const placeholderH = PAGE_HEIGHT * scale
    const firstPage = visiblePages[0] ?? 1
  const lastPage = visiblePages[visiblePages.length - 1] ?? 0
  const topPad = (firstPage - 1) * placeholderH
  const bottomPad = (total - lastPage) * placeholderH

  return (
    <ScrollWrapper ref={wrapper} $sidebar={sidebarOpen}>
      <PagesContainer $dir={direction}>
         <div style={{ height: topPad }} />
        {visiblePages.map(page => (
          <Canvas
            key={page}
            ref={el => (pageRefs.current[page] = el)}
            width={placeholderW}
            height={placeholderH}
            data-page={page}
          />
        ))}
         <div style={{ height: bottomPad }} />
      </PagesContainer>
    </ScrollWrapper>
  )
}
