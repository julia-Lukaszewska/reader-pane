import * as Sentry from '@sentry/node'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV || 'development',
  release: 'reader-backend@1.0.0',
})

export const sentryRequestHandler = Sentry.Handlers.requestHandler()
export const sentryErrorHandler = Sentry.Handlers.errorHandler()
export default Sentry
