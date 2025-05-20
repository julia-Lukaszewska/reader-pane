import { IoAdd, IoRemove, IoRefresh } from 'react-icons/io5'
import styled from 'styled-components'

import {usePDFZoom} from '@reader/hooks'

const StyledZoom = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`

const ZoomInfo = styled.span`
  font-size: 0.85rem;
  color: #fff;
`

const PDFZoomControls = () => {



  const {
    handleZoomIn,
    handleZoomOut,
    handleReset,
    isMinZoom,
    isMaxZoom,
    currentScale,
  } = usePDFZoom()


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

export default PDFZoomControls
