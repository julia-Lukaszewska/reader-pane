import * as Sentry from '@sentry/react'
import { Replay } from '@sentry/replay'
import { browserTracingIntegration } from '@sentry-internal/tracing'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE || 'development',
  release: 'reader-app@1.0.0',
  integrations: [
    browserTracingIntegration(),
    new Replay(),
  ],
  tracePropagationTargets: ['localhost', /^https:\/\/api\.twojadomena\.pl/],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})
