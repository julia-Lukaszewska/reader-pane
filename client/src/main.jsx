// src/index.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppProvider from './providers/AppProvider';
import App from '@/App';
import * as Sentry from '@sentry/react';

import * as pdfjsLib from 'pdfjs-dist';

//------------------------------------------------------------------------------
// Sentry: performance + replay
//------------------------------------------------------------------------------
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE || 'development',
  release: 'reader-app@1.0.0',
  integrations: [

    Sentry.browserTracingIntegration({
      tracingOrigins: ['localhost', /^https:\/\/api\.twojadomena\.pl/],
    }),
   
   
  ],
  ignoreErrors: [
    'ResizeObserver loop limit exceeded',
    'Non-Error exception captured',
    'Network Error',
  ],
  tracesSampleRate: 1.0,           
  replaysSessionSampleRate: 1.0,    
  replaysOnErrorSampleRate: 1.0,    
});

//------------------------------------------------------------------------------
// PDF.js worker
//------------------------------------------------------------------------------
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
if (!window.Worker) {
  console.error('Web Workers are not supported in this browser.');
}

//------------------------------------------------------------------------------
// Entry point
//------------------------------------------------------------------------------
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
);
