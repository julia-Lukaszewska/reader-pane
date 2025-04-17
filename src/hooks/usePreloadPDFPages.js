//-----------------------------------------------------------------------------
//------ usePreloadPDFPages – preload PDF pages when book, page or view changes  
//-----------------------------------------------------------------------------

import { useCallback, useContext, useRef, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { useLoadPDFDocument } from './useLoadPDFDocument'
import { preloadByScale } from '../utils/preloadByScale'

/**
 * Hook that manages preloading of PDF pages based on
 * current book, page, view mode and zoom level.
 * Integrates pdf.js instance, current state, and preload logic.
 */
export const usePreloadPDFPages = () => {
  const { state, dispatch } = useContext(AppContext)
  const {
    activeBook,
    currentPage,
    viewMode,
    scaleLevels,
    scaleIndex,
    renderedPages,
    renderedRanges,
  } = state

  const pdfRef = useRef(null) // Stores the loaded PDF document instance  
  const loadingRef = useRef(false) // Prevents concurrent preload operations  

  const scale = scaleLevels[scaleIndex] // Current zoom scale  

  /**
   * Preloads PDF pages based on current position and view mode.
   * Skips if loading or document is not yet available.
   */
  const preload = useCallback(() => {
    console.log('[usePreloadPDFPages] Checking preload conditions...')
    if (!pdfRef.current || loadingRef.current || !activeBook?.fileUrl) return

    console.log('[usePreloadPDFPages] Triggering preload with:', {
      currentPage,
      viewMode,
      scale,
    })

    preloadByScale({
      pdf: pdfRef.current,
      scale,
      currentPage,
      viewMode,
      renderedPages,
      renderedRanges,
      dispatch,
      loadingRef,
    })
  }, [
    activeBook,
    currentPage,
    viewMode,
    scale,
    renderedPages,
    renderedRanges,
    dispatch,
  ])

  // Loads the PDF document once book is selected and triggers first preload
  useLoadPDFDocument({ activeBook, pdfRef, preload, dispatch })  

  // Re-runs preload when view mode, zoom or page changes
  useEffect(() => {
    console.log('[usePreloadPDFPages] useEffect triggered – running preload')
    preload()
  }, [preload])  

  return { pdfRef, preload }  
}
