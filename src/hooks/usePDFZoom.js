//-----------------------------------------------------------------------------
//------ usePDFZoom – hook for managing PDF zoom level  
//-----------------------------------------------------------------------------

import { useContext, useCallback } from 'react'
import { AppContext } from '../context/AppContext'

/**
 * Hook that controls PDF zoom levels.
 * Provides functions to zoom in, zoom out, and reset to 100%.
 * Uses global AppContext state for managing scaleIndex.
 */
export function usePDFZoom() {
  const { state, dispatch } = useContext(AppContext)
  const { scaleLevels, scaleIndex } = state

  const currentScale = scaleLevels[scaleIndex]  

  const isMinZoom = scaleIndex === 0  
  const isMaxZoom = scaleIndex === scaleLevels.length - 1  

  /**
   * Increases zoom level if not already at max.
   */
  const handleZoomIn = useCallback(() => {
    if (!isMaxZoom) {
      dispatch({ type: 'SET_SCALE_INDEX', payload: scaleIndex + 1 })  
    }
  }, [dispatch, scaleIndex, isMaxZoom])

  /**
   * Decreases zoom level if not already at min.
   */
  const handleZoomOut = useCallback(() => {
    if (!isMinZoom) {
      dispatch({ type: 'SET_SCALE_INDEX', payload: scaleIndex - 1 })  
    }
  }, [dispatch, scaleIndex, isMinZoom])

  /**
   * Resets zoom to default scale (usually 100%).
   */
  const handleReset = useCallback(() => {
    const defaultIndex = scaleLevels.findIndex((s) => s === 1)  
    if (scaleIndex !== defaultIndex && defaultIndex !== -1) {
      dispatch({ type: 'SET_SCALE_INDEX', payload: defaultIndex })  
    }
  }, [dispatch, scaleIndex, scaleLevels])

  return {
    currentScale, // Active zoom level (e.g., 1.0)  
    handleZoomIn, // Function to zoom in  
    handleZoomOut, // Function to zoom out  
    handleReset, // Function to reset zoom  
    isMinZoom, // Boolean: is at minimum zoom  
    isMaxZoom, // Boolean: is at maximum zoom  
    scaleIndex, // Current index in scaleLevels array  
  }
}
