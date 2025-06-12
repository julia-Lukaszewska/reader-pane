// src/index.jsx

//------------------------------------------------------------------------------
// Sentry (import first, before any app code)
//------------------------------------------------------------------------------
import * as Sentry from '@sentry/react'



Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.BRANCH, 
  release: import.meta.env.VITE_COMMIT_SHA, // Git commit SHA (optional)
  integrations: [


  ],
  tracesSampleRate: 1.0,                   // Capture 100% of performance traces
  replaysSessionSampleRate: 0.1,           // Record 10% of user sessions
  replaysOnErrorSampleRate: 1.0,           // Record 100% of sessions with errors
  sendDefaultPii: true,                    // Send user IP and device info
})

//------------------------------------------------------------------------------
// App imports (after Sentry is initialized)
//------------------------------------------------------------------------------
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppProvider from './providers/AppProvider'
import App from './App'
import * as pdfjsLib from 'pdfjs-dist'

//------------------------------------------------------------------------------
// PDF.js worker config
//------------------------------------------------------------------------------
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'

if (!window.Worker) {
  console.error('Web Workers are not supported in this browser.')
}

//------------------------------------------------------------------------------
// App entry point
//------------------------------------------------------------------------------
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <Sentry.ErrorBoundary fallback={<p>Something went wrong </p>}>
        <App />
      </Sentry.ErrorBoundary>
    </AppProvider>
  </StrictMode>
)
