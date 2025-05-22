

/**
 * @file index.jsx
 * @description Sets up PDF.js worker and renders the React application into the DOM.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppProvider from '@/providers/AppProvider'
import App from '@/App'

//------------------------------------------------------------------------------
//------ worker: PDF.js worker path for rendering PDF files
//------------------------------------------------------------------------------
import * as pdfjsLib from 'pdfjs-dist'
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
if (!window.Worker) {
  console.error('Web Workers are not supported in this browser.')
}

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
