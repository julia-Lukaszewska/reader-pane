//-----------------------------------------------------------------------------
//------ usePDFZoom: Hook for managing PDF zoom level 
//-----------------------------------------------------------------------------

import { useCallback } from 'react' 
import { useSelector, useDispatch } from 'react-redux' 
import { setScaleIndex } from '@/store' 

const usePDFZoom = () => {
  const dispatch = useDispatch() 
  const scaleLevels = useSelector((state) => state.reader.scaleLevels) 
  const scaleIndex = useSelector((state) => state.reader.scaleIndex) 

  const currentScale = scaleLevels[scaleIndex] // Active zoom level 

  const isMinZoom = scaleIndex === 0 // At minimum zoom 
  const isMaxZoom = scaleIndex === scaleLevels.length - 1 // At maximum zoom 

  //-----------------------------------------------------------------------------
  //------– Zoom in by increasing scale index if not at max 
  //-----------------------------------------------------------------------------
  const handleZoomIn = useCallback(() => {
    if (!isMaxZoom) {
      dispatch(setScaleIndex(scaleIndex + 1)) // Increment scale 
    }
  }, [dispatch, scaleIndex, isMaxZoom]) 

  //-----------------------------------------------------------------------------
  //------– Zoom out by decreasing scale index if not at min 
  //-----------------------------------------------------------------------------
  const handleZoomOut = useCallback(() => {
    if (!isMinZoom) {
      dispatch(setScaleIndex(scaleIndex - 1)) // Decrement scale 
    }
  }, [dispatch, scaleIndex, isMinZoom]) 

  //-----------------------------------------------------------------------------
  //------– Reset zoom to default (100%) 
  //-----------------------------------------------------------------------------
  const handleReset = useCallback(() => {
    const defaultIndex = scaleLevels.findIndex((s) => s === 1) // Find default scale index 
    if (defaultIndex !== -1 && scaleIndex !== defaultIndex) {
      dispatch(setScaleIndex(defaultIndex)) // Reset to default 
    }
  }, [dispatch, scaleIndex, scaleLevels]) 

  return {
    currentScale, // Current zoom level 
    handleZoomIn, // Function to zoom in 
    handleZoomOut, // Function to zoom out 
    handleReset, // Function to reset zoom 
    isMinZoom, // Boolean: is at minimum 
    isMaxZoom, // Boolean: is at maximum 
    scaleIndex, // Current index 
  }
}

export default usePDFZoom 
