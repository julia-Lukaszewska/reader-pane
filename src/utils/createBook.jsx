//-----------------------------------------------------------------------------
//------ createBook: Factory function for creating a new book object  
//-----------------------------------------------------------------------------

/**
 * Generates a new book object with default values.
 * Can be used to create book instances locally or for testing purposes.
 * All properties match the backend Book schema.
 */
//#PL:
// Tworzy nowy obiekt książki z wartościami domyślnymi.
// Może być używany do lokalnego tworzenia książek lub testów.
// Struktura zgodna ze schematem Book z backendu.
//#/

export function createBook({
  _id = crypto.randomUUID(), // Unique identifier  
  title = 'Bez tytułu', // Default title  
  fileUrl = '', // File path or URL  
  addedAt = new Date().toISOString(), // ISO date format  
  isDeleted = false, // Archive flag  
  currentPage = 1, // Reading progress (page)  
  totalPages = 1, // Total number of pages  
  progress = 0, // Reading progress (%)  
} = {}) {
  return {
    _id,
    title,
    fileUrl,
    addedAt,
    isDeleted,
    currentPage,
    totalPages,
    progress,
  }
}
