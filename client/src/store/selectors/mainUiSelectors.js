//-----------------------------------------------------
//------ UI State Selectors
//-----------------------------------------------------

/** @constant selectTheme - current application theme */
export const selectTheme              = state => state.ui.theme
/** @constant selectSidebarOpen - whether the sidebar is open */
export const selectSidebarOpen       = state => state.ui.sidebarOpen
/** @constant selectActiveItem - currently active UI item */
export const selectActiveItem        = state => state.ui.activeItem
/** @constant selectLoginModalOpen - whether login modal is open */
export const selectLoginModalOpen    = state => state.ui.loginModalOpen
/** @constant selectRegisterModalOpen - whether register modal is open */
export const selectRegisterModalOpen = state => state.ui.registerModalOpen
/** @constant selectAuthModalMode - auth modal mode ('login' or 'register') */
export const selectAuthModalMode     = state => state.ui.authModalMode
