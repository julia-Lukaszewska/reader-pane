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
import User from '../models/User.js'

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
    secure: true,
    sameSite: 'Strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  })

  res.json({ access: accessToken })
}

// -----------------------------------------------------------------------------
// ROUTE – user registration
// -----------------------------------------------------------------------------

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user with email, password, and name
 * @access  Public
 *
 * @param {string} req.body.email    - User's email address
 * @param {string} req.body.password - User's plaintext password
 * @param {string} req.body.name     - User's name
 *
 * @returns {Object} 201 + { access } on success
 * @returns {Object} 400 + { error } if validation fails
 * @returns {Object} 409 + { error } if email already exists
 * @returns {Object} 500 + { error } on server error
 */
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body

  try {
    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(409).json({ error: 'User already exists with that email.' })
    }

    const user = await User.create({ email, password, name })
    return issueTokens(user, res)
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message)
      return res.status(400).json({ error: messages.join(' ') })
    }
    console.error('Register error:', err)
    return res.status(500).json({ error: 'Registration failed.' })
  }
})

// -----------------------------------------------------------------------------
// ROUTE – local login (email + password)
// -----------------------------------------------------------------------------

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user using email and password, issue tokens on success
 * @access  Public
 *
 * @param {string} req.body.email    - User's email address
 * @param {string} req.body.password - User's plaintext password
 *
 * @returns {Object} 200 + { access } on success
 * @returns {Object} 401 + { error } if authentication fails
 * @returns {Object} 500 + { error } on server error
 */
router.post(
  '/login',
  passport.authenticate('local', {
    session: false,
    failWithError: true,
  }),
  (req, res) => {
    issueTokens(req.user, res)
  },
  (err, req, res, _next) => {
    console.error('Login error:', err?.message || err)
    return res.status(401).json({ error: 'Invalid email or password.' })
  }
)

// -----------------------------------------------------------------------------
// ROUTE – get current authenticated user
// -----------------------------------------------------------------------------

/**
 * @route   GET /api/auth/me
 * @desc    Retrieve the currently authenticated user's information
 * @access  Private (JWT)
 *
 * @returns {Object} 200 + { user } on success
 * @returns {Object} 500 + { error } on server error
 */
router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password -refreshTokens')
      res.set('Cache-Control', 'no-store')
      return res.status(200).json({ user })
    } catch (err) {
      console.error('Get user error:', err)
      return res.status(500).json({ error: 'Failed to retrieve user.' })
    }
  }
)

// -----------------------------------------------------------------------------
// ROUTE – logout (clear refresh token cookie)
// -----------------------------------------------------------------------------

/**
 * @route   POST /api/auth/logout
 * @desc    Clear refresh token cookie to log out user
 * @access  Public
 *
 * @returns {204} No Content
 */
router.post('/logout', (_req, res) => {
  res.clearCookie('rt', {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
  })
  return res.sendStatus(204)
})

// -----------------------------------------------------------------------------
// ROUTE – refresh access token using valid refresh token (from cookie)
// -----------------------------------------------------------------------------

/**
 * @route   POST /api/auth/refresh
 * @desc    Use valid refresh token to issue a new access token
 * @access  Public
 *
 * @returns {Object} 200 + { access } on success
 * @returns {Object} 401 + { error } if refresh token missing/invalid
 */
router.post('/refresh', (req, res) => {
  const { rt } = req.cookies

  if (!rt) {
    return res.status(401).json({ error: 'Missing refresh token.' })
  }

  try {
    const { id } = jwt.verify(rt, process.env.JWT_REFRESH_KEY)
    const accessToken = jwt.sign(
      { id },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: '15m' }
    )
    return res.json({ access: accessToken })
  } catch (err) {
    console.error('Refresh token error:', err)
    return res.sendStatus(401)
  }
})

// -----------------------------------------------------------------------------
// ROUTE – redirect to Google for OAuth login
// -----------------------------------------------------------------------------

/**
 * @route   GET /api/auth/google
 * @desc    Redirect user to Google for OAuth authentication
 * @access  Public
 */
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

// -----------------------------------------------------------------------------
// ROUTE – Google OAuth callback
// -----------------------------------------------------------------------------

/**
 * @route   GET /api/auth/google/callback
 * @desc    Google OAuth callback endpoint; issue tokens on success
 * @access  Public
 *
 * @returns {Redirect} Redirects to homepage on success
 */
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    issueTokens(req.user, res)
    return res.redirect('/')
  }
)

export default router
