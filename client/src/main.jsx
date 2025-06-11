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
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [new BrowserTracing()],
   release: import.meta.env.VITE_COMMIT_SHA,
  tracesSampleRate: 1.0,
  sendDefaultPii: true,
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
