/**
 * @file authRoutes.js
 * @description Express router for handling authentication endpoints.
 * Supports:
 * - Local login (email + password)
 * - Google OAuth login
 * - JWT access and refresh token issuance
 * - User registration
 * - Authenticated user info
 * - Logout
 * Tokens are returned in JSON (access) and cookies (refresh).
 */

import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

// -----------------------------------------------------------------------------
// FUNCTION – issue access and refresh tokens
// -----------------------------------------------------------------------------

const issueTokens = (user, res) => {
  const accessToken = jwt.sign(
    { id: user._id },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: '15m' }
  )

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: '30d' }
  )

  res.cookie('rt', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  })

  res.json({ access: accessToken })
}

// -----------------------------------------------------------------------------
// ROUTE – user registration
// -----------------------------------------------------------------------------

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body

  try {
    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(409).json({ error: 'User already exists' })
    }

    const user = await User.create({ email, password, name })
    return issueTokens(user, res)
  } catch (err) {
    console.error('Register error:', err)
    res.status(500).json({ error: 'Registration failed' })
  }
})

// -----------------------------------------------------------------------------
// ROUTE – local login (email + password)
// -----------------------------------------------------------------------------

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    issueTokens(req.user, res)
  }
)

// -----------------------------------------------------------------------------
// ROUTE – get current authenticated user
// -----------------------------------------------------------------------------

router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password -refresh')
      res.json({ user })
    } catch (err) {
      res.status(500).json({ error: 'Failed to retrieve user' })
    }
  }
)

// -----------------------------------------------------------------------------
// ROUTE – logout (clear refresh token cookie)
// -----------------------------------------------------------------------------

router.post('/logout', (_req, res) => {
  res.clearCookie('rt', { httpOnly: true, secure: true, sameSite: 'Strict' })
  res.sendStatus(204)
})

// -----------------------------------------------------------------------------
// ROUTE – redirect to Google for OAuth login
// -----------------------------------------------------------------------------

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

// -----------------------------------------------------------------------------
// ROUTE – refresh access token using valid refresh token (from cookie)
// -----------------------------------------------------------------------------

router.post('/refresh', (req, res) => {
  const { rt } = req.cookies

  if (!rt) {
    return res.status(401).json({ error: 'Missing refresh token' })
  }

  try {
    const payload = jwt.verify(rt, process.env.JWT_REFRESH_KEY)

    const accessToken = jwt.sign(
      { id: payload.id },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: '15m' }
    )

    // re-issue a new refresh token (rotation)
    const newRefreshToken = jwt.sign(
      { id: payload.id },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: '30d' }
    )

    res.cookie('rt', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })

    res.json({ access: accessToken })
  } catch (err) {
    console.error('Refresh token error:', err)
    res.status(403).json({ error: 'Invalid or expired refresh token' })
  }
})


export default router
