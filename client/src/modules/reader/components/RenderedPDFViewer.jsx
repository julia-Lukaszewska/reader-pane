import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import {
  selectVisiblePages,
  selectRenderedPages,
  selectStreamScale,
} from '@/store/selectors/streamSelectors'
import { BitmapCache } from '@reader/utils/bitmapCache'

/* ───────────── Styled Components ───────────── */

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

/**
 * RenderedPDFViewer
 * -------------------------
 * Displays visible PDF pages using <canvas> elements.
 * Draws ImageBitmap objects directly onto canvases.
 *
 * Pages and bitmaps come from Redux streamSlice selectors.
 *
 * @param {Object} props
 * @param {React.RefObject} [props.containerRef] – Optional ref to the scroll container
 * @param {boolean} [props.sidebarOpen=false] – Whether sidebar is open (affects layout)
 * @param {'row'|'column'} [props.direction='row'] – Page layout direction
 */
export default function RenderedPDFViewer({
  containerRef,
  sidebarOpen = false,
  direction = 'row',
}) {
  const wrapper = containerRef ?? useRef(null)
  const pageRefs = useRef({})

  // Metadata from Redux
  const visiblePages = useSelector(selectVisiblePages)
  const scale = useSelector(selectStreamScale)
  const rendered = useSelector(selectRenderedPages)
  /**
   * On update of visiblePages or scale, draw all bitmaps into canvas elements.
   */
  // Draw image bitmaps from cache
  useEffect(() => {
    visiblePages.forEach((pageNumber) => {
      const meta = rendered?.[scale]?.[pageNumber]
      const bitmap = meta ? BitmapCache.get(meta.bitmapId) : null
      const canvas = pageRefs.current[pageNumber]
      if (!canvas || !bitmap) return

      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(bitmap, 0, 0)
    })

    console.debug('[Viewer] Rendered pages @scale', scale, visiblePages)
  }, [visiblePages, rendered, scale])

  return (
    <ScrollWrapper ref={wrapper} $sidebar={sidebarOpen}>
     <PagesContainer $dir={direction}>
        {visiblePages.map((pageNumber) => {
          const meta = rendered?.[scale]?.[pageNumber]
          const bitmap = meta ? BitmapCache.get(meta.bitmapId) : null

          return (
            <Canvas
              key={pageNumber}
              ref={(el) => (pageRefs.current[pageNumber] = el)}
              width={bitmap?.width || 1}
              height={bitmap?.height || 1}
              data-page={pageNumber}
            />
          )
        })}
      </PagesContainer>
    </ScrollWrapper>
  )
}
