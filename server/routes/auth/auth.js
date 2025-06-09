/**
 * @file authRoutes.js
 * @description Express router for handling authentication endpoints.
 *              Supports:
 *                - Local login (email + password)
 *                - Google OAuth login
 *                - JWT access and refresh token issuance
 *                - User registration
 *                - Authenticated user info
 *                - Logout
 *              Tokens are returned in JSON (access) and cookies (refresh).
 */

import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import User from '../../models/User.js'

const router = express.Router()

// -----------------------------------------------------------------------------
// FUNCTION – issue access and refresh tokens
// -----------------------------------------------------------------------------

/**
 * Generate JWT access and refresh tokens for a user, set the refresh token
 * as an HttpOnly cookie, and return the access token in JSON.
 *
 * @param {Object} user - Mongoose user document
 * @param {Object} res - Express response object
 */
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
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'None', // Changed from Strict to None for cross-origin
    path: '/',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  })

  res.json({ access: accessToken })
}

// -----------------------------------------------------------------------------
// ROUTE – user registration
// -----------------------------------------------------------------------------

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body
  console.log('[REGISTER] Incoming data:', { email, name })

  try {
    const exists = await User.findOne({ email })
    if (exists) {
      console.warn('[REGISTER] Email already in use:', email)
      return res.status(409).json({ error: 'User already exists' })
    }

    const user = await User.create({ email, password, name })
    console.log('[REGISTER] User created:', user._id)
    return issueTokens(user, res)
  } catch (err) {
    console.error('[REGISTER] Error:', err)
    return res.status(500).json({ error: 'Registration failed.' })
  }
})


// -----------------------------------------------------------------------------
// ROUTE – local login (email + password)
// -----------------------------------------------------------------------------

router.post('/login', 
  passport.authenticate('local', { session: false, failWithError: true }),
  (req, res) => {
    console.log('[LOGIN] Successful login for:', req.user.email)
    issueTokens(req.user, res)
  },
  (err, req, res, _next) => {
    console.warn('[LOGIN] Failed login for:', req.body.email)
    console.error('[LOGIN ERROR]', err?.message || err)
    return res.status(401).json({ error: 'Invalid email or password.' })
  }
)

// -----------------------------------------------------------------------------
// ROUTE – get current authenticated user
// -----------------------------------------------------------------------------
router.get('/me', passport.authenticate('jwt', { session: false }), async (req, res) => {
  console.log('[GET /me] Authenticated user:', req.user.id)
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.set('Cache-Control', 'no-store')
    return res.status(200).json({ user })
  } catch (err) {
    console.error('[GET /me] Error fetching user:', err)
    return res.status(500).json({ error: 'Failed to retrieve user.' })
  }
})


// -----------------------------------------------------------------------------
// ROUTE – logout (clear refresh token cookie)
// -----------------------------------------------------------------------------

router.post('/logout', (_req, res) => {
  res.clearCookie('rt', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'None',
    path: '/',
  })
  return res.sendStatus(204)
})

// -----------------------------------------------------------------------------
// ROUTE – refresh access token using valid refresh token (from cookie)
// -----------------------------------------------------------------------------

router.post('/refresh', (req, res) => {
  const { rt } = req.cookies
  console.log('[REFRESH] Cookie received:', !!rt)

  if (!rt) return res.status(401).json({ error: 'No refresh token.' })

  try {
    const { id } = jwt.verify(rt, process.env.JWT_REFRESH_KEY)
    console.log('[REFRESH] Token valid for user ID:', id)

    const accessToken = jwt.sign({ id }, process.env.JWT_ACCESS_KEY, { expiresIn: '15m' })
    return res.json({ access: accessToken })
  } catch (err) {
    console.error('[REFRESH] Invalid refresh token:', err.message)
    return res.sendStatus(401)
  }
})


// -----------------------------------------------------------------------------
// ROUTE – redirect to Google for OAuth login
// -----------------------------------------------------------------------------

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

// -----------------------------------------------------------------------------
// ROUTE – Google OAuth callback
// -----------------------------------------------------------------------------

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    issueTokens(req.user, res)
    return res.redirect('/')
  }
)

export default router
