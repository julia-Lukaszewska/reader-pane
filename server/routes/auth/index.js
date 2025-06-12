/**
 * @file routes/auth/index.js
 * @description Aggregates all authentication routers under /api/auth.
 */

import express from 'express'
import localAuth from './auth.js'

const router = express.Router()

// Mount local authentication endpoints
router.use('/', localAuth)

export default router