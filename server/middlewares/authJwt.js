/**
 * @file middlewares/authJwt.js
 * @description Sprawdza i dekoduje JWT z nagłówka Authorization
 */
import passport from 'passport';

export default passport.authenticate('jwt', { session: false });
