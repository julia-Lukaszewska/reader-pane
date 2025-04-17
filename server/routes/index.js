//------------------------------------------------------------------
//------ Main router that combines all book-related routes //#PL: 🧩 Główny router łączący wszystkie trasy książek #/
//------------------------------------------------------------------

import express from 'express' //#PL: 🔹 Express – tworzenie routera głównego #/
import uploadRoutes from './books-upload.js' //#PL: 📂 Trasy do uploadu książek #/
import readRoutes from './books-read.js' //#PL: 📖 Trasy do pobierania książek #/
import stateRoutes from './books-state.js' //#PL: 🗑️ Trasy do usuwania, przywracania i archiwizacji #/
import progressRoutes from './books-progress.js' //#PL: 📊 Trasy do postępu czytania #/

const router = express.Router() //#PL: 🔹 Inicjalizacja routera Expressa #/

//------------------------------------------------------------------
//------ Mount routes //#PL: 🔗 Podłącz podmoduły z trasami #/
//------------------------------------------------------------------

router.use(uploadRoutes) //#PL: 🔼 Upload plików #/
router.use(readRoutes) //#PL: 📚 Pobieranie danych książek #/
router.use(stateRoutes) //#PL: 🗑️ Usuwanie i archiwizacja #/
router.use(progressRoutes) //#PL: 🔁 Postęp czytania #/

export default router //#PL: 📤 Eksport routera głównego #/
