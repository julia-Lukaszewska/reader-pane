import * as Sentry from '@sentry/react';
import { Replay } from '@sentry/replay';
import { BrowserTracing } from '@sentry/tracing';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE || 'development',
  release: 'reader-app@1.0.0',
  integrations: [
    new BrowserTracing({
      // skąd chcesz propagować trace’ami
      tracingOrigins: ['localhost', /^\https:\/\/api\.twojadomena\.pl/],
    }),
    new Replay(),
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
