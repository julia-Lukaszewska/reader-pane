// -----------------------------------------------------------------------------
//------ AppReducer  
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
//------ Initial state  
// -----------------------------------------------------------------------------

export const initialState = {
  theme: 'light', // Default theme is light  
  activeItem: null, // Currently active item (e.g., book, article)  
}

// -----------------------------------------------------------------------------
//------ Reducer function  
// -----------------------------------------------------------------------------

export function appReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_THEME':
      // Toggle between light and dark theme  
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      }
    case 'SET_ACTIVE_ITEM':
      return {
        ...state,
        activeItem: action.payload, // Set active item to the one clicked  
      }
    case 'CLEAR_ACTIVE_ITEM':
      return {
        ...state,
        activeItem: null, // Clear active item when navigating away  
      }
    default:
      // Return current state if action is unknown  
      return state
  }
}
