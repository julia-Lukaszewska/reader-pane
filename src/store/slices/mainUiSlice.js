/**
 * @file mainUiSlice.js
 * @description Redux slice for managing global UI state: theme, sidebar, and active navigation item.
 */

import { createSlice } from '@reduxjs/toolkit'

//-----------------------------------------------------------------------------
// Initial State
//-----------------------------------------------------------------------------

const initialState = {
  theme: 'light',       // 'light' | 'dark'
  sidebarOpen: false,   // whether sidebar is expanded
  activeItem: null,     // identifier of the currently active navigation item
}

//-----------------------------------------------------------------------------
// Slice Definition
//-----------------------------------------------------------------------------

const mainUiSlice = createSlice({
  name: 'mainUi',
  initialState,
  reducers: {
    /**
     * Toggles between light and dark theme.
     *
     * @param {Object} state - Current slice state
     */
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },

    /**
     * Toggles the sidebar open/closed.
     *
     * @param {Object} state - Current slice state
     */
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen
    },

    /**
     * Explicitly sets the sidebar open state.
     *
     * @param {Object} state - Current slice state
     * @param {{ payload: boolean }} action - Desired open state
     */
    setSidebar(state, action) {
      state.sidebarOpen = action.payload
    },

    /**
     * Sets the currently active navigation item.
     *
     * @param {Object} state - Current slice state
     * @param {{ payload: string|null }} action - Active item identifier
     */
    setActiveItem(state, action) {
      state.activeItem = action.payload
    },

    /**
     * Clears the active navigation item.
     *
     * @param {Object} state - Current slice state
     */
    clearActiveItem(state) {
      state.activeItem = null
    },
  },
})

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------

export const {
  toggleTheme,
  toggleSidebar,
  setSidebar,
  setActiveItem,
  clearActiveItem,
} = mainUiSlice.actions

export default mainUiSlice.reducer
