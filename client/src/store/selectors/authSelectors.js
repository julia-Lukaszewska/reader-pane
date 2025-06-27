import { createSelector } from 'reselect'

//-----------------------------------------------------
//------ Auth Selectors
//-----------------------------------------------------

/**
 * @function selectAccessToken
 * @description Returns the raw JWT access token.
 * @param {Object} state - Redux state
 * @returns {string|null} JWT access token or null if not set
 */
export const selectAccessToken = state => {
  return state.auth.access
}

/**
 * @function selectAuthChecked
 * @description Returns a flag indicating whether the auth check has completed.
 * @param {Object} state - Redux state
 * @returns {boolean} True if auth check is complete
 */
export const selectAuthChecked = state => state.auth.authChecked

/**
 * @function selectIsLoggedIn
 * @description Returns true if the user is logged in (access token exists).
 * @param {Object} state - Redux state
 * @returns {boolean}
 */
export const selectIsLoggedIn = createSelector(
  selectAccessToken,
  access => Boolean(access)
)
