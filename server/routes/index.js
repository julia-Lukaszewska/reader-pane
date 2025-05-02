//------------------------------------------------------------------
//------ Main router that combines all book-related routes 
//------------------------------------------------------------------

import express from 'express' 
import readRoutes from './books-read.js' 
import stateRoutes from './books-state.js' 
import progressRoutes from './books-progress.js' 
import editRoutes from './books-edit.js' 
import uploadRoutes from './books-upload.js' 
const router = express.Router() 

//------------------------------------------------------------------
//------ Mount routes 
//------------------------------------------------------------------

router.use(readRoutes)
router.use(stateRoutes)
router.use(progressRoutes)
router.use(editRoutes)
router.use(uploadRoutes)
export default router 
