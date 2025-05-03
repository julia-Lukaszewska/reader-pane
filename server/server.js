//------------------------------------------------------------------
//------ Main server setup 
//------------------------------------------------------------------

import express from 'express' 
import mongoose from 'mongoose' 
import cors from 'cors' 
import dotenv from 'dotenv' 
import booksRoutes from './routes/index.js' 
import path from 'path' 
import fs from 'fs' 
import { fileURLToPath } from 'url' 

const app = express()
dotenv.config() 

//------------------------------------------------------------------
//------ MongoDB connection and server start 
//------------------------------------------------------------------

mongoose
  .connect(process.env.MONGO_URI) 
  .then(() => {
    app.listen(
      process.env.PORT,
      () => console.log(`Server running on port ${process.env.PORT}`)  
    )
  })
  .catch((err) => console.error('Database connection error:', err))  

//------------------------------------------------------------------
//------ Resolve __dirname for ES Modules 
//------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url) 
const __dirname = path.dirname(__filename) 

//------------------------------------------------------------------
//------ Middleware configuration  
//------------------------------------------------------------------

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], 
    credentials: true, 
  })
)

app.use(express.json()) 

//------------------------------------------------------------------
//------ Static file serving (PDFs) 
//------------------------------------------------------------------

app.use(
  '/files',
  (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*') 
    next()
  },
  express.static(path.join(__dirname, 'uploads'))
)

//------------------------------------------------------------------
//------ API routes 
//------------------------------------------------------------------
app.use('/api/books', booksRoutes) 

//------------------------------------------------------------------
//------ Serve single PDF file by filename 
//------------------------------------------------------------------

app.get('/files/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename) 

  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'application/pdf') // Set PDF content type 
    res.sendFile(filePath) // Send the file to the client 
  } else {
    res.status(404).json({ message: 'File not found' })  
  }
})
