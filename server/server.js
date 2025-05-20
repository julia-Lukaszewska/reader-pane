//------------------------------------------------------------------
//------ Main server setup 
//------------------------------------------------------------------

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import booksRoutes, { uploadsDir } from './routes/index.js'; 

const app = express();
dotenv.config();

//------------------------------------------------------------------
//------ Resolve __dirname for ES Modules 
//------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//------------------------------------------------------------------
//------ MongoDB connection and server start 
//------------------------------------------------------------------

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((err) => console.error('❌ Database connection error:', err));

//------------------------------------------------------------------
//------ Middleware configuration  
//------------------------------------------------------------------

app.use(helmet());                 // security headers
app.use(morgan('dev'));           // logging
app.use(express.json());          // body parser

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  })
);

//------------------------------------------------------------------
// Static files (PDF-y, okładki)
//------------------------------------------------------------------
app.use(
  '/files',
  express.static(uploadsDir, {
    setHeaders: (res) =>
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin'),
  })
);

//------------------------------------------------------------------
//------ API routes 
//------------------------------------------------------------------

app.use('/api/books', booksRoutes);




//------------------------------------------------------------------
//------ Global error handler 
//------------------------------------------------------------------

app.use((err, _req, res, _next) => {
  console.error('❌ Global error handler:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
