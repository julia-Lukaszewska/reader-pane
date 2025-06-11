// src/index.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppProvider from './providers/AppProvider'
import App from './App'
import * as Sentry from '@sentry/react'
import * as pdfjsLib from 'pdfjs-dist'

//------------------------------------------------------------------------------
// Sentry Init
//------------------------------------------------------------------------------
Sentry.init({
  dsn: 'https://20619560eacd1874e2b2b68e1a9627a0@o4509471134777344.ingest.de.sentry.io/4509471143559248',
  sendDefaultPii: true,
  tracesSampleRate: 1.0, // performance monitoring (opcjonalne, ale zalecane)
})

//------------------------------------------------------------------------------
// PDF.js worker
//------------------------------------------------------------------------------
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
if (!window.Worker) {
  console.error('Web Workers are not supported in this browser.')
}

//------------------------------------------------------------------------------
// Entry point
//------------------------------------------------------------------------------
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
     <Sentry.ErrorBoundary fallback={<p>Something went wrong</p>}>
  <App />
</Sentry.ErrorBoundary>

    </AppProvider>
  </StrictMode>
)
