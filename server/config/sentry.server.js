// server/config/sentry.server.js
import * as Sentry from '@sentry/node'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV || 'development',
  release: 'reader-backend@1.0.0',
})

export default Sentry
