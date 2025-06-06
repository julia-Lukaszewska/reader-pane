/**
 * @file routes/index.js
 * @description Barrel file that aggregates all route categories (auth, public, private).
 */

import authRouter from './auth/index.js'
import booksPublicRouter from './booksPublic/index.js'
import booksPrivateRouter from './booksPrivate/index.js'

export { authRouter, booksPublicRouter, booksPrivateRouter }
