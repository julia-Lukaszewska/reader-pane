//-----------------------------------------------------------------------------
//------ storage.js: Utilities for storing last opened book ID  
//-----------------------------------------------------------------------------

/**
 * Save last opened book ID to localStorage
 * @param {string} id - Book ID to save
 */
export const saveLastBookId = (id) =>
  localStorage.setItem('lastOpenedBookId', id)  

/**
 * Get last opened book ID from localStorage
 * @returns {string|null} - Stored book ID or null
 */
export const getLastBookId = () => localStorage.getItem('lastOpenedBookId')  

/**
 * Clear last opened book ID from localStorage
 */
export const clearLastBookId = () => localStorage.removeItem('lastOpenedBookId')  
