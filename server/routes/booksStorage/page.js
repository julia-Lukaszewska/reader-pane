/**
 * @file routes/booksStorage/page.js
 * Endpoint for returning rendered PDF page images.
 */
import express from 'express'
import cors from 'cors'
import checkBookOwner from '../../middlewares/checkBookOwner.js'
import { getCorsOptions } from '../../config/cors/index.js'
import { pageImage } from '../../controllers/stream/pageImage.js'

const router = express.Router()
const corsOptions = getCorsOptions(process.env.BRANCH || process.env.NODE_ENV)

router.get('/:filename/page/:num', cors(corsOptions), checkBookOwner, pageImage)

export default router