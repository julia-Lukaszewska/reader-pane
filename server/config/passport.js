/**
 * @file passport.js
 * @description
 * Configures Passport.js strategies:
 * - LocalStrategy for email + password login
 * - GoogleStrategy for OAuth login
 * - JwtStrategy for access token validation
 *
 * Call `configurePassport()` during server initialization to register these strategies.
 */
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import User from '../models/User.js'

//-----------------------------------------------------
//------ configurePassport Function
//-----------------------------------------------------
/**
 * @function configurePassport
 * @description Registers Passport strategies:
 *   • LocalStrategy: email/password authentication  
 *   • GoogleStrategy: OAuth2 login via Google  
 *   • JwtStrategy: Bearer token validation  
 */
export default function configurePassport() {
  //---------------------------------------------------
  //------ LocalStrategy: Email + Password Login
  //---------------------------------------------------
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email })
          if (!user || !(await user.comparePassword(password))) {
            return done(null, false, { message: 'Invalid credentials' })
          }
          return done(null, user)
        } catch (err) {
          return done(err)
        }
      }
    )
  )

  //---------------------------------------------------
  //------ GoogleStrategy: OAuth Login with Google
  //---------------------------------------------------
  if (process.env.GGL_ID && process.env.GGL_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GGL_ID,
          clientSecret: process.env.GGL_SECRET,
          callbackURL: '/api/auth/google/callback',
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            const email = profile.emails[0].value
            let user = await User.findOne({ email })

            if (!user) {
              user = await User.create({
                email,
                googleId: profile.id,
                name: profile.displayName,
              })
            }

            return done(null, user)
          } catch (err) {
            return done(err)
          }
        }
      )
    )
  } else {
    console.warn(
      'Google OAuth configuration missing – GoogleStrategy not initialized.'
    )
  }

  //---------------------------------------------------
  //------ JwtStrategy: Access Token Validation
  //---------------------------------------------------
  if (process.env.JWT_ACCESS_KEY) {
    passport.use(
      new JwtStrategy(
        {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: process.env.JWT_ACCESS_KEY,
        },
        (payload, done) => done(null, payload)
      )
    )
  } else {
    console.warn(
      'JWT_ACCESS_KEY missing – JwtStrategy not initialized.'
    )
  }
}
