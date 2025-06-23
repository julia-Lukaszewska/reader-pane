/**
 * @file PDFZoomControls.jsx
 * @description Zoom controls for PDF viewer: zoom in, zoom out, reset zoom, and display current zoom level.
 */

import React from 'react'
import { IoAdd, IoRemove, IoRefresh } from 'react-icons/io5'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { setScaleIndex } from '@/store/slices/streamSlice'
import { selectScaleIndex, selectCurrentScale } from '@/store/selectors/streamSelectors'
import { ZOOM_LEVELS } from '@reader/utils/pdfConstants'
//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

//--- Container for zoom controls
const StyledZoom = styled.div`
  display: flex;  
  align-items: center;
  gap: 0.6rem;
`

//--- Display current zoom percentage
const ZoomInfo = styled.span`
  font-size: 0.85rem;
  color: #fff;
`

//-----------------------------------------------------------------------------
// Component: PDFZoomControls
//-----------------------------------------------------------------------------

/**
 * Renders buttons to control PDF zoom level and shows current zoom percentage.
 * Manages zoom state via Redux slice 'reader'.
 * Hidden if not in /read route.
 */
const PDFZoomControls = () => {
  const dispatch = useDispatch()
  const index = useSelector(selectScaleIndex)
  const scale = useSelector(selectCurrentScale)

  // predefined zoom levels
  const totalLevels = ZOOM_LEVELS.length

  // handlers
  const handleZoomIn = () => dispatch(setScaleIndex(Math.min(index + 1, totalLevels - 1)))
  const handleZoomOut = () => dispatch(setScaleIndex(Math.max(index - 1, 0)))
 const handleReset = () => dispatch(setScaleIndex(ZOOM_LEVELS.indexOf(1)))

  // disabled states
  const isMinZoom = index <= 0
  const isMaxZoom = index >= totalLevels - 1

  // guard: only show on /read
  const pathname = window.location.pathname
  if (!pathname.startsWith('/read')) {
    return null
  }

  return (
    <StyledZoom>
      <button onClick={handleZoomOut} disabled={isMinZoom} title="Zoom out">
        <IoRemove />
      </button>

    <ZoomInfo>{Math.round(scale * 100)}%</ZoomInfo>

      <button onClick={handleZoomIn} disabled={isMaxZoom} title="Zoom in">
        <IoAdd />
      </button>

      <button onClick={handleReset} title="Reset zoom">
        <IoRefresh />
      </button>
    </StyledZoom>
  )
}

export default PDFZoomControls
