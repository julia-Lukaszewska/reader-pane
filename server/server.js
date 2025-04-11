import express from 'express' //#pl:  Framework do tworzenia serwera HTTP #/
import mongoose from 'mongoose' //#pl:  Biblioteka do pracy z MongoDB #/
import cors from 'cors' //#pl:  Middleware do obsługi CORS #/
import dotenv from 'dotenv' //#pl:  Biblioteka do obsługi zmiennych środowiskowych #/
import booksRoutes from './routes/books.js' //#pl: Import tras dla książek #/
import path from 'path' //#pl:  Moduł do pracy ze ścieżkami plików #/
import fs from 'fs' //#pl:  Moduł do pracy z systemem plików #/
import { fileURLToPath } from 'url' //#pl:  Moduł do obsługi ścieżek w środowisku ES Modules #/

const app = express()
dotenv.config()  
//#pl:  === Połączenie z MongoDB i uruchomienie serwera === #/
mongoose
  .connect(process.env.MONGO_URI) //#pl:  Połączenie z bazą danych MongoDB przy użyciu zmiennej środowiskowej MONGO_URI #/
  .then(() => {
    //#pl:  Jeśli połączenie z bazą danych się powiedzie, uruchom serwer #/
    app.listen(
      process.env.PORT,
      () => console.log('✅ Server running on port ' + process.env.PORT) //#pl:  Logowanie informacji o uruchomieniu serwera #/
    )
  })
  .catch((err) => console.error('❌ DB connection error', err)) //#pl:  Obsługa błędów połączenia z bazą danych #/

//#pl:  Uzyskaj __dirname w środowisku ES Modules #/
const __filename = fileURLToPath(import.meta.url) //#pl:  Ścieżka do bieżącego pliku #/
const __dirname = path.dirname(__filename) //#pl:  Katalog bieżącego pliku #/

//--------------------------------------------
//------ Middleware configuration  
//--------------------------------------------
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], //#pl: Adres frontendu (React) #/
    credentials: true, //#pl:  Pozwolenie na przesyłanie ciasteczek i nagłówków uwierzytelniających #/
  })
)

//#pl:  Middleware do parsowania JSON w żądaniach #/
app.use(express.json())

//#pl:  Obsługa statycznych plików w katalogu "uploads" #/
app.use('/files', express.static(path.join(__dirname, 'uploads'))) //#pl:  Udostępnianie plików z katalogu "uploads" #/

//#pl:  === Trasy === #/

//#pl:  Obsługa tras dla książek #/

app.use('/api/books', booksRoutes) //#pl:  Wszystkie trasy zaczynające się od "/api/books" są obsługiwane w pliku routes/books.js #/

//#pl:  Obsługa statycznych plików PDF #/
app.get('/files/:filename', (req, res) => {
  //#pl:  Pobranie ścieżki do pliku na podstawie nazwy pliku z parametru URL #/
  const filePath = path.join(__dirname, 'uploads', req.params.filename)

  //#pl:  Sprawdzenie, czy plik istnieje #/
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'application/pdf') //#pl:  Ustawienie nagłówka Content-Type na "application/pdf" #/
    res.sendFile(filePath) //#pl: Wysłanie pliku do klienta #/
  } else {
    res.status(404).json({ message: 'File not found' }) //#pl:  Zwrócenie błędu 404, jeśli plik nie istnieje #/
  }
})
