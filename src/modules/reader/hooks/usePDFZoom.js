// src/modules/pdfView/hooks/usePDFZoom.jsx
import { useMemo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setScale } from '@/store/slices/readerSlice'

export default function usePDFZoom() {
  const dispatch = useDispatch()
  const scaleLevels = useMemo(() => [0.5, 0.75, 1.0, 1.25, 1.5], [])
  const currentScale = useSelector((s) => s.reader.currentScale) ?? 1.0

  const idx = scaleLevels.indexOf(currentScale)
  const isMinZoom = idx <= 0
  const isMaxZoom = idx >= scaleLevels.length - 1

  const handleZoomIn = useCallback(() => {
    if (!isMaxZoom) dispatch(setScale(scaleLevels[idx + 1]))
  }, [isMaxZoom, idx, dispatch, scaleLevels])

  const handleZoomOut = useCallback(() => {
    if (!isMinZoom) dispatch(setScale(scaleLevels[idx - 1]))
  }, [isMinZoom, idx, dispatch, scaleLevels])

  const handleReset = useCallback(() => {
    if (currentScale !== 1.0) dispatch(setScale(1.0))
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
