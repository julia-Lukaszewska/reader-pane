/**
 * @file routes/booksStorage/range.js
 * Streams a selected range of PDF pages.
 */

import express from 'express'
import cors from 'cors'

import checkBookOwner from '../../middlewares/checkBookOwner.js'
import { getCorsOptions } from '../../config/cors/index.js'
import { preSplitRange } from '../../controllers/stream/preSplitRange.js'
import { dynamicRange } from '../../controllers/stream/dynamicRange.js'
const router = express.Router()
const corsOptions = getCorsOptions(process.env.BRANCH || process.env.NODE_ENV)

router.get('/:filename/pages', cors(corsOptions), checkBookOwner, preSplitRange, dynamicRange)

export default router
