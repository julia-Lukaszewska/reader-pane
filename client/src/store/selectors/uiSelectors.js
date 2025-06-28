/// src/store/selectors/uiSelectors.js

/**
 * @file uiSelectors.js
 * @description
 * Selectors related to UI state (e.g. theme, modals, sidebar).
 */

//----------------------------------------------------------------------------- 
// UI State Selectors (mainUiSlice)
//----------------------------------------------------------------------------- 

/**
 * Returns the current theme mode (light or dark).
 */
export const selectTheme = (state) => state.ui.theme

/**
 * Returns whether the sidebar is currently open.
 */
export const selectSidebarOpen = (state) => state.ui.sidebarOpen

/**
 * Returns the currently active UI item.
 */
export const selectActiveItem = (state) => state.ui.activeItem

/**
 * Returns whether the login modal is open.
 */
export const selectLoginModalOpen = (state) => state.ui.loginModalOpen

/**
 * Returns whether the register modal is open.
 */
export const selectRegisterModalOpen = (state) => state.ui.registerModalOpen

/**
 * Returns the current mode of the authentication modal.
 */
export const selectAuthModalMode = (state) => state.ui.authModalMode
/**
 * Returns the info message for the auth modal.
 */
export const selectAuthModalMessage = (state) => state.ui.authModalMessage