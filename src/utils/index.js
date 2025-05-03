//-----------------------------------------------------------------------------
//------ Barrel export for utility functions 
//-----------------------------------------------------------------------------

export { default as createBook } from './createBook' // Create book object from form or API data 
export { default as preloadByScale } from './preloadByScale' // Preload pages by zoom scale 
export { default as renderPages } from './renderPages' // Render a range of PDF pages 

export {
  getLastBookId,
  saveLastBookId,
  clearLastBookId,
  getArchivedBooks,
  saveArchivedBooks,
  clearArchivedBooks,
  saveBookToArchiveStorage,
  removeBookFromArchiveStorage,
} from './storage'
// Storage utilities 

export { validatePDF, countPDFPages } from './uploadPDFHelpers' // Upload helpers //#PL: Walidacja i liczenie stron PDF #
