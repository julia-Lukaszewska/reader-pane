/**
 * @file storageService.js
 * @description Provides a unified interface for saving, retrieving, and clearing
 * authentication data using either sessionStorage or localStorage.
 */

/** Toggle between sessionStorage and localStorage */
const USE_SESSION = true

/** Active storage mechanism */
const storage = USE_SESSION ? sessionStorage : localStorage

/**
 * Saves authentication data (access and user) to storage.
 *
 * @param {string} access - Authentication access.
 * @param {Object} user - User object to store (will be stringified).
 */
export const saveAuth = (access, user) => {
  storage.setItem('access', access)
  storage.setItem('user', JSON.stringify(user))
}

/**
 * Clears authentication data from storage.
 */
export const clearAuth = () => {
  storage.removeItem('access')
  storage.removeItem('user')
}

/**
 * Retrieves authentication data from storage.
 *
 * @returns {{ access: string, user: Object } | null}
 *          Returns the access and parsed user if present, otherwise null.
 */
export const getAuth = () => {
  const access = storage.getItem('access')
  const user = storage.getItem('user')
  return access && user ? { access, user: JSON.parse(user) } : null
}
