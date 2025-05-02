import { createSlice } from '@reduxjs/toolkit'
//------------------------------------------------------------------------------
//------ UI state management 
//------------------------------------------------------------------------------
const initialState = {
  theme: 'light',
  sidebarOpen: false,
  activeItem: null,
}
//------------------------------------------------------------------------------
//------ Slice UI 
//------------------------------------------------------------------------------
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Toggle between light and dark themes 
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    // Toggle sidebar visibility 
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen
    },
    // Set sidebar visibility based on payload 
    setSidebar(state, action) {
      state.sidebarOpen = action.payload
    },
    // Set the active item in the sidebar 
    setActiveItem(state, action) {
      state.activeItem = action.payload
    },
    // Clear the active item in the sidebar 
    clearActiveItem(state) {
      state.activeItem = null
    },
  },
})
//------------------------------------------------------------------------------
//------ Exports 
//------------------------------------------------------------------------------
export const {
  toggleTheme,
  toggleSidebar,
  setSidebar,
  setActiveItem,
  clearActiveItem,
} = uiSlice.actions

export default uiSlice.reducer
