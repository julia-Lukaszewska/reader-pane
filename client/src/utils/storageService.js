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
 * Saves authentication data (token and user) to storage.
 *
 * @param {string} token - Authentication token.
 * @param {Object} user - User object to store (will be stringified).
 */
export const saveAuth = (token, user) => {
  storage.setItem('token', token)
  storage.setItem('user', JSON.stringify(user))
}

/**
 * Clears authentication data from storage.
 */
export const clearAuth = () => {
  storage.removeItem('token')
  storage.removeItem('user')
}

/**
 * Retrieves authentication data from storage.
 *
 * @returns {{ token: string, user: Object } | null}
 *          Returns the token and parsed user if present, otherwise null.
 */
export const getAuth = () => {
  const token = storage.getItem('token')
  const user = storage.getItem('user')
  return token && user ? { token, user: JSON.parse(user) } : null
}
