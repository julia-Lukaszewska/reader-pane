/**
 * @file usePDFZoom.jsx
 * @description Custom hook for managing PDF zoom level with defined scale steps.
 */

import { useMemo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'  
import { setScale } from '@/store/slices/readerSlice'

//-----------------------------------------------------------------------------
// Hook: usePDFZoom
//-----------------------------------------------------------------------------

/**
 * Manages zoom controls for PDF reader.
 * Provides scale levels, current scale, and handlers for zooming in/out/reset.
 *
 * @returns {Object} Zoom state and handlers
 */
export default function usePDFZoom() {
  console.log('[usePDFZoom] usePDFZoom() called')

  const dispatch = useDispatch()

  //--- Defined zoom levels
  const scaleLevels = useMemo(() => [0.5, 0.75, 1.0, 1.25, 1.5], [])

  //--- Current zoom level from Redux
  const currentScale = useSelector((s) => s.reader.currentScale) ?? 1.0

  //--- Index of current scale in the scale levels
  const idx = scaleLevels.indexOf(currentScale)
  const isMinZoom = idx <= 0
  const isMaxZoom = idx >= scaleLevels.length - 1

  //--- Zoom in (next scale up)
  const handleZoomIn = useCallback(() => {
    if (!isMaxZoom) {
      dispatch(setScale(scaleLevels[idx + 1]))
    }
  }, [isMaxZoom, idx, dispatch, scaleLevels])

  //--- Zoom out (next scale down)
  const handleZoomOut = useCallback(() => {
    if (!isMinZoom) {
      dispatch(setScale(scaleLevels[idx - 1]))
    }
  }, [isMinZoom, idx, dispatch, scaleLevels])

  //--- Reset zoom to default (1.0)
  const handleReset = useCallback(() => {
    if (currentScale !== 1.0) {
      dispatch(setScale(1.0))
    }
  }, [currentScale, dispatch])

  return {
    scaleLevels,
    currentScale,
    isMinZoom,
    isMaxZoom,
    handleZoomIn,
    handleZoomOut,
    handleReset,
  }
}
