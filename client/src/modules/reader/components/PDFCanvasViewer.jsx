//-----------------------------------------------------------------------------
// PDFCanvasViewer – simplified version (visiblePages passed in via props)
//-----------------------------------------------------------------------------
import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { BitmapCache } from '@reader/utils/bitmapCache'
import {
  selectRenderedPages,
  selectStreamScale,
} from '@/store/selectors/streamSelectors'
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
  visiblePages,          // ← provided by the layout component
  sidebarOpen = false,
  direction   = 'row',
}) {
  const wrapper  = containerRef ?? useRef(null)
  const pageRefs = useRef({})

  /* --- Redux (bitmaps & scale) ------------------------------------------- */
  const scale    = useSelector(selectStreamScale)
  const scaleKey = scale.toFixed(2)
  const rendered = useSelector(selectRenderedPages)[scaleKey] ?? {}

  /* --- draw bitmaps on canvas ------------------------------------------- */
  useEffect(() => {
    visiblePages.forEach(page => {
      const meta   = rendered[page]
      const bmp    = meta && BitmapCache.get(meta.bitmapId)
      const canvas = pageRefs.current[page]
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!bmp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height) // nothing rendered yet
        return
      }

      canvas.width  = bmp.width
      canvas.height = bmp.height
      ctx.drawImage(bmp, 0, 0)
    })
  }, [visiblePages, rendered])

  /* --- placeholder dimensions ------------------------------------------- */
  const placeholderW = PAGE_HEIGHT * scale * 0.75 // A4 aspect ~0.707
  const placeholderH = PAGE_HEIGHT * scale

  return (
    <ScrollWrapper ref={wrapper} $sidebar={sidebarOpen}>
      <PagesContainer $dir={direction}>
        {visiblePages.map(page => {
          const meta = rendered[page]
          const bmp  = meta && BitmapCache.get(meta.bitmapId)

          return (
            <Canvas
              key={page}
              ref={el => (pageRefs.current[page] = el)}
              width={bmp?.width  || placeholderW}
              height={bmp?.height || placeholderH}
              data-page={page}
            />
          )
        })}
      </PagesContainer>
    </ScrollWrapper>
  )
}
