//------------------------------------------------------------------
//------ Main server setup //#PL: 🚀 Główna konfiguracja serwera Express + MongoDB #/
//------------------------------------------------------------------

import express from 'express' //#PL: 🔹 Express – framework do tworzenia serwera HTTP #/
import mongoose from 'mongoose' //#PL: 📊 Mongoose – biblioteka do pracy z MongoDB #/
import cors from 'cors' //#PL: 🔐 Middleware do obsługi CORS (dostęp z frontendu) #/
import dotenv from 'dotenv' //#PL: 🧪 Obsługa zmiennych środowiskowych z pliku .env #/
import booksRoutes from './routes/index.js' //#PL: 📚 Import tras związanych z książkami #/
import path from 'path' //#PL: 📁 Narzędzie do pracy ze ścieżkami plików #/
import fs from 'fs' //#PL: 🗑️ File System – operacje na plikach (czytanie, usuwanie) #/
import { fileURLToPath } from 'url' //#PL: 📌 Uzyskanie __dirname w środowisku ES Modules #/

const app = express()
dotenv.config() //#PL: 🔄 Wczytanie zmiennych środowiskowych z .env #/

//------------------------------------------------------------------
//------ MongoDB connection and server start //#PL: 🧩 Połączenie z bazą + uruchomienie serwera #/
//------------------------------------------------------------------

mongoose
  .connect(process.env.MONGO_URI) //#PL: 🔌 Połączenie z MongoDB #/
  .then(() => {
    app.listen(
      process.env.PORT,
      () => console.log(`Server running on port ${process.env.PORT}`)  
    )
  })
  .catch((err) => console.error('Database connection error:', err))  

//------------------------------------------------------------------
//------ Resolve __dirname for ES Modules //#PL: 🧭 Ustalanie ścieżki dla folderów #/
//------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url) //#PL: 🔗 Pełna ścieżka do tego pliku #/
const __dirname = path.dirname(__filename) //#PL: 📂 Folder, w którym znajduje się plik #/

//------------------------------------------------------------------
//------ Middleware configuration  
//------------------------------------------------------------------

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], //#PL: 🌐 Pozwolenie na dostęp z frontendu #/
    credentials: true, //#PL: 🔐 Pozwolenie na przesyłanie cookies i nagłówków autoryzacyjnych #/
  })
)

app.use(express.json()) //#PL: 🧾 Middleware do parsowania żądań JSON #/

//------------------------------------------------------------------
//------ Static file serving (PDFs) //#PL: 📂 Udostępnianie plików PDF #/
//------------------------------------------------------------------

app.use(
  '/files',
  (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*') // Allow access from any origin  
    next()
  },
  express.static(path.join(__dirname, 'uploads'))
)

//------------------------------------------------------------------
//------ API routes //#PL: 🌐 Trasy API dla książek #/
//------------------------------------------------------------------

app.use('/api/books', booksRoutes) //#PL: 📘 Obsługa tras zaczynających się od /api/books #/

//------------------------------------------------------------------
//------ Serve single PDF file by filename //#PL: 📥 Pobieranie pojedynczego pliku PDF #/
//------------------------------------------------------------------

app.get('/files/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename) //#PL: 🔎 Ścieżka do żądanego pliku #/

  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'application/pdf') // Set PDF content type //#PL: 🏷️ Ustaw nagłówek typu PDF #/
    res.sendFile(filePath) // Send the file to the client //#PL: 📤 Wyślij plik PDF do klienta #/
  } else {
    res.status(404).json({ message: 'File not found' }) // Return 404 if file is missing  
  }
})
