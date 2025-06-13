/**
 * @file authSelectors.js
 * @description
 * Redux selectors for authentication state:
 * - selectAccessToken: retrieves the raw JWT access token
 * - selectAuthChecked: retrieves the flag indicating auth check completion
 * - selectIsLoggedIn: derives a boolean indicating if the user is logged in
 */
import { createSelector } from 'reselect'

/**
 * Selects the raw access token from state.
 * @param {Object} state - Redux state
 * @returns {string|null} JWT access token or null if not set
 */
export const selectAccessToken = state => state.auth.access

/**
 * Selects the flag that indicates whether the authentication check has completed.
 * @param {Object} state - Redux state
 * @returns {boolean} True if auth check is complete, false otherwise
 */
export const selectAuthChecked = state => state.auth.authChecked

/**
 * Selects a boolean indicating if the user is currently logged in.
 * @type {import('reselect').OutputSelector<Object, boolean, (res: string|null) => boolean>}
 */
export const selectIsLoggedIn = createSelector(
  selectAccessToken,
  access => Boolean(access)
)
