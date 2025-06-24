/**
 * @file src/components/RenderedPDFViewer.jsx
 * @description
 * Component that displays visible PDF pages using rendered ImageBitmaps.
 * 
 * - Uses visible page list based on view mode (single/double/scroll)
 * - Retrieves bitmaps from BitmapCache using IDs stored in Redux
 * - Draws each bitmap to a <canvas> element
 * - Clears canvas if bitmap is not available
 *
 * Props:
 * - containerRef (optional): external scroll container ref
 * - sidebarOpen (boolean): adjusts layout padding for sidebar
 * - direction (string): flex direction, e.g. 'row' or 'column'
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { BitmapCache } from '@reader/utils/bitmapCache'

import {
  selectVisiblePagesByMode,
} from '@/store/selectors/readerSelectors'
import {
  selectRenderedPages,
  selectStreamScale,
} from '@/store/selectors/streamSelectors'

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
// Component: RenderedPDFViewer
//-----------------------------------------------------------------------------
/**
 * Renders visible PDF pages to <canvas> elements using ImageBitmaps.
 *
 * @param {Object} props
 * @param {React.RefObject} [props.containerRef] - Optional external scroll container
 * @param {boolean} [props.sidebarOpen=false] - Whether the sidebar is visible
 * @param {'row'|'column'} [props.direction='row'] - Layout direction of pages
 */
export default function RenderedPDFViewer({
  containerRef,
  sidebarOpen = false,
  direction = 'row',
}) {
  const wrapper = containerRef ?? useRef(null)
  const pageRefs = useRef({})

  const visible = useSelector(selectVisiblePagesByMode)
  const scale = useSelector(selectStreamScale)
  const scaleKey = scale.toFixed(2)
  const rendered = useSelector(selectRenderedPages)[scaleKey] ?? {}

  useEffect(() => {
    visible.forEach(page => {
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
  }, [visible, rendered, scaleKey])

  return (
    <ScrollWrapper ref={wrapper} $sidebar={sidebarOpen}>
      <PagesContainer $dir={direction}>
        {visible.map(page => {
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
