/**
 * @file middlewares/authJwt.js
 * @description
 * Middleware that validates and decodes JWT from the Authorization header
 * using Passport.js JwtStrategy.
 */
import passport from 'passport'

//-----------------------------------------------------
//------ JWT Authentication Middleware
//-----------------------------------------------------
/**
 * @constant authJwt
 * @description
 * Express middleware to authenticate requests via JWT.
 * Uses Passport's 'jwt' strategy and disables sessions.
 */
const authJwt = passport.authenticate('jwt', { session: false })

export default authJwt
