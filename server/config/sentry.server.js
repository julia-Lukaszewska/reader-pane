// config/sentry.server.js
import { init, Handlers } from '@sentry/node';
import dotenv from 'dotenv';
dotenv.config();

init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV || 'development',
  release: 'reader-backend@1.0.0',
  tracesSampleRate: 1.0,
});

export const sentryRequestHandler = Handlers.requestHandler();
export const sentryErrorHandler  = Handlers.errorHandler();
