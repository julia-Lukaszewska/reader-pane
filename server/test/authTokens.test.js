import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import request from 'supertest'
import express from 'express'
import cookieParser from 'cookie-parser'
import passport from 'passport'

import configurePassport from '../config/passport.js'
import authRouter from '../routes/auth/auth.js'
import User from '../models/User.js'

let app
let mongoServer

beforeAll(async () => {
  process.env.JWT_ACCESS_KEY = 'test-access-key'
  process.env.JWT_REFRESH_KEY = 'test-refresh-key'
  mongoServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoServer.getUri())

  app = express()
  app.use(express.json())
  app.use(cookieParser())
  configurePassport()
  app.use(passport.initialize())
  app.use('/api/auth', authRouter)
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

function parseToken(cookie) {
  return cookie.split(';')[0].split('=')[1]
}

describe('multiple refresh tokens per user', () => {
  it('handles issuing, refreshing and revoking multiple tokens', async () => {
    // register user and get first token
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'multi@example.com',
        password: 'ComplexPwd1!',
        name: 'Multi User'
      })
      .expect(200)
    const cookie1 = registerRes.headers['set-cookie'][0]
    const token1 = parseToken(cookie1)

    let user = await User.findOne({ email: 'multi@example.com' })
    expect(user.refresh.length).toBe(1)
    expect(user.refresh[0].token).toBe(token1)

    // second login -> second token
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'multi@example.com', password: 'ComplexPwd1!' })
      .expect(200)
    const cookie2 = loginRes.headers['set-cookie'][0]
    const token2 = parseToken(cookie2)

    user = await User.findOne({ email: 'multi@example.com' })
    expect(user.refresh.length).toBe(2)

    // refresh with first token
    await request(app)
      .post('/api/auth/refresh')
      .set('Cookie', cookie1)
      .expect(200)

    // logout with first token
    await request(app)
      .post('/api/auth/logout')
      .set('Cookie', cookie1)
      .expect(204)

    user = await User.findOne({ email: 'multi@example.com' })
    expect(user.refresh.length).toBe(1)
    expect(user.refresh[0].token).toBe(token2)

    // refresh with second token still works
    await request(app)
      .post('/api/auth/refresh')
      .set('Cookie', cookie2)
      .expect(200)

    // logout with second token
    await request(app)
      .post('/api/auth/logout')
      .set('Cookie', cookie2)
      .expect(204)

    user = await User.findOne({ email: 'multi@example.com' })
    expect(user.refresh.length).toBe(0)
  })
})
