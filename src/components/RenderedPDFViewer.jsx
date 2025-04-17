//-----------------------------------------------------------------------------
//------ RenderedPDFViewer: Display rendered PDF pages  
//-----------------------------------------------------------------------------

import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { usePreloadPDFPages } from '../hooks/usePreloadPDFPages'

export default function RenderedPDFViewer() {
  const { state } = useContext(AppContext)

  const { renderedPages, currentPage, viewMode, scaleLevels, scaleIndex } =
    state
  const scale = scaleLevels?.[scaleIndex] ?? 1.0

  usePreloadPDFPages() // Trigger preload logic  

  const pages = renderedPages[scale] || {}
  const left = pages[currentPage]
  const right = viewMode === 'double' ? pages[currentPage + 1] : null

  if (!left) {
    console.log('Waiting for page render:', currentPage)
    return <p>Wczytywanie strony {currentPage}...</p>
  }

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <img
        src={left.dataUrl}
        alt={`Strona ${currentPage}`} // Alt for accessibility  
        width={left.width}
        height={left.height}
      />
      {right && (
        <img
          src={right.dataUrl}
          alt={`Strona ${currentPage + 1}`}
          width={right.width}
          height={right.height}
        />
      )}
    </div>
  )
}
