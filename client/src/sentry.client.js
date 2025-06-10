// src/sentry.client.js
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/react'


Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE || 'development',
  release: 'reader-app@1.0.0',
  integrations: [
    new BrowserTracing({
      tracingOrigins: ['localhost', /^https:\/\/api\.twojadomena\.pl/],
    }),
   
  ],
  ignoreErrors: [
    'ResizeObserver loop limit exceeded',
    'Non-Error exception captured',
    'Network Error',
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
