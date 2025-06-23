import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import {
  selectVisibleBitmapPages,
  selectStreamScale,
} from '@/store/selectors/streamSelectors'

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

  // Selector: Pages currently visible and rendered as ImageBitmaps
  const visiblePages = useSelector(selectVisibleBitmapPages)
  const scale = useSelector(selectStreamScale)

  /**
   * On update of visiblePages or scale, draw all bitmaps into canvas elements.
   */
  useEffect(() => {
    visiblePages.forEach(({ pageNumber, bitmap }) => {
      const canvas = pageRefs.current[pageNumber]
      if (!canvas || !bitmap) return
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(bitmap, 0, 0)
    })

    console.debug('[Viewer] rendered pages @scale', scale, visiblePages.map(p => p.pageNumber))
  }, [visiblePages, scale])

  return (
    <ScrollWrapper ref={wrapper} $sidebar={sidebarOpen}>
      <PagesContainer $dir={direction}>
        {visiblePages.map(({ pageNumber, width, height }) => (
          <Canvas
            key={`${pageNumber}-${width}x${height}`}
            ref={(el) => (pageRefs.current[pageNumber] = el)}
            width={width}
            height={height}
            data-page={pageNumber}
          />
        ))}
      </PagesContainer>
    </ScrollWrapper>
  )
}
