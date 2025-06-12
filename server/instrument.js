
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.BRANCH || 'dev',
  release: `${process.env.BRANCH || 'dev'}@${process.env.npm_package_version}`,
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0
});
