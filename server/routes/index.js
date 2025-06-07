/**
 * @file routes/index.js
 * @description Aggregator for all routers:
 *   • authRouter          mounted at /api/auth
 *   • booksPublicRouter   mounted at /api/books/public
 *   • booksPrivateRouter  mounted at /api/books/private
 *   • booksStorageRouter  mounted at /api/books/storage
 */

import authRouter          from './auth/index.js'
import booksPublicRouter   from './booksPublic/index.js'
import booksPrivateRouter  from './booksPrivate/index.js'
import booksStorageRouter  from './booksStorage/index.js'

export {
  authRouter,
  booksPublicRouter,
  booksPrivateRouter,
  booksStorageRouter,
}
