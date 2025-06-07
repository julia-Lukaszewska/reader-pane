/**
 * @file middlewares/authJwt.js
 * @description Sprawdza i dekoduje JWT z nagłówka Authorization
 */
import passport from '../config/passport.js';

export default passport.authenticate('jwt', { session: false });
