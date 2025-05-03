//-----------------------------------------------------------------------------
//------ usePreloadPDFPages – preload PDF pages when book, page or view changes 
//-----------------------------------------------------------------------------

import { useCallback, useRef, useEffect } from 'react' 
import { useSelector, useDispatch } from 'react-redux' 
import { useLoadPDFDocument } from '@/hooks' 
import { preloadByScale } from '@/utils' 

const usePreloadPDFPages = () => {
  const dispatch = useDispatch() 
  const {
    activeBook,
    currentPage,
    viewMode,
    scaleLevels,
    scaleIndex,
    renderedPages,
    renderedRanges,
  } = useSelector((state) => state.reader) 

  const pdfRef = useRef(null) 
  const loadingRef = useRef(false) 

  const scale = scaleLevels[scaleIndex] 

  //-----------------------------------------------------------------------------
  //------ Preload PDF pages based on current position and view mode 
  //-----------------------------------------------------------------------------
  const preload = useCallback(() => {
    if (!pdfRef.current || loadingRef.current || !activeBook?.fileUrl) return // Guard clause 

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
  ]) // Dependencies 

  //-----------------------------------------------------------------------------
  //------ Load PDF document and trigger initial preload 
  //-----------------------------------------------------------------------------
  useLoadPDFDocument({ activeBook, pdfRef, preload, dispatch }) 

  //-----------------------------------------------------------------------------
  //------ Re-run preload when preload function changes 
  //-----------------------------------------------------------------------------
  useEffect(() => {
    preload() 
  }, [preload]) 

  return { pdfRef, preload } // Expose ref and preload function 
}

export default usePreloadPDFPages 
