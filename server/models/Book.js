import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
  //#PL: 📖 Tytuł książki (np. nazwa pliku PDF)#/
   
  title: {
    type: String,  
    required: true,  
  },

  //#PL: 🌐 URL pliku (np. ścieżka do pliku PDF)#/
   
  fileUrl: {
    type: String,  
    required: true,  
  },

  //#PL: 🕒 Data dodania książki#/
   
  addedAt: {
    type: Date,  
    default: Date.now,  
  },

  //#PL: 🗑️ Status usunięcia książki#/
   
  isDeleted: {
    type: Boolean,  
    default: false,  
  },
})

 
 
export default mongoose.model('Book', bookSchema)
