//------------------------------------------------------------------
//------ Book schema definition for MongoDB //#PL: 📘 Definicja schematu książki w Mongoose #/
//------------------------------------------------------------------

import mongoose from 'mongoose' //#PL: 🔹 Mongoose – ODM do MongoDB #/

const bookSchema = new mongoose.Schema({
  //----------------------------------------------------------------
  //------ Book title //#PL: 📖 Tytuł książki (np. nazwa pliku PDF) #/
  //----------------------------------------------------------------
  title: {
    type: String,  
    required: true,  
  },

  //----------------------------------------------------------------
  //------ File URL //#PL: 🌐 Adres URL pliku (np. ścieżka do PDF-a) #/
  //----------------------------------------------------------------
  fileUrl: {
    type: String,  
    required: true,  
  },

  //----------------------------------------------------------------
  //------ Date added //#PL: 🕒 Data dodania książki #/
  //----------------------------------------------------------------
  addedAt: {
    type: Date,  
    default: Date.now,  
  },

  //----------------------------------------------------------------
  //------ Deletion flag //#PL: 🗑️ Status usunięcia książki (archiwizacja) #/
  //----------------------------------------------------------------
  isDeleted: {
    type: Boolean,  
    default: false,  
  },

  //----------------------------------------------------------------
  //------ Reading progress (%) //#PL: 📊 Postęp czytania w procentach #/
  //----------------------------------------------------------------
  progress: {
    type: Number,  
    default: 0,  
  },

  //----------------------------------------------------------------
  //------ Current page //#PL: 📄 Bieżąca strona w książce #/
  //----------------------------------------------------------------
  currentPage: {
    type: Number,  
    default: 1,  
  },

  //----------------------------------------------------------------
  //------ Total pages //#PL: 📚 Całkowita liczba stron w książce #/
  //----------------------------------------------------------------
  totalPages: {
    type: Number,  
    default: 1,  
  },
})

//------------------------------------------------------------------
//------ Export Book model //#PL: 📤 Eksport modelu do użycia w trasach #/
//------------------------------------------------------------------

export default mongoose.model('Book', bookSchema)
