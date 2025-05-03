import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppProvider from '@/providers/AppProvider'
import App from '@/App'

//------------------------------------------------------------------------------
//------ worker: PDF.js worker path for rendering PDF files 
//------------------------------------------------------------------------------
import * as pdfjsLib from 'pdfjs-dist'
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'

//-----------------------------------------------------------------------------
//------ Entry point: render app into DOM with context and strict mode 
//-----------------------------------------------------------------------------

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
)
