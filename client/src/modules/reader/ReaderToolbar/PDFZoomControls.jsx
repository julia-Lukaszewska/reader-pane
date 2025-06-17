/**
 * @file PDFZoomControls.jsx
 * @description Zoom controls for PDF viewer: zoom in, zoom out, reset zoom, and display current zoom level.
 */
import React from 'react'
import { IoAdd, IoRemove, IoRefresh } from 'react-icons/io5'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { setScaleIndex } from '@/store/slices/readerSlice'
import { selectScaleIndex } from '@/store/selectors'

//-----------------------------------------------------
//------ Styled Components
//-----------------------------------------------------

const StyledZoom = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`

const ZoomInfo = styled.span`
  font-size: 0.85rem;
  color: #fff;
`

//-----------------------------------------------------
//------ PDFZoomControls Component
//-----------------------------------------------------

/**
 * @component PDFZoomControls
 * @description Renders zoom in/out/reset buttons and displays current zoom percentage.
 *              Manages zoom state via Redux slice 'reader'. Hidden if not on /read route.
 * @returns {React.ReactNode|null}
 */
const PDFZoomControls = () => {
  const dispatch = useDispatch()
  const index = useSelector(selectScaleIndex)

  //-----------------------------------------------------
  //------ Zoom Levels & Current Scale
  //-----------------------------------------------------
  const levels = [0.5, 0.75, 1, 1.25, 1.5, 2]
  const totalLevels = levels.length
  const currentScale = levels[index] ?? 1

  //-----------------------------------------------------
  //------ Handlers
  //-----------------------------------------------------
  const handleZoomIn  = () => dispatch(setScaleIndex(Math.min(index + 1, totalLevels - 1)))
  const handleZoomOut = () => dispatch(setScaleIndex(Math.max(index - 1, 0)))
  const handleReset   = () => dispatch(setScaleIndex(levels.indexOf(1)))

  const isMinZoom = index <= 0
  const isMaxZoom = index >= totalLevels - 1

  //-----------------------------------------------------
  //------ Guard: Only Show on /read Route
  //-----------------------------------------------------
  const pathname = window.location.pathname
  if (!pathname.startsWith('/read')) {
    return null
  }

  //-----------------------------------------------------
  //------ Render Zoom Controls
  //-----------------------------------------------------
  return (
    <StyledZoom>
      <button onClick={handleZoomOut} disabled={isMinZoom} title="Zoom out">
        <IoRemove />
      </button>

      <ZoomInfo>{Math.round(currentScale * 100)}%</ZoomInfo>

      <button onClick={handleZoomIn} disabled={isMaxZoom} title="Zoom in">
        <IoAdd />
      </button>

      <button onClick={handleReset} title="Reset zoom">
        <IoRefresh />
      </button>
    </StyledZoom>
  )
}

export default React.memo(PDFZoomControls)
