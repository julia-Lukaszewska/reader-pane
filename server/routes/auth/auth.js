/**
 * @file routes/auth/auth.js
 * @description Express router for email/password and token-based authentication.
 */

import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import User from '../../models/User.js'

const router = express.Router()

//------------------------------------------------------------------
// UTILITY – issue access + refresh token and send as cookie
//------------------------------------------------------------------
const issueTokens = (user, res) => {
  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_KEY, { expiresIn: '15m' })
  const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_KEY, { expiresIn: '30d' })

  res.cookie('rt', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    path: '/api/auth',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  })

  res.json({ access: accessToken })
}

//------------------------------------------------------------------
// POST /api/auth/register – register user
//------------------------------------------------------------------
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body
  try {
    if (await User.exists({ email })) {
      return res.status(409).json({ error: 'Email already in use.' })
    }
    const user = await User.create({ email, password, name })
    issueTokens(user, res)
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message)
      return res.status(400).json({ error: messages.join(' ') })
    }
    console.error('[REGISTER]', err)
    res.status(500).json({ error: 'Registration failed.' })
  }
})

//------------------------------------------------------------------
// POST /api/auth/login – local login
//------------------------------------------------------------------
router.post(
  '/login',
  passport.authenticate('local', { session: false, failWithError: true }),
  (req, res) => issueTokens(req.user, res),
  (err, _req, res, _next) => {
    console.error('[LOGIN]', err)
    res.status(401).json({ error: 'Invalid credentials.' })
  }
)

//------------------------------------------------------------------
// GET /api/auth/me – get current user
//------------------------------------------------------------------
router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password -refreshTokens')
      res.set('Cache-Control', 'no-store')
      res.json({ user })
    } catch (err) {
      console.error('[GET ME]', err)
      res.status(500).json({ error: 'Failed to retrieve user.' })
    }
  }
)

//------------------------------------------------------------------
// POST /api/auth/logout – clear refresh token
//------------------------------------------------------------------
router.post('/logout', (_req, res) => {
  res.clearCookie('rt', { httpOnly: true, secure: true, sameSite: 'None', path: '/api/auth' })
  res.sendStatus(204)
})

//------------------------------------------------------------------
// POST /api/auth/refresh – refresh access token
//------------------------------------------------------------------
router.post('/refresh', (req, res) => {
  const { rt } = req.cookies
  if (!rt) return res.status(401).json({ error: 'Missing refresh token.' })

  try {
    const { id } = jwt.verify(rt, process.env.JWT_REFRESH_KEY)
    const access = jwt.sign({ id }, process.env.JWT_ACCESS_KEY, { expiresIn: '15m' })
    res.json({ access })
  } catch (err) {
    console.error('[REFRESH]', err)
    res.sendStatus(401)
  }
})

export default router
