/**
 * @file routes/auth/index.js
 * @description Aggregates all authentication routers under `/api/auth`.
 */
import express from 'express'
import localAuth from './auth.js'

//-----------------------------------------------------
//------ Auth Router
//-----------------------------------------------------
const router = express.Router()

/**
 * Mount local authentication endpoints (login, register, etc.).
 */
router.use('/', localAuth)

export default router
