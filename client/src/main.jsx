// -----------------------------------------------------------------------------
// 1. Libraries & global config
// -----------------------------------------------------------------------------
import * as pdfjsLib from 'pdfjs-dist'
import * as Sentry   from '@sentry/react'

// --- Sentry first -------------------------------------------------------------
Sentry.init({
  dsn:            import.meta.env.VITE_SENTRY_DSN,
  environment:    import.meta.env.BRANCH,
  release:        import.meta.env.VITE_COMMIT_SHA,
  tracesSampleRate:        1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  sendDefaultPii:           true,
});

// --- pdf.js worker (public/pdf.worker.min.js) --------------------------------
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'

// Warn once if the browser lacks Workers
if (!window.Worker) console.error('Web Workers are not supported in this browser.')

// -----------------------------------------------------------------------------
// 2. App imports
// -----------------------------------------------------------------------------
import React, { StrictMode } from 'react'
import { createRoot }        from 'react-dom/client'
import AppProvider           from './providers/AppProvider'
import App                   from './App'

// -----------------------------------------------------------------------------
// 3. Choose wrapper: StrictMode only in production builds
// -----------------------------------------------------------------------------
const Wrapper =
  import.meta.env.MODE === 'development' ? React.Fragment : React.StrictMode;

// -----------------------------------------------------------------------------
// 4. Boot the app
// -----------------------------------------------------------------------------
createRoot(document.getElementById('root')).render(
  <Wrapper>
    <AppProvider>
      <Sentry.ErrorBoundary fallback={<p>Something went wrong</p>}>
        <App />
      </Sentry.ErrorBoundary>
    </AppProvider>
  </Wrapper>
);
