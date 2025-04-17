//------------------------------------------------------------------
//------ Script to clean unused files from /uploads folder //#PL: 🧹 Skrypt do usuwania nieużywanych plików z folderu /uploads #/
//------------------------------------------------------------------

import mongoose from 'mongoose' //#PL: 🔹 Połączenie z MongoDB #/
import dotenv from 'dotenv' //#PL: 🔹 Wczytuje zmienne środowiskowe z .env #/
import fs from 'fs' //#PL: 📁 Dostęp do systemu plików #/
import path from 'path' //#PL: 📂 Operacje na ścieżkach plików #/
import { fileURLToPath } from 'url' //#PL: 📌 Umożliwia uzyskanie __dirname w ES Modules #/
import Book from './models/Book.js' //#PL: 📘 Model książki z MongoDB #/

dotenv.config() //#PL: 🔄 Załaduj konfigurację z pliku .env #/

//------------------------------------------------------------------
//------ Resolve __dirname in ES Modules //#PL: 📍 Uzyskanie ścieżki do bieżącego folderu (bo brak __dirname) #/
//------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url)  
const __dirname = path.dirname(__filename)  

//------------------------------------------------------------------
//------ Define uploads folder path //#PL: 📂 Ścieżka do folderu z plikami #/
//------------------------------------------------------------------

const uploadsDir = path.join(__dirname, 'uploads')  

//------------------------------------------------------------------
//------ Main cleaner function //#PL: 🧹 Główna funkcja czyszcząca #/
//------------------------------------------------------------------

const cleanUploads = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)  

    const books = await Book.find({})  
    const usedFiles = new Set(books.map((book) => path.basename(book.fileUrl)))  

    const filesInFolder = fs.readdirSync(uploadsDir)  
    const unusedFiles = filesInFolder.filter((file) => !usedFiles.has(file))  

    for (const file of unusedFiles) {
      const filePath = path.join(uploadsDir, file)  
      fs.unlinkSync(filePath)  
      console.log('🗑️ Deleted unused file:', file)  
    }

    console.log('✅ Scan complete. Unused files removed.')  
    process.exit(0)  
  } catch (err) {
    console.error('❌ Error during cleanup:', err)  
    process.exit(1)  
  }
}

cleanUploads() //#PL: 🔁 Uruchomienie funkcji czyszczącej #/
