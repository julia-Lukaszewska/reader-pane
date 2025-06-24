/**
 * @file sentry.js
 * @description
 * Initializes Sentry error tracking for the application:
 * - DSN from environment
 * - Environment from BRANCH or default 'dev'
 * - Release version from package version
 * - Disables performance tracing (tracesSampleRate: 0)
 */
import * as Sentry from '@sentry/node'

//-----------------------------------------------------
//------ Sentry Initialization
//-----------------------------------------------------
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.BRANCH || 'dev',
    release: `${process.env.BRANCH || 'dev'}@${process.env.npm_package_version}`,
    tracesSampleRate: 0,
  })
  console.log('[Sentry] Initialized')
} else {
  console.warn('[Sentry] Skipped initialization (SENTRY_DSN not defined)')
}

