/**
 * @file storageService.js
 * @description
 * Provides a unified interface for saving, retrieving, and clearing
 * authentication data using localStorage.
 */

const storage = localStorage

/**
 * Saves authentication data (access and user) to localStorage.
 *
 * @param {string} access - JWT access token.
 * @param {Object} user - User object to store.
 */
export const saveAuth = (access, user) => {
  storage.setItem('access', access)
  storage.setItem('user', JSON.stringify(user))
}

/**
 * Clears authentication data from localStorage.
 */
export const clearAuth = () => {
  storage.removeItem('access')
  storage.removeItem('user')
}

/**
 * Retrieves authentication data from localStorage.
 *
 * @returns {{ access: string, user: Object } | null}
 */
export const getAuth = () => {
  const access = storage.getItem('access')
  const userJson = storage.getItem('user')
  return access && userJson
    ? { access, user: JSON.parse(userJson) }
    : null
}
