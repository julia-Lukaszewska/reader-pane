import { createSlice } from '@reduxjs/toolkit'

//------------------------------------------------------------------------------
// UI state management
//------------------------------------------------------------------------------

const initialState = {
  theme: 'light',
  sidebarOpen: false,
  activeItem: null,
}

//------------------------------------------------------------------------------
// Slice definition
//------------------------------------------------------------------------------

const mainUiSlice = createSlice({
  name: 'mainUi',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebar(state, action) {
      state.sidebarOpen = action.payload
    },
    setActiveItem(state, action) {
      state.activeItem = action.payload
    },
    clearActiveItem(state) {
      state.activeItem = null
    },
  },
})

//------------------------------------------------------------------------------
// Exports
//------------------------------------------------------------------------------

export const {
  toggleTheme,
  toggleSidebar,
  setSidebar,
  setActiveItem,
  clearActiveItem,
} = mainUiSlice.actions

export default mainUiSlice.reducer
