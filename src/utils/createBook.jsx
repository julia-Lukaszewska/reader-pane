//-----------------------------------------------------------------------------
//------ createBook: Factory function for creating a new book object 
//-----------------------------------------------------------------------------

/**
 * Generates a new book object with default values.
 * Can be used to create book instances locally or for testing purposes.
 * All properties match the backend Book schema.
 */

export default function createBook({
  _id = crypto.randomUUID(), // Unique identifier 
  title = 'Bez tytułu', // Default title 
  fileUrl = '', // File path or URL 
  addedAt = new Date().toISOString(), // ISO date format 
  isArchived = false, // Archive flag 
  currentPage = 1, // Reading progress (page) 
 
  progress = 0, // Reading progress (%) 
} = ) {
  return {
    _id,
    title,
    fileUrl,
    addedAt,
    isArchived,
    currentPage,
   
    progress,
  }
}
