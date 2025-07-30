//----------------------------------------------------------------------------- 
// PDFCanvasViewer.jsx – full optimized version with integrated hooks
//----------------------------------------------------------------------------- 
import React, { useRef, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import { BitmapCache } from '@reader/utils/bitmapCache'
import {
  selectRenderedPages,
  selectStreamScale,
} from '@/store/selectors/streamSelectors'
import { PAGE_HEIGHT } from '@reader/utils/pdfConstants'
import { selectPageViewMode } from '@/store/selectors/readerSelectors'
import useVisiblePages from '@reader/hooks/useVisiblePages'
import useUpdateCurrentRange from '@reader/hooks/useUpdateCurrentRange'
import { setCurrentPage } from '@/store/slices/readerSlice'

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
  pageHeight = PAGE_HEIGHT,
  sidebarOpen = false,
  direction = 'row',
}) {
  const fallbackRef = useRef(null)
  const containerRef = fallbackRef
  const dispatch = useDispatch()

  const pageRefs = useRef({})
  const mode = useSelector(selectPageViewMode)

  // Hook integration for visible pages and range tracking
  const currentRange = useUpdateCurrentRange(containerRef, pageHeight)
  const visiblePages = useVisiblePages(containerRef, pageHeight)

  // Update current page dynamically to match page in view in scroll mode
  useEffect(() => {
    if (mode === 'scroll' && visiblePages?.length > 0) {
      dispatch(setCurrentPage(visiblePages[0]))
    }
  }, [mode, visiblePages, dispatch])

  const scale = useSelector(selectStreamScale)
  const scaleKey = scale.toFixed(2)
  const renderedRaw = useSelector(selectRenderedPages)

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
        ctx.fillText('Loading...', canvas.width / 2, canvas.height / 2)
      }
    }

    const raf = requestAnimationFrame(() => {
      Object.keys(pageRefs.current).forEach((key) => drawPage(Number(key)))
    })
    return () => cancelAnimationFrame(raf)
  }, [rendered])

  const placeholderW = PAGE_HEIGHT * scale * 0.75
  const placeholderH = PAGE_HEIGHT * scale

  return (
    <ScrollWrapper ref={containerRef} $sidebar={sidebarOpen}>
      <PagesContainer $dir={direction}>
        {Object.keys(rendered).map((pageKey) => {
          const page = Number(pageKey)
          return (
            <Canvas
              key={page}
              ref={(el) => (pageRefs.current[page] = el)}
              width={placeholderW}
              height={placeholderH}
              data-page={page}
            />
          )
        })}
      </PagesContainer>
    </ScrollWrapper>
  )
}
